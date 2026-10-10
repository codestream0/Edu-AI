
"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  FileText,
  LifeBuoy,
  Mail,
  MessageSquare,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

const faqs = [
  {
    category: "Getting started",
    question: "What is EDU AI?",
    answer:
      "EDU AI is an AI-powered learning platform that helps students understand topics, work with study documents, generate summaries, and practise with quizzes.",
  },
  {
    category: "Getting started",
    question: "How do I get started with EDU AI?",
    answer:
      "Open the AI Tutor to ask a question, or visit Documents to upload your learning materials. You can then generate a summary or create a quiz from supported documents.",
  },
  {
    category: "AI Tutor",
    question: "How do I ask the AI Tutor a question?",
    answer:
      "Open AI Tutor, enter your question in the message box, and submit it. Be specific about the topic and the level of explanation you need. Verify important information against your course materials.",
  },
  {
    category: "Documents",
    question: "Which document formats can I upload?",
    answer:
      "EDU AI supports PDF, PPTX, and DOCX documents. The upload interface specifies a maximum file size of 10 MB. Check that your file is valid and readable before uploading.",
  },
  {
    category: "Documents",
    question: "Why is my document upload failing?",
    answer:
      "Check that the file is PDF, PPTX, or DOCX and is within the 10 MB limit. Make sure your internet connection is stable, then try again. If it still fails, report the issue to support.",
  },
  {
    category: "Documents",
    question: "How do I generate a document summary?",
    answer:
      "Open Documents, select the document you want to study, and use the summary feature when processing has completed. If processing remains stuck, refresh the page and try again later.",
  },
  {
    category: "Quizzes",
    question: "How do I create a quiz from my document?",
    answer:
      "Open the relevant document and choose the quiz option when it is available. Review the generated questions before starting your practice session.",
  },
  {
    category: "Quizzes",
    question: "Where can I see my quiz results?",
    answer:
      "Open Quizzes to access your quiz activities. Study Progress can help you review your learning activity and performance when those records are available.",
  },
  {
    category: "Account & security",
    question: "How do I change my name or password?",
    answer:
      "Open Settings. You can update your profile name and use the password section to change your password. Your current password is required for a password change.",
  },
  {
    category: "Account & security",
    question: "How do I change the app theme?",
    answer:
      "Open Settings and select Light, Dark, or System in the Appearance section. System mode follows your device's appearance preference.",
  },
];

const guides = [
  {
    icon: Bot,
    title: "Learn with AI Tutor",
    description:
      "Ask questions, explore unfamiliar concepts, and get explanations.",
    href: "/ai-tutor",
    label: "Start learning",
  },
  {
    icon: FileText,
    title: "Work with documents",
    description:
      "Upload course materials and organise your study resources.",
    href: "/document",
    label: "Open documents",
  },
  {
    icon: Sparkles,
    title: "Generate summaries",
    description:
      "Turn supported learning documents into concise study notes.",
    href: "/document",
    label: "View documents",
  },
  {
    icon: BookOpen,
    title: "Practise with quizzes",
    description:
      "Test your understanding and review your learning progress.",
    href: "/quiz",
    label: "Open quizzes",
  },
];

const categories = [
  "All topics",
  "Getting started",
  "AI Tutor",
  "Documents",
  "Quizzes",
  "Account & security",
];

const cardClass =
  "rounded-2xl border border-slate-800 bg-[#111B30]";

