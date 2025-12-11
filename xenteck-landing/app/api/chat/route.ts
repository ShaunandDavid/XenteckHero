import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequestBody = {
  messages?: ChatMessage[];
};

const SYSTEM_PROMPT = `
You are XenTeck's concise landing-page assistant.
- Audience: small teams and agencies considering AI/automation help.
- Tone: confident, direct, practical; keep answers tight.
- Capabilities offered: AI Systems Snapshot, 10-day automation sprints, stack cleanup, fit call at admin@xenteck.com (subject "Fit Call – XenTeck").
- If asked how to book: point them to the 20-minute fit call mailto link (admin@xenteck.com).
- If asked about the snapshot: explain it captures bottlenecks and suggests AI/automation fixes; form posts to /api/snapshot and forwards to Make.
- Keep replies under 120 words unless explicitly asked for more.
`.trim();

export async function POST(request: Request) {
  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch (error) {
    console.error("Invalid JSON", error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const incomingMessages = body.messages ?? [];
  const trimmedMessages = incomingMessages
    .map((msg) => ({
      role: msg.role,
      content: msg.content?.toString().slice(0, 2000) ?? "",
    }))
    .filter(
      (msg) =>
        (msg.role === "user" || msg.role === "assistant") &&
        msg.content.trim().length > 0,
    );

  if (trimmedMessages.length === 0) {
    return NextResponse.json(
      { error: "At least one message is required" },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  if (!apiKey) {
    console.error("Missing OPENAI_API_KEY environment variable");
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY" },
      { status: 500 },
    );
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...trimmedMessages,
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.4,
        max_tokens: 220,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error", response.status, errorText);
      return NextResponse.json(
        { error: "Upstream model error" },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };

    const content =
      data.choices?.[0]?.message?.content?.trim() ??
      "Sorry, I could not generate a reply.";

    return NextResponse.json({ message: content });
  } catch (error) {
    console.error("Failed to call OpenAI", error);
    return NextResponse.json(
      { error: "Failed to reach model provider" },
      { status: 502 },
    );
  }
}
