"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { api } from "@/lib/api";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setCredentials } from "@/lib/redux/features/auth/authSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { user, accessToken } = response.data;

      dispatch(setCredentials({ User: user, accessToken }));

      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Unable to log in. Please check your credentials and try again.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F9FF] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left: EDU AI branding */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-blue-100 via-[#DCEBFF] to-[#BBD7FF] p-10 lg:flex xl:p-14">
          {/* Decorative background elements */}
          <div className="pointer-events-none absolute -left-24 top-40 h-80 w-80 rounded-full bg-blue-300/50 blur-3xl" />

          <div className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-indigo-300/40 blur-3xl" />

          {/* <div className="pointer-events-none absolute right-16 top-24 h-32 w-32 rounded-full border-2 border-blue-400/30" /> */}

          <Link
            href="/"
            className="relative z-10 flex w-fit items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2F80ED] text-white shadow-lg shadow-blue-200">
              <GraduationCap className="h-6 w-6" />
            </div>

            <div>
              <span className="text-xl font-bold tracking-tight">
                EDU <span className="text-[#2F80ED]">AI</span>
              </span>
              <p className="text-xs text-slate-500">
                Your personal AI learning companion
              </p>
            </div>
          </Link>

          <div className="relative z-10 mx-auto w-full max-w-xl py-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-2 text-xs font-medium text-[#2F80ED] shadow-sm">
              <Sparkles className="h-4 w-4" />
              Learn smarter with AI
            </div>

            <h1 className="max-w-lg text-4xl font-bold leading-tight tracking-tight text-slate-900 xl:text-5xl">
              Your next big idea starts with{" "}
              <span className="text-[#2F80ED]">learning.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              Turn your study materials into meaningful learning experiences.
              Ask questions, understand documents, and test your knowledge in
              one place.
            </p>

            {/* Product preview built with UI components */}
            <div className="relative mx-auto mt-10 max-w-md rounded-2xl border border-blue-100/80 bg-white p-5 shadow-xl shadow-blue-900/5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2F80ED]">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Your learning space</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Everything you need to study
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  Ready to learn
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-[#F5F9FF] p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-[#2F80ED]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">Study documents</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Learn from your course materials
                    </p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-[#F5F9FF] p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">Ask EDU AI</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Get help understanding difficult topics
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-[#F5F9FF] p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">Practice quizzes</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Reinforce what you have learned
                    </p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                <Sparkles className="h-4 w-4 text-[#2F80ED]" />
                One platform. A smarter way to study.
              </div>
            </div>
          </div>

          <p className="relative z-10 text-xs text-slate-400">
            © {new Date().getFullYear()} EDU AI. Built for curious minds.
          </p>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-10">
          <div className="w-full max-w-md">
            {/* Mobile  */}
            <Link
              href="/"
              className="mb-10 flex items-center justify-center gap-3 lg:hidden"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2F80ED] text-white shadow-md shadow-blue-200">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                EDU <span className="text-[#2F80ED]">AI</span>
              </span>
            </Link>

            <div className="rounded-2xl border border-slate-200/80 bg-blue-50 p-6 shadow-xl shadow-blue-900/4 sm:p-9">
              <div className="mb-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2F80ED]">
                  <LockKeyhole className="h-6 w-6" />
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Sign in to continue your learning journey with EDU AI.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 rounded-xl border-slate-200 bg-white pl-11 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-[#2F80ED] focus-visible:ring-[#2F80ED]/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-slate-700"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-[#2F80ED] transition hover:text-blue-700"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 rounded-xl border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-[#2F80ED] focus-visible:ring-[#2F80ED]/20"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4.5 w-4.5" />
                      ) : (
                        <Eye className="h-4.5 w-4.5" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                <Button
                  disabled={loading}
                  type="submit"
                  className="h-12 w-full rounded-xl bg-[#2F80ED] text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    "Signing you in..."
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Sign in
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="relative my-7">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs text-slate-400">
                    New to EDU AI?
                  </span>
                </div>
              </div>

              <p className="text-center text-sm text-slate-600">
                Create an account to get started.{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-[#2F80ED] transition hover:text-blue-700"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
              Your learning journey, all in one place.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
