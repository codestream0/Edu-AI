"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, CheckCircle2, ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!token) {
      setError("This password reset link is invalid or missing.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/reset-password", {
        token,
        password,
      });

      setSuccess(true);
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "Unable to reset your password. The link may have expired."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-[#F5F9FF] px-6 py-10">
        <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
          <div className="w-full rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Password reset successful
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Your password has been successfully updated. You can now sign in
              with your new password.
            </p>

            <button
              onClick={() => router.push("/login")}
              className="mt-7 w-full rounded-lg bg-[#2F80ED] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Continue to Login
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F9FF]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left branding section */}
        <section className="relative hidden overflow-hidden bg-linear-to-br from-blue-100 via-[#DCEBFF] to-[#BBD7FF] p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="pointer-events-none absolute -left-24 top-40 h-80 w-80 rounded-full bg-blue-300/50 blur-3xl" />

          <div className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-indigo-300/40 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2F80ED] text-lg font-bold text-white">
                E
              </div>

              <span className="text-xl font-bold text-gray-900">
                EDU AI
              </span>
            </div>
          </div>

          <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl font-bold leading-tight text-gray-900 xl:text-5xl">
              Get back to learning.
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-gray-600">
              Create a new password and continue your learning journey with
              EDU AI.
            </p>
          </div>

          <div className="relative z-10 text-sm text-gray-500">
            Your AI-powered learning companion.
          </div>
        </section>

        {/* Reset password section */}
        <section className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link
                href="/login"
                className="text-xl font-bold text-[#2F80ED]"
              >
                EDU AI
              </Link>
            </div>

            <Link
              href="/login"
              className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>

            <div className="mb-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <Lock className="h-6 w-6 text-[#2F80ED]" />
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Reset your password
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Create a new password for your EDU AI account.
              </p>
            </div>

            {!token ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                This password reset link is invalid or missing. Please request
                a new password reset link.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    New password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your new password"
                      disabled={loading}
                      required
                      className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-11 text-sm outline-none transition text-black placeholder:text-gray-400 focus:border-[#2F80ED] focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    Use at least 8 characters.
                  </p>
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Confirm your new password"
                      disabled={loading}
                      required
                      className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-11 text-sm outline-none text-black transition placeholder:text-gray-400 focus:border-[#2F80ED] focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center rounded-lg bg-[#2F80ED] px-4 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Resetting password..." : "Reset password"}
                </button>
              </form>
            )}

            {!token && (
              <Link
                href="/forgot-password"
                className="mt-6 block text-center text-sm font-medium text-[#2F80ED] hover:underline"
              >
                Request a new reset link
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}