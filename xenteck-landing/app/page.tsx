"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const processPoints = [
  {
    title: "Map the mess",
    body: "We audit how leads, messages, and customers actually move through your business today. No fluff, just facts.",
  },
  {
    title: "Design the fix",
    body: "We show you exactly where you're leaking time and money, and what a clean, AI-ready stack looks like.",
  },
  {
    title: "Build fast",
    body: "Once the foundation is there, we run focused 10-day sprints to automate the bottlenecks that hurt most.",
  },
] as const;

const stats = [
  {
    value: "391%",
    unit: "",
    label: "Industry insight: Conversion lift when responding within 1 minute",
  },
  {
    value: "78%",
    unit: "",
    label: "Industry insight: Buyers choose the first business to respond",
  },
] as const;

const calendarBookingLink = "https://calendar.app.google/HHLGN441YwhAhsWc8";

type SubmissionStatus = "idle" | "loading" | "success" | "error";
type ChatStatus = "idle" | "sending" | "error";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [headache, setHeadache] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hey, I'm the XenTeck AI Concierge. Ask me about Speed-to-Lead timing, setup, or whether it's a fit.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatStatus, setChatStatus] = useState<ChatStatus>("idle");
  const [chatError, setChatError] = useState("");
  const [chatThreadId, setChatThreadId] = useState<string | null>(null);

  useEffect(() => {
    const storedThreadId = window.localStorage.getItem("xenteckChatThreadId");
    if (storedThreadId) {
      setChatThreadId(storedThreadId);
    }
  }, []);

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
      setPhone("");
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
      const payload = chatThreadId
        ? { message: question, threadId: chatThreadId }
        : { message: question };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
        threadId?: string;
      };

      if (!response.ok || !data.message) {
        throw new Error(data.error || "Chat failed. Please try again.");
      }

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message ?? "" },
      ]);
      if (data.threadId) {
        setChatThreadId(data.threadId);
        window.localStorage.setItem("xenteckChatThreadId", data.threadId);
      }
      setChatStatus("idle");
    } catch (error) {
      setChatStatus("error");
      setChatError(
        error instanceof Error ? error.message : "Chat failed. Please try again.",
      );
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-gray-100">
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-slate-950/30"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute right-[-6rem] top-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-20 top-96 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <main className="relative z-10 flex flex-col gap-16">
        {/* Hero Section */}
        <section
          aria-labelledby="hero-heading"
          className="flex w-full flex-col"
        >
          <div className="relative w-full min-h-screen overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/assets/Hero-Photo.png')",
                backgroundSize: "cover",
                backgroundPosition: "right top",
                backgroundRepeat: "no-repeat",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"
              aria-hidden="true"
            />
            <div className="relative z-10 w-full max-w-6xl px-4 pt-6 pb-12 sm:px-6 sm:pt-8 lg:px-6 lg:pt-10">
              <div className="max-w-2xl space-y-10">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-200">
                  <span
                    className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.15)]"
                    aria-hidden="true"
                  />
                  <span>Speed-to-Lead / Instant Booking Links</span>
                </div>

                <div className="space-y-8">
                  <div className="space-y-5">
                    <h1
                      id="hero-heading"
                      className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl"
                    >
                      Booking Links Delivered in Under 5 Seconds — Guaranteed
                    </h1>
                    <p className="max-w-xl text-base text-gray-300 sm:text-lg">
                      Put Your Booking Link in Front of Leads Faster Than a
                      Human Can React
                    </p>
                  </div>

                  {/* Speed Stats Bar */}
                  <div
                    className="flex flex-wrap gap-6 rounded-xl border border-emerald-400/40 bg-emerald-950/60 p-4 shadow-[0_10px_50px_-20px_rgba(52,211,153,0.5)]"
                    role="region"
                    aria-label="Industry insight statistics"
                  >
                    {stats.map((stat) => (
                      <div key={stat.label} className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-emerald-400">
                          {stat.value}
                        </span>
                        <span className="text-lg text-emerald-300">{stat.unit}</span>
                        <span className="ml-2 text-sm text-gray-300">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <a
                      href="#demo"
                      className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                      aria-label="See the live Speed-to-Lead demo"
                    >
                      See Live Demo
                    </a>
                    <a
                      href={calendarBookingLink}
                      className="inline-flex items-center justify-center rounded-md border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                      aria-label="Install Speed-to-Lead with a 48-hour deploy"
                    >
                      Install Speed-to-Lead (48-hr deploy)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          {/* Demo Section */}
          <section
            id="demo"
            aria-labelledby="demo-heading"
            className="relative scroll-mt-8 overflow-hidden rounded-3xl border border-emerald-400/30 bg-black/40 p-8 shadow-[0_40px_140px_-80px_rgba(16,185,129,0.9)] backdrop-blur lg:p-10"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_20%_0%,rgba(16,185,129,0.18),transparent_60%)]"
              aria-hidden="true"
            />
            <div className="relative z-10">
              <div className="flex flex-col gap-3">
                <h2
                  id="demo-heading"
                  className="text-2xl font-semibold text-white"
                >
                  See It In Real Time
                </h2>
                <p className="text-base text-gray-300">
                  Fill out the form below to see how fast your booking link
                  lands — often under 2 seconds.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8 grid gap-4 sm:grid-cols-2"
                aria-label="AI Systems Snapshot request form"
              >
            <div className="sm:col-span-1">
              <label
                className="mb-2 block text-sm text-gray-300"
                htmlFor="name"
              >
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
                htmlFor="phone"
              >
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
                placeholder="(555) 123-4567"
                autoComplete="tel"
                inputMode="tel"
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
                placeholder="https://yoursite.com"
                autoComplete="url"
              />
            </div>

            <div className="sm:col-span-1">
              <label
                className="mb-2 block text-sm text-gray-300"
                htmlFor="headache"
              >
                Biggest operational headache
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
                  role="status"
                  aria-live="polite"
                  className={`text-sm ${
                    status === "success" ? "text-emerald-300" : "text-red-300"
                  }`}
                >
                  {feedback}
                </p>
              )}
            </div>
            <p className="sm:col-span-2 text-xs leading-relaxed text-gray-500">
              By providing your phone number, you agree to receive SMS messages
              from XenTeck. Msg frequency varies. Msg &amp; data rates may apply.
              Reply STOP to opt out. HELP for help.{" "}
              <a href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </a>
              .
            </p>
              </form>
            </div>
          </section>

          {/* Industry Insights Section */}
          <section
            aria-labelledby="industry-insights-heading"
            className="scroll-mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_25px_80px_-60px_rgba(16,185,129,0.45)] sm:p-8"
          >
            <h2
              id="industry-insights-heading"
              className="text-2xl font-semibold text-white"
            >
              Industry Insights
            </h2>
            <div className="mt-3 space-y-3 text-sm text-gray-300">
              <p>
                Responding to leads within the first minute can increase
                conversion rates by up to 391% compared to slower follow-ups.
                (Source: industry research)
              </p>
              <p>
                Around 78% of buyers choose the first business that responds.
                (Source: industry research)
              </p>
              <span className="text-xs text-gray-400 underline underline-offset-4">
                Sources available upon request
              </span>
            </div>
          </section>

          {/* Process Section */}
          <section aria-labelledby="process-heading" className="scroll-mt-8">
            <div className="relative max-w-4xl rounded-3xl border border-emerald-400/25 bg-white/[0.005] p-6 backdrop-blur-xl shadow-[0_35px_120px_-80px_rgba(16,185,129,0.8)] sm:p-8">
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(90%_120%_at_15%_0%,rgba(16,185,129,0.18),transparent_65%)]"
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-6">
                <h2
                  id="process-heading"
                  className="text-2xl font-semibold text-white"
                >
                  Our Process
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {processPoints.map((item, index) => (
                    <article
                      key={item.title}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.01] p-4 shadow-[0_15px_40px_-25px_rgba(16,185,129,0.45)]"
                    >
                      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                        <span className="text-sm font-semibold">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-300">{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div
            className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
            aria-hidden="true"
          />

          {/* What We Do Section */}
          <section id="what-we-do" className="space-y-4 scroll-mt-8">
          <h2 className="text-2xl font-semibold text-white">
            What We Actually Do
          </h2>
          <p className="text-base text-gray-300">
            We look at how leads, messages, and customers flow through your
            business right now. Then we design and build{" "}
            <strong>AI-powered automation systems</strong> that plug the leaks —
            using the right tools for your business and your existing systems.
          </p>
          <p className="text-base text-gray-300">
            For some clients, that means a focused <strong>10-day Sprint</strong>{" "}
            to automate one critical bottleneck. For others, it means a complete{" "}
            <strong>Stack Reset</strong> — rebuilding your tech from the ground
            up so everything finally works together.
          </p>
          <div className="pt-4">
            <h3 className="text-lg font-semibold text-white mb-3">
              Industries We Serve
            </h3>
            <ul className="grid gap-2 sm:grid-cols-2 text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Real Estate Agencies & Brokerages
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Insurance Agencies
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Mortgage Lenders & Brokers
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Recruiting & Staffing Firms
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Marketing & Creative Agencies
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Home Services & Contractors
              </li>
            </ul>
          </div>
          </section>

          {/* Fit Call Section */}
          <section
            id="fit-call"
            className="space-y-4 scroll-mt-8 rounded-2xl border border-white/10 bg-white/10 p-8 shadow-[0_20px_80px_-60px_rgba(255,255,255,0.45)]"
          >
          <h2 className="text-2xl font-semibold text-white">
            Book a 15-Minute Strategy Call
          </h2>
          <p className="text-base text-gray-300">
            We'll ask a few blunt questions about your tools, processes, and
            headaches, then tell you straight whether you're a better fit for an{" "}
            <strong>AI Systems Audit</strong> or a full{" "}
            <strong>Stack Reset</strong>. No pitch. Just clarity.
          </p>
          <a
            href={calendarBookingLink}
            className="inline-flex w-fit items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
            aria-label="Book your 15-minute strategy call with XenTeck"
          >
            Book Your Strategy Call →
          </a>
          </section>

          {/* Chat Widget Section */}
          <section
            id="chat"
            aria-labelledby="chat-heading"
            className="relative overflow-hidden rounded-2xl border border-emerald-400/30 bg-neutral-950/70 p-8 shadow-[0_35px_120px_-80px_rgba(16,185,129,0.85)] backdrop-blur"
          >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_85%_0%,rgba(16,185,129,0.16),transparent_60%)]"
            aria-hidden="true"
          />
          <div className="absolute right-6 top-6 hidden items-center gap-2 rounded-full border border-emerald-400/40 bg-black/50 px-3 py-1 text-xs font-semibold text-emerald-100 shadow-[0_15px_40px_-25px_rgba(16,185,129,0.8)] backdrop-blur md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            AI Concierge Live
          </div>
          <div className="relative z-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 id="chat-heading" className="text-xl font-semibold text-white">
                Ask XenTeck
              </h3>
              <p className="text-sm text-gray-300">
                Live answers about Speed-to-Lead response times, setup, and fit.
                Powered by AI.
              </p>
            </div>
            {chatError && (
              <span className="text-xs text-red-300" role="alert">
                {chatError}
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <div
              className="flex max-h-72 flex-col gap-3 overflow-y-auto rounded-lg border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-black/40 to-cyan-500/10 p-4 shadow-[0_10px_50px_-30px_rgba(52,211,153,0.8)]"
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
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
              <label htmlFor="chat-input" className="sr-only">
                Ask a question about XenTeck services
              </label>
              <input
                id="chat-input"
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendChat();
                  }
                }}
                placeholder="Ask about Speed-to-Lead timing, setup, or fit..."
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
          </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} XenTeck. AI automation consulting for
            businesses that want to move faster.
          </p>
          <p className="mt-2">
            <a
              href="mailto:admin@xenteck.com"
              className="hover:text-white transition"
            >
              admin@xenteck.com
            </a>
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </a>
            <span className="text-gray-600">|</span>
            <a href="/terms" className="hover:text-white transition">
              Terms of Service
            </a>
          </div>
          </footer>
        </div>
        <a
          href="#chat"
          className="fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full border border-emerald-400/40 bg-black/70 px-4 py-3 text-sm font-semibold text-emerald-100 shadow-[0_20px_60px_-25px_rgba(16,185,129,0.9)] backdrop-blur transition hover:brightness-110 md:inline-flex"
          aria-label="Jump to the Ask XenTeck chat"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
          </span>
          Ask XenTeck
        </a>
      </main>
    </div>
  );
}
