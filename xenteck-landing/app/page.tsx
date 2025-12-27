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
  { value: "6", unit: "sec", label: "Lead response time" },
  { value: "391%", unit: "", label: "Conversion lift at 1 min" },
  { value: "78%", unit: "", label: "Deals to first responder" },
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

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Hero Section */}
        <section
          aria-labelledby="hero-heading"
          className="-mx-4 flex flex-col sm:-mx-6 lg:-mx-8"
        >
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "16 / 9" }}
          >
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
            <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
              <div className="max-w-2xl space-y-10 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-[0_25px_70px_-50px_rgba(15,118,110,0.6)] sm:p-8">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-300">
                  <span
                    className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.15)]"
                    aria-hidden="true"
                  />
                  <span>XenTeck / AI Automation Consulting</span>
                </div>

                <div className="space-y-8">
                  <div className="space-y-5">
                    <h1
                      id="hero-heading"
                      className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl"
                    >
                      Stop Losing Leads to Slow Response Times
                    </h1>
                    <p className="max-w-xl text-base text-gray-300 sm:text-lg">
                      <strong>78% of deals go to the first responder.</strong>{" "}
                      XenTeck builds AI-powered automation systems that contact
                      your leads in <em>under 6 seconds</em> - not 6 hours. We
                      audit your operations, find where you're bleeding money,
                      and wire in automation that actually works.
                    </p>
                  </div>

                  {/* Speed Stats Bar */}
                  <div
                    className="flex flex-wrap gap-6 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 shadow-[0_10px_50px_-20px_rgba(52,211,153,0.5)] backdrop-blur"
                    role="region"
                    aria-label="Speed to Lead Statistics"
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
                      href={calendarBookingLink}
                      className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                      aria-label="Book a 15-minute strategy call with XenTeck"
                    >
                      Book a 15-min Strategy Call
                    </a>
                    <a
                      href="#snapshot"
                      className="text-sm font-medium text-gray-300 transition hover:text-white"
                    >
                      Not ready to talk yet? Get a free AI Snapshot
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "16 / 9" }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/assets/Hero-Photo2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent"
              aria-hidden="true"
            />
            <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
              <div className="max-w-4xl space-y-6 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-[0_25px_70px_-50px_rgba(15,118,110,0.5)] sm:p-8">
                <h2 id="process-heading" className="text-2xl font-semibold text-white">
                  Our Process
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {processPoints.map((item, index) => (
                    <article
                      key={item.title}
                      className="rounded-xl border border-white/10 bg-white/10 p-4 shadow-[0_1px_0_rgba(255,255,255,0.08)]"
                    >
                      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-emerald-300">
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
          </div>
        </section>

        {/* Snapshot Form Section */}
        <section
          id="snapshot"
          aria-labelledby="snapshot-heading"
          className="scroll-mt-8 rounded-3xl border border-white/15 bg-black/50 p-8 shadow-[0_30px_120px_-80px_rgba(16,185,129,0.6)] backdrop-blur lg:p-10"
        >
          <div className="flex flex-col gap-3">
            <h2
              id="snapshot-heading"
              className="text-2xl font-semibold text-white"
            >
              Get Your Free AI Systems Snapshot
            </h2>
            <p className="text-base text-gray-300">
              Drop your email and website. We'll send you{" "}
              <strong>3 specific automation opportunities</strong> where you're
              leaking time and money — and exactly what we'd fix first. No
              generic advice. Real analysis.
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
          aria-labelledby="chat-heading"
          className="rounded-2xl border border-white/10 bg-neutral-950/70 p-8 shadow-[0_20px_80px_-60px_rgba(16,185,129,0.35)] backdrop-blur"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 id="chat-heading" className="text-xl font-semibold text-white">
                Ask XenTeck
              </h3>
              <p className="text-sm text-gray-300">
                Live answers about our snapshot, sprints, and fit calls. Powered
                by AI.
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
      </main>
    </div>
  );
}
