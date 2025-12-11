"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const processPoints = [
  {
    title: "Map the mess",
    body: "We look at how leads, messages, and customers actually move through your business today.",
  },
  {
    title: "Design the fix",
    body: "We show you where you are leaking time and money and what a clean, AI-ready stack looks like.",
  },
  {
    title: "Build fast",
    body: "Once the foundation is there, we run focused 10-day sprints to automate the bottlenecks.",
  },
] as const;

const mailtoLink =
  "mailto:admin@xenteck.com?subject=Fit%20Call%20%E2%80%93%20XenTeck&body=Name:%0ABusiness:%0AWebsite:%0ATime%20zone:%0AA%20couple%20of%20good%20time%20windows:%0A";

type SubmissionStatus = "idle" | "loading" | "success" | "error";
type ChatStatus = "idle" | "sending" | "error";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [headache, setHeadache] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hey, I'm the XenTeck AI systems assistant. Ask me about the Snapshot, our sprints, or whether we're a fit.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatStatus, setChatStatus] = useState<ChatStatus>("idle");
  const [chatError, setChatError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    const payload = {
      name: name.trim(),
      email: email.trim(),
      website: website.trim(),
      headache: headache.trim(),
    };

    if (!payload.email) {
      setStatus("error");
      setFeedback("Please add an email so we can send the snapshot.");
      return;
    }

    try {
      const response = await fetch("/api/snapshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setFeedback("Got it. We will send your snapshot to your email.");
      setName("");
      setEmail("");
      setWebsite("");
      setHeadache("");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  const sendChat = async () => {
    const question = chatInput.trim();
    if (!question) return;

    const nextMessages: ChatMessage[] = [
      ...chatMessages,
      { role: "user", content: question },
    ];

    setChatMessages(nextMessages);
    setChatStatus("sending");
    setChatError("");
    setChatInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-8) }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.message) {
        throw new Error(data.error || "Chat failed. Please try again.");
      }

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message ?? "" },
      ]);
      setChatStatus("idle");
    } catch (error) {
      setChatStatus("error");
      setChatError(
        error instanceof Error ? error.message : "Chat failed. Please try again.",
      );
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-black text-gray-100"
      style={{
        backgroundImage: "url('/assets/hero.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute right-[-6rem] top-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-20 top-96 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <main className="relative z-10 mx-auto flex max-w-5xl flex-col gap-16 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <section className="space-y-10">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.15)]" />
            <span>XenTeck / AI & Automation</span>
          </div>

          <div className="space-y-8">
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Turn your messy operations into an AI-ready machine.
              </h1>
              <p className="max-w-3xl text-lg text-gray-300 sm:text-xl">
                XenTeck helps small teams and agencies clean up their systems,
                wire in AI and automation, and stop losing money to chaos. We
                do not sell hype - we fix the parts of your business that
                actually hurt.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#fit-call"
                className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                Book a 20-minute fit call
              </a>
              <a
                href="#what-we-do"
                className="text-sm font-medium text-gray-300 transition hover:text-white"
              >
                Not ready to talk yet? See what we actually do.
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {processPoints.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/10 bg-white/10 p-4 shadow-[0_1px_0_rgba(255,255,255,0.08)]"
                >
                  <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-emerald-300">
                    <span className="text-sm font-semibold">*</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-300">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="snapshot"
          className="rounded-3xl border border-white/10 bg-neutral-900/70 p-8 shadow-[0_30px_120px_-80px_rgba(16,185,129,0.6)] backdrop-blur lg:p-10"
        >
          <div className="flex flex-col gap-3">
            <h2 id="snapshot" className="text-2xl font-semibold text-white">
              Get a free AI Systems Snapshot
            </h2>
            <p className="text-base text-gray-300">
              Drop your email and website. We will send you 3 blunt bullet
              points on where you are leaking time and money - and what we would
              fix first with AI and automation.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            <div className="sm:col-span-1">
              <label className="mb-2 block text-sm text-gray-300" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div className="sm:col-span-1">
              <label
                className="mb-2 block text-sm text-gray-300"
                htmlFor="email"
              >
                Email<span className="text-red-400"> *</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
                placeholder="you@company.com"
                autoComplete="email"
              />
            </div>

            <div className="sm:col-span-1">
              <label
                className="mb-2 block text-sm text-gray-300"
                htmlFor="website"
              >
                Website
              </label>
              <input
                id="website"
                name="website"
                type="url"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
                placeholder="https://"
                autoComplete="url"
              />
            </div>

            <div className="sm:col-span-1">
              <label
                className="mb-2 block text-sm text-gray-300"
                htmlFor="headache"
              >
                Biggest headache
              </label>
              <textarea
                id="headache"
                name="headache"
                rows={3}
                value={headache}
                onChange={(event) => setHeadache(event.target.value)}
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
                placeholder="What keeps breaking or slowing you down?"
              />
            </div>

            <div className="sm:col-span-2 flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Sending..." : "Send my snapshot"}
              </button>
              {feedback && (
                <p
                  className={`text-sm ${
                    status === "success" ? "text-emerald-300" : "text-red-300"
                  }`}
                >
                  {feedback}
                </p>
              )}
            </div>
          </form>
        </section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <section id="what-we-do" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            What we actually do
          </h2>
          <p className="text-base text-gray-300">
            We look at how leads, messages, and customers flow through your
            business right now. Then we design and build simple AI-powered
            systems that plug the leaks.
          </p>
          <p className="text-base text-gray-300">
            For some clients, that means a focused 10-day Sprint on top of a
            decent tech stack. For others, it means rebuilding the stack from
            the ground up so it finally works together.
          </p>
        </section>

        <section id="fit-call" className="space-y-4 rounded-2xl border border-white/10 bg-white/10 p-8 shadow-[0_20px_80px_-60px_rgba(255,255,255,0.45)]">
          <h2 className="text-2xl font-semibold text-white">
            Book a 20-minute fit call
          </h2>
          <p className="text-base text-gray-300">
            We will ask a few blunt questions about your tools, processes, and
            headaches, then tell you straight whether you are a better fit for
            an AI Systems Audit or a full Stack Reset.
          </p>
          <a
            href={mailtoLink}
            className="inline-flex w-fit items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Email us to book your fit call
          </a>
        </section>

        <section className="rounded-2xl border border-white/10 bg-neutral-950/70 p-8 shadow-[0_20px_80px_-60px_rgba(16,185,129,0.35)] backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Ask XenTeck</h3>
              <p className="text-sm text-gray-300">
                Live answers about our snapshot, sprints, and fit calls. Powered by your AI key.
              </p>
            </div>
            {chatError && (
              <span className="text-xs text-red-300">{chatError}</span>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <div className="flex max-h-72 flex-col gap-3 overflow-y-auto rounded-lg border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-black/40 to-cyan-500/10 p-4 shadow-[0_10px_50px_-30px_rgba(52,211,153,0.8)]">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[90%] rounded-md px-3 py-2 text-sm ${
                    msg.role === "assistant"
                      ? "bg-white/15 text-white border border-white/10 shadow-[0_10px_30px_-20px_rgba(255,255,255,0.6)]"
                      : "bg-emerald-500/20 text-emerald-50 border border-emerald-300/30 shadow-[0_10px_30px_-25px_rgba(52,211,153,0.8)]"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendChat();
                  }
                }}
                placeholder="Ask about the snapshot, sprints, or fit calls..."
                className="flex-1 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
              />
              <button
                type="button"
                onClick={sendChat}
                disabled={chatStatus === "sending"}
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_10px_30px_-15px_rgba(34,211,238,0.7)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {chatStatus === "sending" ? "Thinking..." : "Send"}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
