import { NextResponse } from "next/server";

function flattenAnswers(answers) {
  return Object.entries(answers || {})
    .map(([key, value]) => {
      const formatted =
        Array.isArray(value) ? value.join(", ") : String(value ?? "");
      return `${key}: ${formatted}`;
    })
    .join("\n");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const answers = body?.answers || {};

    const promptData = flattenAnswers(answers);

    const systemPrompt = `
You are an expert digital agency project analyst and premium client-facing copywriter.

Your job:
1. Read the user's survey answers.
2. Detect whether the answers are reasonably coherent for a real project inquiry.
3. If the answers are contradictory, random, nonsensical, incomplete, or obviously mismatched, mark them invalid.
4. If valid, generate a short, polished, client-facing project brief in clean structured JSON.

IMPORTANT:
- The summary is for the USER, not for the agency team.
- The tone should feel premium, warm, confident, and clear.
- It should sound like: "We understand your direction, your project has potential, and our team will prepare carefully before the consultation."
- Keep the total narrative around 120–150 words.
- Do not sound robotic, technical, or overly analytical.
- Do not output bullet points inside the narrative.
- Include light appreciation naturally, but do not overpraise.
- Mention that the team will review and prepare before the consultation.
- Encourage the next step: scheduling a meeting.

Return ONLY valid JSON.
No markdown.
No explanation outside JSON.

JSON format:
{
  "valid": true,
  "reason": "",
  "title": "string",
  "subtitle": "string",
  "narrative": [
    "short paragraph 1",
    "short paragraph 2"
  ],
  "insights": [
    { "label": "Project Type", "value": "string" },
    { "label": "Creative Direction", "value": "string" },
    { "label": "Priority", "value": "string" },
    { "label": "Timeline", "value": "string" }
  ],
  "highlight": "string"
}

If invalid, return:
{
  "valid": false,
  "reason": "Clear short message explaining what feels inconsistent or unclear.",
  "title": "",
  "subtitle": "",
  "narrative": [],
  "insights": [],
  "highlight": ""
}

Rules for invalid:
- random or contradictory business/profile combinations
- obviously meaningless inputs
- answers too unclear to create a reliable project brief
- mismatched inputs that make the request look unserious

Be strict but fair.
`;

const userPrompt = `
Analyze these survey answers and generate a premium client-facing project brief.

Requirements:
- Make the narrative user-facing, not internal.
- Keep it concise, around 120–150 words total.
- The message should feel like a polished project understanding.
- Include a subtle appreciation of their direction or ambition.
- Mention that our team will carefully review and prepare before the meeting.
- End with a natural sense that the next step is scheduling a consultation.
- Add one short highlighted line in "highlight" that feels important and premium.

Survey answers:
${promptData}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          success: false,
          error: "OpenAI request failed",
          details: errorText,
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content;

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to parse OpenAI JSON response",
          raw,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      brief: parsed,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Unknown server error",
      },
      { status: 500 }
    );
  }
}