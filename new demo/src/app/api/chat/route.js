import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { reply: null, error: "Invalid messages format" },
        { status: 400 }
      );
    }
    if (messages.length === 0) {
      return Response.json(
        { reply: null, error: "No messages provided" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an assistant working for Evolkun — a digital agency. Help users with friendly, minimal, and professional responses. Services include web development, app development, branding, SEO, and digital marketing. Answer based only on these services. If it's unrelated, politely say you can't help.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.6,
    });

    const reply = response.choices[0]?.message?.content;

    if (!reply) {
      return Response.json(
        { reply: null, error: "No reply try again" },
        { status: 500 }
      );
    }
    return Response.json({ reply });
  } catch (err) {
    console.error("OpenAI Error:", err);
    return Response.json({ reply: null, error: true }, { status: 500 });
  }
}
