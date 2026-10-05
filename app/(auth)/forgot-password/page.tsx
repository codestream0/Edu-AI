"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const reponse = await api.post("/auth/forgot-password", {
        email,
      });
      console.log("Forgot password response:", reponse.data);
      setSubmitted(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Unable to process your request. Please try again.",
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
      {/* Left branding panel */}
      <section className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-blue-100 via-[#DCEBFF] to-[#BBD7FF] p-10 lg:flex xl:p-14">
        {/* Decorative background */}
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
            Keep learning.
            <br />
            <span className="text-[#2F80ED]">We&apos;ve got you.</span>
          </h2>

          <p className="mt-5 max-w-md text-base leading-7 text-slate-600 xl:text-lg">
            Don&apos;t worry if you forgot your password. We&apos;ll help you
            get back into your EDU AI account and continue your learning
            journey.
          </p>

          {/* Feature cards */}
          <div className="mt-9 space-y-4">
            <div className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#2F80ED]">
                <LockKeyhole size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Secure password recovery
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Receive a secure link to create a new password.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <Mail size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Check your email
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  We&apos;ll send the reset instructions directly to you.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                <CheckCircle2 size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Get back to learning
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Reset your password and continue where you left off.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-sm text-slate-600">
          Your learning journey shouldn&apos;t have to stop here.
        </p>
      </section>

      {/* Right form */}
      <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <Link
            href="/"
            className="mb-10 flex w-fit items-center gap-3 lg:hidden"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2F80ED] text-white">
              <GraduationCap size={25} />
            </div>

            <span className="text-xl font-bold text-slate-900">EDU AI</span>
          </Link>

          {!submitted ? (
            <>
              <div className="mb-8">
                <Link
                  href="/login"
                  className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#2F80ED]"
                >
                  <ArrowLeft size={16} />
                  Back to login
                </Link>

                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#2F80ED]">
                  Password recovery
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Forgot your password?
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                  Enter the email address associated with your account and
                  we&apos;ll send you a link to reset your password.
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
                    "Sending reset link..."
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send reset link
                      <ArrowRight size={18} />
                    </span>
                  )}
                </Button>
              </form>

              <p className="mt-8 text-center text-sm text-slate-600">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#2F80ED] transition hover:text-[#2468C5]"
                >
                  Sign in
                </Link>
              </p>
            </>
          ) : (
            /* Success state */
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <CheckCircle2 size={34} />
              </div>

              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#2F80ED]">
                Check your inbox
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Reset link sent
              </h2>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-500 sm:text-base">
                If an account exists for{" "}
                <span className="font-medium text-slate-700">{email}</span>,
                we&apos;ve sent instructions to reset your password.
              </p>

              <div className="mt-7 rounded-xl border border-blue-100 bg-blue-50 p-4 text-left">
                <p className="text-sm font-medium text-slate-800">
                  Didn&apos;t receive the email?
                </p>

                <ul className="mt-2 space-y-1 text-sm text-slate-500">
                  <li>• Check your spam or junk folder.</li>
                  <li>• Make sure the email address is correct.</li>
                  <li>• Wait a few minutes and try again.</li>
                </ul>
              </div>

              <div className="mt-7 flex flex-col gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setError("");
                  }}
                  variant="outline"
                  className="h-12 w-full rounded-xl border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Try another email
                </Button>

                <Link
                  href="/login"
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2F80ED] text-sm font-semibold text-white transition hover:bg-[#2468C5]"
                >
                  Back to login
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ForgotPasswordPage;