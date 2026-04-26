import { isAuthenticated } from "@lib/auth";
import { NextResponse } from "next/server";
import OpenAI from "openai";
export const runtime = "nodejs"; // <-- important for Clerk to work
import GeneratedPlanSet from "@/models/GeneratedPlan";
import { sendPlanToOwnerEmail } from "@lib/email";

const pricingMap = {
  india: { costPerScore: 500, symbol: "₹" },
  usa: { costPerScore: 30, symbol: "$" },
  "united states": { costPerScore: 40, symbol: "$" },
  canada: { costPerScore: 45, symbol: "$" },
  uk: { costPerScore: 50, symbol: "£" },
  "united kingdom": { costPerScore: 60, symbol: "£" },
  australia: { costPerScore: 55, symbol: "A$" },
  germany: { costPerScore: 60, symbol: "€" },
  eu: { costPerScore: 70, symbol: "€" },
  europe: { costPerScore: 75, symbol: "€" },
  "middle east": { costPerScore: 60, symbol: "د.إ" },
  uae: { costPerScore: 56, symbol: "د.إ" },
  qatar: { costPerScore: 70, symbol: "ر.ق" },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const user = await isAuthenticated(request.headers);
   
    if (!user)
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    const body = await request.json();
   
    let { formData, score, country, serviceType } = body;

    if (!formData || !score || !country || !serviceType) {
      return NextResponse.json(
        { success: false, message: "All feilds are required" },
        { status: 400 }
      );
    }
 
    const now = new Date();
    if (!user.lastPlanGeneratedAt) {
      user.lastPlanGeneratedAt = now;
      user.dailyPlanCount = 0;
      user.plans = [];
      console.log("First-time plan generation");
      await user.save();
    } // 2. If 24 hours have passed since last generation, reset
    else {
      const last = new Date(user.lastPlanGeneratedAt).getTime();
      console.log(now, last, "now and last");
      if (now - last >= 86400000) {
        // 24 hours in milliseconds
        await GeneratedPlanSet.deleteMany({
          _id: { $in: user.plans },
          userId: user._id,
        });
        user.plans = [];
        user.dailyPlanCount = 0;
        user.lastPlanGeneratedAt = now; // ✅ Reset window
        console.log("Resetting plan window after 24 hours");
      } else if (user.dailyPlanCount >= 3) {
        console.log("more than 3");
        const oldTime = new Date(user.lastPlanGeneratedAt).getTime();
        console.log(oldTime, "old time");
        const diffMs = now - oldTime; // difference in milliseconds
        const diffHours = diffMs / (1000 * 60 * 60); // convert to hours

        console.log("Hours passed:", diffHours.toFixed(2));
        const hoursLeft = Math.ceil(24 - diffHours);
        return NextResponse.json(
          {
            success: false,
            message: `You've hit your daily limit. Try again in ${hoursLeft} hour(s).`,
          },
          { status: 403 }
        );
      }
    }

    const key = country.toLowerCase();
    const config = pricingMap[key] || { costPerScore: 25, symbol: "$" };

    let total = score * config.costPerScore;
    let basic = Math.round(total * 0.7);
    let standard = Math.round(total);
    let premium = Math.round(total * 1.3);

    // Formatting function
    const formatPrice = (value, symbol = "₹") => {
      const number = Number(value);
      return symbol === "₹"
        ? number.toLocaleString("en-IN") // e.g., 12,34,567
        : number.toString(); // plain number for others
    };

    basic = formatPrice(basic, config.symbol);
    standard = formatPrice(standard, config.symbol);
    premium = formatPrice(premium, config.symbol);
    const prompt = `
You are a pricing assistant for a digital agency.

Your goal is to generate **3 unique pricing plans** ONLY for the service type: **"${serviceType}"**.
- Ignore other service types if mentioned.
- Tailor every feature strictly to this service type: "${serviceType}"

---

**Business Details (analyze and personalize plans accordingly):**
${formData}

**Service Type to focus on:** ${serviceType}

**Pricing (already calculated – do not change):**
- Basic: ${config.symbol}${basic}
- Standard: ${config.symbol}${standard}
- Premium: ${config.symbol}${premium}

---

Each plan must include:
- A clear, benefit-focused name
- The correct price
- A short description indicating what kind of client this plan is suited for
- A tightly tailored feature list **only related to the chosen service** (no irrelevant items)

---

 Feature Rules:
- Basic: 8-9 core features
- Standard: 9-11 features (all Basic + optimizations)
- Premium: 13-16 features (all Standard + advanced/exclusive tools)

Include:
- Only relevant frontend/backend tech
- Hosting/maintenance if applicable
- Custom components like dashboards, portals, or AI tools if relevant

DO NOT include generic features or services from other domains.

---

Output format:
json
[
  {
    "name": "Basic",
    "price": "${config.symbol}${basic}",
    "description": "...",
    "features": ["..."]
  },
  ...
]
json
`;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
You are an expert pricing assistant for a digital agency.

You must:
- ONLY focus on the specific service type provided by the user (e.g., Web Development, App Development, Branding, etc.)
- Deeply analyze the business context and generate three pricing plans based **only** on that service type.
- Ensure each plan has distinct, realistic features tailored to that field.
- Return strictly valid JSON only — no notes, comments, or extra text.`.trim(),
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 1400,
      store: true,
    });

    let rawOutput = completion.choices[0].message.content.trim();

    // Remove markdown fences if present
    if (rawOutput.startsWith("```json") || rawOutput.startsWith("```")) {
      rawOutput = rawOutput.replace(/```json|```/g, "").trim();
    }
    const plans = JSON.parse(rawOutput);
    const savedPlan = await GeneratedPlanSet.create({
      userId: user._id,
      businessName: formData?.businessName || "Untitled Business",
      plans,
      createdAt: now,
    });
   
    // ✅ Push plan ID into user's plans array
    user.plans.push(savedPlan._id);
    user.dailyPlanCount += 1;

    await user.save();
    await sendPlanToOwnerEmail({
      userEmail: user?.email,
      businessName: formData?.businessName || "Untitled Business",
      plans,
      voiceTranscript: formData?.voiceTranscript || "N/A",
      userInput: formData,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Plan generated successfully",
        plans,
        planId: savedPlan?._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating pricing plans:", error);
    return NextResponse.json(
      { message: "Failed to generate pricing plans" },
      { status: 500 }
    );
  }
}