const inputClass =
  "w-full rounded-xl border border-slate-700 bg-[#0B1224] px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-[#2F80ED] focus:ring-2 focus:ring-blue-500/20";

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All topics");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All topics" ||
        faq.category === activeCategory;

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const supportMessage = [
      "EDU AI Support Request",
      "",
      `Subject: ${subject.trim()}`,
      "",
      message.trim(),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(supportMessage);
      setCopied(true);
    } catch {
      setCopied(false);
      window.alert(
        "Unable to copy automatically. Please copy your message manually.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#0F172A] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Page heading */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
              <LifeBuoy size={16} />
              Help &amp; Support
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              How can we help you?
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Find answers, learn how to use EDU AI, and get help when
              something is not working.
            </p>
          </div>

          <Link
            href="/settings"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-800 bg-[#111B30] px-4 py-2.5 text-sm font-medium transition hover:border-slate-700 hover:bg-[#172238]"
          >
            <ShieldCheck size={17} />
            Account settings
          </Link>
        </header>

        {/* Hero search */}
        <section className="relative overflow-hidden rounded-3xl bg-[#2F80ED] p-6 text-white sm:p-9">
          <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full border-28 border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 right-36 h-48 w-48 rounded-full bg-white/10" />

          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium">
              <Sparkles size={14} />
              EDU AI Help Centre
            </span>

            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
              Find the answers you need.
            </h2>

            <p className="mt-2 text-sm leading-6 text-blue-100">
              Search common questions about your account, documents, AI
              Tutor, and quizzes.
            </p>

            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white p-2 shadow-lg">
              <Search className="ml-2 shrink-0 text-slate-400" size={21} />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search for an answer..."
                aria-label="Search help articles"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={17} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Quick-start guides */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Quick-start guides</h2>
            <p className="mt-1 text-sm text-slate-400">
              Get straight to the feature you need.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {guides.map((guide) => {
              const Icon = guide.icon;

              return (
                <Link
                  key={guide.title}
                  href={guide.href}
                  className="group rounded-2xl border border-slate-800 bg-[#111B30] p-5 transition hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-[#131F36] hover:shadow-lg hover:shadow-black/10"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-4 font-semibold">{guide.title}</h3>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                    {guide.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-400">
                    {guide.label}
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Frequently asked questions */}
        <section
          id="faqs"
          className="grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]"
        >
          <aside>
            <h2 className="text-lg font-bold">
              Frequently asked questions
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Browse by topic to find a solution quickly.
            </p>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                    activeCategory === category
                      ? "bg-blue-500/15 text-blue-400"
                      : "text-slate-400 hover:bg-[#172238] hover:text-slate-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </aside>

          <div className={`${cardClass} p-4 sm:p-6`}>
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold">
                  {activeCategory === "All topics"
                    ? "All questions"
                    : activeCategory}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  {filteredFaqs.length}{" "}
                  {filteredFaqs.length === 1 ? "article" : "articles"} found
                </p>
              </div>

              <CircleHelp size={22} className="shrink-0 text-blue-400" />
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="divide-y divide-slate-800">
                {filteredFaqs.map((faq) => {
                  const isOpen = openFaq === faq.question;

                  return (
                    <div key={faq.question} className="py-1">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaq(isOpen ? null : faq.question)
                        }
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 py-4 text-left"
                      >
                        <span className="text-sm font-medium leading-6 sm:text-base">
                          {faq.question}
                        </span>

                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-slate-400 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="pb-4 pr-5">
                          <p className="text-sm leading-7 text-slate-300">
                            {faq.answer}
                          </p>

                          <span className="mt-3 inline-flex rounded-full bg-[#1E293B] px-2.5 py-1 text-xs text-slate-400">
                            {faq.category}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Search
                  size={28}
                  className="mx-auto text-slate-600"
                />

                <h3 className="mt-3 font-semibold">No answers found</h3>

                <p className="mt-1 text-sm text-slate-400">
                  Try a different search term or select another topic.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All topics");
                  }}
                  className="mt-4 text-sm font-semibold text-blue-400 hover:text-blue-300"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Troubleshooting */}
        <section className={`${cardClass} p-5 sm:p-7`}>
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <LifeBuoy size={22} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold">Still having trouble?</h2>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                Try these checks before reporting a technical issue.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Check your connection",
                    description:
                      "Confirm your internet is working before retrying an AI request or upload.",
                  },
                  {
                    title: "Check your document",
                    description:
                      "Use a supported file format and keep uploads within the 10 MB limit.",
                  },
                  {
                    title: "Refresh and retry",
                    description:
                      "Reload the page and repeat the action. If it persists, report what happened.",
                  },
                ].map((tip) => (
                  <div key={tip.title} className="flex gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-400"
                    />

                    <div>
                      <h3 className="text-sm font-semibold">{tip.title}</h3>

                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact support */}
        <section
          id="contact-support"
          className="overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-br from-[#111B30] to-[#0F172A] p-6 sm:p-8"
        >
          <div className="grid gap-7 md:grid-cols-[1fr_0.85fr] md:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
                <MessageSquare size={23} />
              </div>

              <h2 className="mt-5 text-xl font-bold sm:text-2xl">
                Didn&apos;t find what you need?
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-7 text-slate-400">
                Prepare a support request with a clear subject and description
                of the problem. Include the page you were using and any error
                message you saw.
              </p>

              <button
                type="button"
                onClick={() => {
                  setShowContactForm((current) => !current);
                  setCopied(false);
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#2F80ED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                <Mail size={17} />
                {showContactForm
                  ? "Close support form"
                  : "Contact support"}
                <ArrowDownRight size={16} />
              </button>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0B1224] p-5">
              <h3 className="font-semibold">When reporting an issue</h3>

              <ul className="mt-4 space-y-3">
                {[
                  "Describe what you were trying to do.",
                  "Include the exact error message, if any.",
                  "Mention the page and approximate time.",
                  "Never include your password or access token.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-6 text-slate-400"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-blue-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {showContactForm && (
            <form
              onSubmit={handleContactSubmit}
              className="mt-7 max-w-2xl space-y-4 border-t border-slate-800 pt-6"
            >
              <div>
                <label
                  htmlFor="support-subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Subject
                </label>

                <input
                  id="support-subject"
                  required
                  maxLength={120}
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="e.g. Document upload is failing"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="support-message"
                  className="mb-2 block text-sm font-medium"
                >
                  Describe the problem
                </label>

                <textarea
                  id="support-message"
                  required
                  minLength={10}
                  maxLength={3000}
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Tell us what happened and what you expected..."
                  className={`${inputClass} resize-y leading-6`}
                />

                <p className="mt-1 text-right text-xs text-slate-500">
                  {message.length}/3000
                </p>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2F80ED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                <Send size={16} />
                Copy support request
              </button>

              {copied && (
                <p
                  role="status"
                  className="flex items-center gap-2 text-sm text-emerald-400"
                >
                  <CheckCircle2 size={17} />
                  Support request copied. You can now paste it into your
                  support channel.
                </p>
              )}

              <p className="text-xs leading-5 text-slate-500">
                This form copies your message; it does not send it to a
                support team. A backend support endpoint or configured
                support email is needed for direct submission.
              </p>
            </form>
          )}
        </section>

        {/* Footer */}
        <footer className="flex flex-col gap-3 border-t border-slate-800 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>EDU AI — Your learning companion.</p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard"
              className="transition hover:text-blue-400"
            >
              Dashboard
            </Link>

            <Link
              href="/settings"
              className="transition hover:text-blue-400"
            >
              Settings
            </Link>

            <Link
              href="/ai-tutor"
              className="transition hover:text-blue-400"
            >
              AI Tutor
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
