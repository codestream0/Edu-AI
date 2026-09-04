"use client";
import { ThemeToggle } from "@/components/dashboard/themetoggle";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import {
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Brain,
  Check,
  ChevronDown,
  FileText,
  Flame,
  Menu,
  MessageCircle,
  Moon,
  Play,
  Sparkles,
  Sun,
  Upload,
  X,
  Zap,
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/80">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3FF]">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              EDU <span className="text-[#2F80ED]">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-[#2F80ED] dark:text-slate-300"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-[#2F80ED] dark:text-slate-300"
            >
              How it works
            </a>

            <a
              href="#ai-tutor"
              className="text-sm font-medium text-slate-600 transition hover:text-[#2F80ED] dark:text-slate-300"
            >
              AI Tutor
            </a>

            <a
              href="#documents"
              className="text-sm font-medium text-slate-600 transition hover:text-[#2F80ED] dark:text-slate-300"
            >
              Documents
            </a>

            <a
              href="#quizzes"
              className="text-sm font-medium text-slate-600 transition hover:text-[#2F80ED] dark:text-slate-300"
            >
              Quizzes
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 sm:flex">
            <ThemeToggle />
            <Link
              href="/login"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Sign in
            </Link>

            <Link
              href="/signup"
              className="flex items-center gap-2 rounded-xl bg-[#2F80ED] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2.5 text-slate-700 hover:bg-slate-100 sm:hidden dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-5 sm:hidden dark:border-slate-800 dark:bg-slate-950">
            <nav className="flex flex-col gap-2">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                How it works
              </a>

              <a
                href="#ai-tutor"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                AI Tutor
              </a>

              <a
                href="#documents"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                Documents
              </a>

              <a
                href="#quizzes"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                Quizzes
              </a>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold dark:border-slate-700"
                >
                  Sign in
                </Link>

                <Link
                  href="/signup"
                  className="rounded-xl bg-[#2F80ED] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Get started
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative pt-32 sm:pt-40">
        {/* Background decorations */}
        <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-100 w-100 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-[#2F80ED] dark:border-blue-900/50 dark:bg-blue-950/40">
            <Sparkles className="h-4 w-4" />
            Your intelligent study companion
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-5xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Study smarter.
            <br />
            <span className="bg-linear-to-r from-[#2F80ED] to-[#60A5FA] bg-clip-text text-transparent">
              Learn better with AI.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-slate-400">
            EDU AI is your personal AI-powered learning assistant. Ask
            questions, understand difficult topics, summarize your study
            materials, generate quizzes, and track your progress — all in one
            place.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="group flex items-center justify-center gap-2 rounded-xl bg-[#2F80ED] px-6 py-3.5 font-semibold text-white shadow-xl shadow-blue-500/20 transition hover:-translate-y-1 hover:bg-blue-600"
            >
              Start learning for free
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>

            <a
              href="#how-it-works"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Play className="h-4 w-4 fill-current" />
              See how it works
            </a>
          </div>

          {/* Trust points */}
          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-green-500" />
              AI-powered learning
            </span>

            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-green-500" />
              PDF, PPTX & DOCX
            </span>

            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-green-500" />
              Personalized study
            </span>
          </div>

          {/* =====================================================
              DASHBOARD PREVIEW
          ===================================================== */}
          <div className="relative mx-auto mt-16 max-w-6xl">
            <div className="absolute -inset-4 -z-10 rounded-4xl bg-blue-500/10 blur-2xl" />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900">
              
              {/* Browser bar */}
              <div className="flex h-12 items-center gap-2 border-b border-slate-200 px-4 dark:border-slate-800">
                <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700" />

                <div className="mx-auto hidden h-7 w-72 rounded-lg bg-slate-100 sm:block dark:bg-slate-800" />
              </div>

              <div className="grid min-h-130 grid-cols-[190px_1fr]">
                {/* Mini sidebar */}
                <div className="hidden border-r border-slate-200 p-4 sm:block dark:border-slate-800">
                  <div className="mb-7 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF3FF]">
                      <Sparkles className="h-4 w-4 text-[#2F80ED]" />
                    </div>
                    <span className="font-bold">EDU AI</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      ["Dashboard", true],
                      ["AI Tutor", false],
                      ["Documents", false],
                      ["Quizzes", false],
                      ["Progress", false],
                    ].map(([name, active]) => (
                      <div
                        key={name as string}
                        className={`rounded-lg px-3 py-2 text-xs font-medium ${
                          active
                            ? "bg-blue-50 text-[#2F80ED] dark:bg-blue-950/50"
                            : "text-slate-500"
                        }`}
                      >
                        {name as string}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dashboard */}
                <div className="bg-[#F5F9FF] p-5 dark:bg-slate-950 sm:p-7">
                  <div className="mb-7 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Good morning</p>
                      <h3 className="mt-1 text-lg font-bold">
                        Welcome back, Hamza 👋
                      </h3>
                    </div>

                    <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 sm:flex">
                      H
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {[
                      {
                        icon: FileText,
                        title: "Documents",
                        value: "12",
                      },
                      {
                        icon: Brain,
                        title: "Quizzes",
                        value: "10",
                      },
                      {
                        icon: BarChart3,
                        title: "Avg. Score",
                        value: "82%",
                      },
                      {
                        icon: Flame,
                        title: "Study Streak",
                        value: "7 days",
                      },
                    ].map((stat) => {
                      const Icon = stat.icon;

                      return (
                        <div
                          key={stat.title}
                          className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
                        >
                          <Icon className="h-4 w-4 text-[#2F80ED]" />
                          <p className="mt-3 text-xs text-slate-500">
                            {stat.title}
                          </p>
                          <p className="mt-1 text-lg font-bold">
                            {stat.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Activity cards */}
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        icon: Upload,
                        title: "Upload Document",
                        text: "Share your study material",
                      },
                      {
                        icon: MessageCircle,
                        title: "Ask EDU AI",
                        text: "Start a learning session",
                      },
                      {
                        icon: Sparkles,
                        title: "AI Summary",
                        text: "Turn notes into concise summaries",
                      },
                      {
                        icon: Brain,
                        title: "Take a Quiz",
                        text: "Practice from your materials",
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40">
                            <Icon className="h-5 w-5 text-[#2F80ED]" />
                          </div>

                          <div>
                            <p className="text-sm font-semibold">
                              {item.title}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-500">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================= */}
      <section
        id="features"
        className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2F80ED]">
              Everything you need
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              One platform for your entire learning journey
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              From understanding difficult concepts to preparing for exams,
              EDU AI gives you the tools to learn more effectively.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Sparkles />}
              title="AI Tutor"
              description="Ask questions about any topic and get clear, personalized explanations whenever you need them."
            />

            <FeatureCard
              icon={<FileText />}
              title="Smart Documents"
              description="Upload PDF, PPTX or DOCX files and turn your study materials into interactive learning resources."
            />

            <FeatureCard
              icon={<Brain />}
              title="AI Quizzes"
              description="Generate quizzes from your study materials and test your understanding before exams."
            />

            <FeatureCard
              icon={<BarChart3 />}
              title="Track Progress"
              description="Monitor your quiz scores, study streaks and learning activity in one place."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section
        id="how-it-works"
        className="scroll-mt-24 bg-[#F5F9FF] px-4 py-24 sm:px-6 lg:px-8 dark:bg-slate-900/50"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2F80ED]">
              Simple by design
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              How EDU AI works
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Spend less time organizing your studies and more time actually
              learning.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-4">
            <Step
              number="01"
              icon={<Upload />}
              title="Upload"
              description="Upload your PDF, PPTX or DOCX study materials."
            />

            <Step
              number="02"
              icon={<Zap />}
              title="Analyze"
              description="EDU AI processes your material and understands its content."
            />

            <Step
              number="03"
              icon={<MessageCircle />}
              title="Learn"
              description="Ask questions, get explanations and generate summaries."
            />

            <Step
              number="04"
              icon={<Brain />}
              title="Practice"
              description="Generate quizzes and track your learning progress."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          AI TUTOR
      ========================================================= */}
      <section
        id="ai-tutor"
        className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40">
              <Sparkles className="h-6 w-6 text-[#2F80ED]" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-wider text-[#2F80ED]">
              Personal AI Tutor
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Never get stuck on a difficult topic again.
            </h2>

            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
              Ask EDU AI anything about your course. Get explanations that
              match your level of understanding, ask follow-up questions and
              explore concepts until everything makes sense.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Ask questions in natural language",
                "Get step-by-step explanations",
                "Ask follow-up questions",
                "Learn at your own pace",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
                    <Check className="h-3 w-3 text-[#2F80ED]" />
                  </div>

                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/ai-tutor"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-[#2F80ED] hover:text-blue-600"
            >
              Try AI Tutor
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Chat UI */}
          <div className="rounded-3xl border border-slate-200 bg-[#F5F9FF] p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50">
                  <Sparkles className="h-5 w-5 text-[#2F80ED]" />
                </div>

                <div>
                  <p className="text-sm font-bold">EDU AI Tutor</p>
                  <p className="text-xs text-green-500">● Online</p>
                </div>
              </div>

              <div className="space-y-5 py-6">
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-[#2F80ED] px-4 py-3 text-sm text-white">
                  Can you explain binary trees in simple terms?
                </div>

                <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-slate-100 px-4 py-3 text-sm leading-6 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  Of course! Think of a binary tree like a family tree where
                  every person can have at most two children. Each node can
                  connect to a left child and a right child...
                </div>

                <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-md bg-[#2F80ED] px-4 py-3 text-sm text-white">
                  What is a real-world example?
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-2 dark:border-slate-700">
                <div className="flex-1 px-2 text-sm text-slate-400">
                  Ask EDU AI anything...
                </div>

                <button className="rounded-lg bg-[#2F80ED] p-2 text-white">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DOCUMENTS
      ========================================================= */}
      <section
        id="documents"
        className="scroll-mt-24 bg-slate-950 px-4 py-24 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          
          <div className="order-2 lg:order-1">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
                      <FileText className="h-5 w-5 text-red-400" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Calculus II Notes.pdf
                      </p>

                      <p className="text-xs text-slate-500">
                        24 pages • 4.2 MB
                      </p>
                    </div>
                  </div>

                  <Check className="h-5 w-5 text-green-400" />
                </div>

                <div className="mt-7">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    AI Summary
                  </p>

                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-full rounded-full bg-slate-800" />
                    <div className="h-3 w-11/12 rounded-full bg-slate-800" />
                    <div className="h-3 w-9/12 rounded-full bg-slate-800" />
                    <div className="h-3 w-10/12 rounded-full bg-slate-800" />
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-900 p-4">
                    <Sparkles className="h-4 w-4 text-blue-400" />
                    <p className="mt-2 text-xs text-slate-400">
                      AI Summary
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-900 p-4">
                    <Brain className="h-4 w-4 text-purple-400" />
                    <p className="mt-2 text-xs text-slate-400">
                      Generate Quiz
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10">
              <FileText className="h-6 w-6 text-blue-400" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Smart Documents
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Your notes are more powerful with AI.
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              Upload your study materials and let EDU AI transform them into
              useful learning resources. No more reading through hundreds of
              pages just to find what matters.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <DarkFeature
                icon={<Upload />}
                title="Upload"
                text="PDF, PPTX & DOCX"
              />

              <DarkFeature
                icon={<Sparkles />}
                title="Summarize"
                text="Instant AI summaries"
              />

              <DarkFeature
                icon={<MessageCircle />}
                title="Ask"
                text="Chat with your material"
              />

              <DarkFeature
                icon={<Brain />}
                title="Practice"
                text="Generate quizzes"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          QUIZZES
      ========================================================= */}
      <section
        id="quizzes"
        className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40">
              <Brain className="h-6 w-6 text-[#2F80ED]" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-wider text-[#2F80ED]">
              AI Generated Quizzes
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Turn your study material into practice.
            </h2>

            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
              EDU AI can create quizzes directly from your uploaded materials.
              Practice what you actually need to know and discover the areas
              where you need more work.
            </p>

            <Link
              href="/quiz"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-[#2F80ED]"
            >
              Explore quizzes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-[#F5F9FF] p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-950">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Question 4 of 10</p>
                  <h3 className="mt-2 font-bold">
                    What is the derivative of x²?
                  </h3>
                </div>

                <div className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#2F80ED] dark:bg-blue-950">
                  40%
                </div>
              </div>

              <div className="mt-6 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-2 w-[40%] rounded-full bg-[#2F80ED]" />
              </div>

              <div className="mt-6 space-y-3">
                {["x", "2x", "x²", "2"].map((answer, index) => (
                  <div
                    key={answer}
                    className={`flex items-center justify-between rounded-xl border p-4 text-sm ${
                      index === 1
                        ? "border-[#2F80ED] bg-blue-50 text-[#2F80ED] dark:bg-blue-950/40"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <span>{answer}</span>

                    {index === 1 && <Check className="h-4 w-4" />}
                  </div>
                ))}
              </div>

              <button className="mt-5 w-full rounded-xl bg-[#2F80ED] py-3 text-sm font-semibold text-white">
                Next question
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROGRESS
      ========================================================= */}
      <section className="bg-[#F5F9FF] px-4 py-24 sm:px-6 lg:px-8 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2F80ED]">
            Keep improving
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            See your learning progress
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            Stay motivated by seeing how much you've learned and where you can
            improve.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ProgressCard
              icon={<FileText />}
              value="12"
              label="Documents studied"
            />

            <ProgressCard
              icon={<Brain />}
              value="10"
              label="Quizzes completed"
            />

            <ProgressCard
              icon={<BarChart3 />}
              value="82%"
              label="Average score"
            />

            <ProgressCard
              icon={<Flame />}
              value="7"
              label="Day study streak"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#2F80ED] px-6 py-16 text-center text-white shadow-2xl shadow-blue-500/20 sm:px-12">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

          <Sparkles className="mx-auto h-8 w-8" />

          <h2 className="relative mt-5 text-3xl font-bold sm:text-4xl">
            Ready to study smarter?
          </h2>

          <p className="relative mx-auto mt-4 max-w-xl text-blue-100">
            Join EDU AI and turn your study materials into a personalized
            learning experience.
          </p>

          <Link
            href="/signup"
            className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-[#2F80ED] shadow-lg transition hover:-translate-y-1"
          >
            Get started for free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-slate-200 px-4 py-12 dark:border-slate-800 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF3FF]">
                  <Sparkles className="h-4 w-4 text-[#2F80ED]" />
                </div>

                <span className="font-bold">
                  EDU <span className="text-[#2F80ED]">AI</span>
                </span>
              </Link>

              <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
                An AI-powered learning companion designed to help students
                understand, practice and learn more effectively.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Product</h3>

              <div className="mt-4 space-y-3 text-sm text-slate-500">
                <Link className="block hover:text-[#2F80ED]" href="/ai-tutor">
                  AI Tutor
                </Link>

                <Link className="block hover:text-[#2F80ED]" href="/document">
                  Documents
                </Link>

                <Link className="block hover:text-[#2F80ED]" href="/quiz">
                  Quizzes
                </Link>

                <Link className="block hover:text-[#2F80ED]" href="/progress">
                  Progress
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Account</h3>

              <div className="mt-4 space-y-3 text-sm text-slate-500">
                <Link className="block hover:text-[#2F80ED]" href="/login">
                  Sign in
                </Link>

                <Link className="block hover:text-[#2F80ED]" href="/signup">
                  Create account
                </Link>

                <a className="block hover:text-[#2F80ED]" href="#features">
                  Features
                </a>

                <a className="block hover:text-[#2F80ED]" href="#how-it-works">
                  How it works
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
            <p>© 2026 EDU AI. All rights reserved.</p>

            <p>Built for students, powered by AI.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* =============================================================
   COMPONENTS
   ============================================================= */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#2F80ED] dark:bg-blue-950/40">
        {icon}
      </div>

      <h3 className="mt-5 font-bold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-[#2F80ED] opacity-0 transition group-hover:opacity-100">
        Learn more
        <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  );
}

function Step({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#2F80ED] shadow-sm dark:bg-slate-900">
        {icon}
      </div>

      <span className="mt-4 block text-xs font-bold text-[#2F80ED]">
        {number}
      </span>

      <h3 className="mt-2 font-bold">{title}</h3>

      <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

function DarkFeature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="text-blue-400">{icon}</div>

      <p className="mt-3 text-sm font-semibold">{title}</p>

      <p className="mt-1 text-xs text-slate-500">{text}</p>
    </div>
  );
}

function ProgressCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2F80ED] dark:bg-blue-950/40">
        {icon}
      </div>

      <p className="mt-5 text-3xl font-bold">{value}</p>

      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}