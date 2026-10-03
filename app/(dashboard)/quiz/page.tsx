
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Clock,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

interface Quiz {
  _id: string;
  id?: string;
  title: string;
  questionCount: number;
  questionType: string;
  difficulty: string;
  createdAt?: string;
  sourceDocument?: string | { _id: string; title?: string };
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadQuizzes = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      // This endpoint must exist in your Express backend.
      const response = await api.get("/quiz");

      const data = response.data?.quizzes;

      if (!Array.isArray(data)) {
        throw new Error("Unexpected quizzes response.");
      }

      setQuizzes(data);
    } catch (err) {
      console.error("Failed to load quizzes:", err);
      setError("Unable to load your quizzes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadQuizzes();
  }, [loadQuizzes]);

  function getQuizId(quiz: Quiz) {
    return quiz._id || quiz.id;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Brain className="h-7 w-7 text-[#2F80ED]" />
            <h1 className="text-2xl font-bold sm:text-3xl">
              My Quizzes
            </h1>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Review your generated quizzes and continue practicing.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadQuizzes()}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          <RefreshCw
            className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950/40">
              <BookOpen className="h-5 w-5 text-[#2F80ED]" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total quizzes</p>
              <p className="text-2xl font-bold">
                {loading ? "—" : quizzes.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-950/30">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Questions generated</p>
              <p className="text-2xl font-bold">
                {loading
                  ? "—"
                  : quizzes.reduce(
                      (total, quiz) =>
                        total + (quiz.questionCount || 0),
                      0,
                    )}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-2 dark:bg-emerald-950/30">
              <Clock className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Latest activity</p>
              <p className="text-sm font-semibold">
                {loading
                  ? "Loading..."
                  : quizzes.length > 0 && quizzes[0].createdAt
                    ? new Date(quizzes[0].createdAt).toLocaleDateString()
                    : "No activity yet"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 p-12 text-sm text-slate-500 dark:border-slate-800">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading your quizzes...
        </div>
      ) : error ? (
        <div
          role="alert"
          className="space-y-4 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={() => void loadQuizzes()}
            className="rounded-lg bg-[#2F80ED] px-4 py-2 font-medium text-white"
          >
            Try again
          </button>
        </div>
      ) : quizzes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center dark:border-slate-700">
          <Brain className="mx-auto h-12 w-12 text-slate-400" />

          <h2 className="mt-4 text-lg font-semibold">
            No quizzes yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Upload a document and generate a quiz to test your understanding
            of its contents.
          </p>

          <Link
            href="/document"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2F80ED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            Browse documents
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <section>
          <h2 className="mb-4 text-lg font-semibold">
            Your generated quizzes
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {quizzes.map((quiz) => {
              const quizId = getQuizId(quiz);
              const sourceTitle =
                typeof quiz.sourceDocument === "object"
                  ? quiz.sourceDocument?.title
                  : undefined;

              return (
                <article
                  key={quizId}
                  className="flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
                >
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-blue-50 p-3 dark:bg-blue-950/40">
                        <Brain className="h-5 w-5 text-[#2F80ED]" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold leading-6">
                          {quiz.title || "Untitled quiz"}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {sourceTitle || "Document-based quiz"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs capitalize text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {quiz.questionCount} questions
                      </span>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs capitalize text-[#2F80ED] dark:bg-blue-950/40">
                        {(quiz.questionType || "").replaceAll("_", " ")}
                      </span>

                      <span className="rounded-full bg-purple-50 px-3 py-1 text-xs capitalize text-purple-700 dark:bg-purple-950/30 dark:text-purple-300">
                        {quiz.difficulty} difficulty
                      </span>
                    </div>

                    {quiz.createdAt && (
                      <p className="mt-4 text-xs text-slate-500">
                        Created{" "}
                        {new Date(quiz.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {quizId ? (
                    <Link
                      href={`/quiz/${encodeURIComponent(quizId)}`}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#2F80ED] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                      Open quiz
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <p className="text-sm text-red-500">
                      This quiz has no valid ID.
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
