import { NextResponse } from "next/server";

type SnapshotRequestBody = {
  name?: string;
  email?: string;
  website?: string;
  headache?: string;
};

export async function POST(request: Request) {
  let body: SnapshotRequestBody;

  try {
    body = await request.json();
  } catch (error) {
    console.error("Failed to parse request body", error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  const name = (body.name ?? "").trim();
  const website = (body.website ?? "").trim();
  const headache = (body.headache ?? "").trim();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("Missing MAKE_WEBHOOK_URL environment variable");
    return NextResponse.json(
      { error: "Missing MAKE_WEBHOOK_URL" },
      { status: 500 },
    );
  }

  const payload = {
    source: "xenteck-landing",
    timestamp: new Date().toISOString(),
    name,
    email,
    website,
    headache,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(
        `Make webhook responded with status ${response.status}: ${response.statusText}`,
      );
      return NextResponse.json(
        { error: "Error forwarding to Make webhook" },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Failed to forward to Make webhook", error);
    return NextResponse.json(
      { error: "Error forwarding to Make webhook" },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
