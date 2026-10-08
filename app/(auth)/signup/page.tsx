"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setCredentials } from "@/lib/redux/features/auth/authSlice";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/signup", {
        fullName,
        email,
        password,
      });

      dispatch(
        setCredentials({
          user: response.data.user,
          accessToken: response.data.accessToken,
        }),
      );
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Unable to create your account. Please try again.",
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      {/* Left */}
      <section className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-blue-100 via-[#DCEBFF] to-[#BBD7FF] p-10 lg:flex xl:p-14">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute -left-24 top-40 h-80 w-80 rounded-full bg-blue-300/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-indigo-300/40 blur-3xl" />
        <div className="pointer-events-none absolute right-16 top-24 h-32 w-32 rounded-full border-2 border-blue-400/30" />

        {/* Brand */}
        <Link href="/" className="relative z-10 flex w-fit items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2F80ED] text-white shadow-lg shadow-blue-500/20">
            <GraduationCap size={27} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              EDU AI
            </h1>
            <p className="text-xs font-medium text-slate-600">
              Learn smarter, every day.
            </p>
          </div>
        </Link>

        {/* Main content */}
        <div className="relative z-10 my-12 max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-sm font-medium text-[#2468C5] shadow-sm backdrop-blur">
            <Sparkles size={16} />
            Your personal AI learning companion
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 xl:text-5xl">
            Your next chapter
            <br />
            <span className="text-[#2F80ED]">starts here.</span>
          </h2>

          <p className="mt-5 max-w-md text-base leading-7 text-slate-600 xl:text-lg">
            Create your account and make studying simpler. Understand difficult
            topics, learn from your documents, and test your knowledge with AI.
          </p>

          {/* Feature cards */}
          <div className="mt-9 space-y-4">
            <div className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#2F80ED]">
                <BookOpen size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Learn from your materials
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Turn your documents into useful study resources.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <Sparkles size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Get help when you need it
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Ask questions and explore topics with your AI tutor.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Track your progress
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Practice with quizzes and see how you improve.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-sm text-slate-600">
          Built to make your learning journey more effective.
        </p>
      </section>

      {/* Right  */}
      <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          {/* Mobile */}
          <Link
            href="/"
            className="mb-10 flex w-fit items-center gap-3 lg:hidden"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2F80ED] text-white">
              <GraduationCap size={25} />
            </div>
            <span className="text-xl font-bold text-slate-900">EDU AI</span>
          </Link>

          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#2F80ED]">
              Get started for free
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Create your account
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              Join EDU AI and make your study sessions more productive.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-slate-700"
              >
                Full name
              </label>
              <div className="relative">
                <UserRound
                  size={19}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 pl-11 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-[#2F80ED] focus-visible:ring-[#2F80ED]/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={19}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 pl-11 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-[#2F80ED] focus-visible:ring-[#2F80ED]/20"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 pl-11 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-[#2F80ED] focus-visible:ring-[#2F80ED]/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Choose a password that you do not use for other accounts.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-[#2F80ED] text-base font-semibold text-white shadow-sm transition hover:bg-[#2468C5] disabled:opacity-70"
            >
              {loading ? (
                "Creating account..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Create account
                  <ArrowRight size={18} />
                </span>
              )}
            </Button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">ALREADY A MEMBER?</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#2F80ED] transition hover:text-[#2468C5]"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-8 text-center text-xs leading-5 text-slate-400">
            By creating an account, you agree to use EDU AI responsibly for
            learning and academic practice.
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
