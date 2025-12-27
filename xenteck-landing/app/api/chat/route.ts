import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequestBody = {
  message?: string;
  threadId?: string;
  messages?: ChatMessage[];
};

const OPENAI_BASE_URL = "https://api.openai.com/v1";
const ASSISTANT_PRIMER = `
You are the XenTeck AI Concierge for the Speed-to-Lead product.
Lead with the 6-second response time and reinforce key stats: 391% conversion lift within 1 minute, 78% of buyers choose the first responder, 42 hours average response time.
Be direct and data-led. Avoid generic consulting language.
Offer a next step when helpful: See Live Demo or Install Speed-to-Lead (48-hr deploy).
`.trim();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getAssistantResponse = async (
  message: string,
  existingThreadId?: string,
) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const assistantId = process.env.OPENAI_ASSISTANT_ID;

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  if (!assistantId) {
    throw new Error("Missing OPENAI_ASSISTANT_ID");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
    "OpenAI-Beta": "assistants=v2",
  };

  let threadId = existingThreadId;

  if (!threadId) {
    const threadResponse = await fetch(`${OPENAI_BASE_URL}/threads`, {
      method: "POST",
      headers,
      body: JSON.stringify({}),
    });

    if (!threadResponse.ok) {
      const errorText = await threadResponse.text();
      throw new Error(
        `Failed to create thread (${threadResponse.status}): ${errorText}`,
      );
    }

    const threadData = (await threadResponse.json()) as { id?: string };
    threadId = threadData.id;

    if (!threadId) {
      throw new Error("Missing thread id");
    }
  }

  let messageResponse = await fetch(
    `${OPENAI_BASE_URL}/threads/${threadId}/messages`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        role: "user",
        content: message,
      }),
    },
  );

  if (!messageResponse.ok) {
    if (messageResponse.status === 404) {
      const resetResponse = await fetch(`${OPENAI_BASE_URL}/threads`, {
        method: "POST",
        headers,
        body: JSON.stringify({}),
      });

      if (!resetResponse.ok) {
        const errorText = await resetResponse.text();
        throw new Error(
          `Failed to recreate thread (${resetResponse.status}): ${errorText}`,
        );
      }

      const resetData = (await resetResponse.json()) as { id?: string };
      threadId = resetData.id;

      if (!threadId) {
        throw new Error("Missing thread id");
      }

      messageResponse = await fetch(
        `${OPENAI_BASE_URL}/threads/${threadId}/messages`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            role: "user",
            content: message,
          }),
        },
      );
    }

    if (!messageResponse.ok) {
      const errorText = await messageResponse.text();
      throw new Error(
        `Failed to add message (${messageResponse.status}): ${errorText}`,
      );
    }
  }

  const runResponse = await fetch(`${OPENAI_BASE_URL}/threads/${threadId}/runs`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      assistant_id: assistantId,
      temperature: 0.4,
      additional_instructions: ASSISTANT_PRIMER,
    }),
  });

  if (!runResponse.ok) {
    const errorText = await runResponse.text();
    throw new Error(
      `Failed to start run (${runResponse.status}): ${errorText}`,
    );
  }

  const runData = (await runResponse.json()) as { id?: string };
  const runId = runData.id;

  if (!runId) {
    throw new Error("Missing run id");
  }

  let runStatus = "queued";
  for (let attempt = 0; attempt < 20; attempt += 1) {
    await sleep(350);
    const statusResponse = await fetch(
      `${OPENAI_BASE_URL}/threads/${threadId}/runs/${runId}`,
      {
        headers,
      },
    );

    if (!statusResponse.ok) {
      const errorText = await statusResponse.text();
      throw new Error(
        `Failed to fetch run status (${statusResponse.status}): ${errorText}`,
      );
    }

    const statusData = (await statusResponse.json()) as { status?: string };
    runStatus = statusData.status ?? "unknown";

    if (runStatus === "completed") {
      break;
    }

    if (["failed", "cancelled", "expired"].includes(runStatus)) {
      throw new Error(`Run ${runStatus}`);
    }
  }

  if (runStatus !== "completed") {
    throw new Error("Run timed out");
  }

  const latestResponse = await fetch(
    `${OPENAI_BASE_URL}/threads/${threadId}/messages?limit=1&order=desc`,
    { headers },
  );

  if (!latestResponse.ok) {
    const errorText = await latestResponse.text();
    throw new Error(
      `Failed to fetch messages (${latestResponse.status}): ${errorText}`,
    );
  }

  const messageData = (await latestResponse.json()) as {
    data?: Array<{
      role?: string;
      content?: Array<{
        type?: string;
        text?: { value?: string };
      }>;
    }>;
  };

  const latest = messageData.data?.[0];
  const text = latest?.content
    ?.filter((item) => item.type === "text")
    .map((item) => item.text?.value ?? "")
    .join("\n")
    .trim();

  return {
    text: text || "Sorry, I could not generate a reply.",
    threadId,
  };
};

export async function POST(request: Request) {
  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch (error) {
    console.error("Invalid JSON", error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let message = body.message?.toString().slice(0, 2000).trim() ?? "";
  const threadId = body.threadId?.toString().trim() ?? "";

  if (!message && Array.isArray(body.messages)) {
    const lastUserMessage = [...body.messages]
      .reverse()
      .find(
        (msg) =>
          msg.role === "user" && typeof msg.content === "string" && msg.content,
      );
    message = lastUserMessage?.content?.toString().slice(0, 2000).trim() ?? "";
  }

  if (!message) {
    return NextResponse.json(
      { error: "A message is required" },
      { status: 400 },
    );
  }

  try {
    const result = await getAssistantResponse(message, threadId || undefined);
    return NextResponse.json({
      message: result.text,
      threadId: result.threadId,
    });
  } catch (error) {
    console.error("Failed to call OpenAI Assistant", error);
    const detail =
      error instanceof Error ? error.message : "Failed to reach model provider";
    return NextResponse.json(
      { error: detail },
      { status: 502 },
    );
  }
}
