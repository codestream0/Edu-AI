
"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Brain, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface Document {
  _id: string;
  title?: string;
  originalName?: string;
  status?: "uploaded" | "processing" | "completed" | "failed";
}

type QuestionType =
  | "multiple_choice"
  | "true_false"
  | "short_answer"
  | "mixed";

type Difficulty = "easy" | "medium" | "hard" | "mixed";

type AnswerFeedback = "immediate" | "end";

export default function DocumentQuizPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const [questionType, setQuestionType] =
    useState<QuestionType>("mixed");
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] =
    useState<Difficulty>("medium");
  const [answerFeedback, setAnswerFeedback] =
    useState<AnswerFeedback>("end");

  useEffect(() => {
    let active = true;

    async function loadDocument() {
      setLoading(true);
      setError("");
      setDocument(null);

      try {
        const response = await api.get("/document/get-documents");
        const document = response.data?.documents;

        if (!Array.isArray(document)) {
          throw new Error("Unexpected documents response");
        }

        const selected = document.find(
          (item: Document) => String(item._id) === String(id),
        );

        if (!active) return;

        if (selected) {
          setDocument(selected);
        } else {
          setError("This document could not be found.");
        }
      } catch (loadError) {
        console.error("Failed to load document quiz:", loadError);

        if (active) {
          setError("Failed to load this document. Please try again.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadDocument();

    return () => {
      active = false;
    };
  }, [id]);

  const title =
    document?.title || document?.originalName || "Untitled document";

  const handleGenerateQuiz = async () => {
    if (!document) return;

    if (document.status !== "completed") {
      setError(
        "This document must finish processing before you can generate a quiz.",
      );
      return;
    }

    try {
      setGenerating(true);
      setError("");

      const response = await api.post("/quiz", {
        documentId: document._id,
        questionType,
        questionCount,
        difficulty,
        answerFeedback,
      });

      const quizId = response.data?.quiz?.id;

      if (!quizId) {
        throw new Error("The server did not return a quiz ID.");
      }

      router.push(`/quiz/${encodeURIComponent(quizId)}`);
    } catch (generationError: unknown) {
      console.error("Failed to generate quiz:", generationError);

      let message = "Failed to generate the quiz. Please try again.";

      if (
        generationError &&
        typeof generationError === "object" &&
        "response" in generationError
      ) {
        const apiError = generationError as {
          response?: { data?: { message?: string } };
        };

        message = apiError.response?.data?.message || message;
      } else if (generationError instanceof Error) {
        message = generationError.message;
      }

      setError(message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href={`/document/${encodeURIComponent(id)}`}
        className="flex w-fit items-center gap-2 text-sm text-slate-500 transition hover:text-[#2F80ED]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to document
      </Link>

      <div>
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-[#2F80ED]" />
          <h1 className="text-2xl font-bold">Practice Quiz</h1>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          {loading
            ? "Loading document..."
            : document
              ? `Create a quiz from ${title}`
              : "Configure your practice quiz"}
        </p>
      </div>

      {loading && (
        <div className="rounded-xl border border-slate-200 p-6 text-sm text-slate-500 dark:border-slate-800">
          <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
          Loading document...
        </div>
      )}

      {!loading && error && !document && (
        <div
          role="alert"
          className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300"
        >
          {error}
        </div>
      )}

      {document && !loading && (
        <>
          <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
            <Brain className="mt-0.5 h-5 w-5 shrink-0 text-[#2F80ED]" />
            <div className="min-w-0">
              <p className="font-medium text-slate-800 dark:text-slate-100">
                {title}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Questions will be generated from this document's extracted text.
              </p>
            </div>
          </div>

          {document.status !== "completed" && (
            <div
              role="status"
              className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"
            >
              {document.status === "processing"
                ? "Your document is still being processed. Wait until processing is complete."
                : document.status === "failed"
                  ? "Document processing failed. Please process or upload the document again."
                  : "This document has not finished processing yet."}
            </div>
          )}

          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <h2 className="text-lg font-semibold">Quiz settings</h2>
              <p className="mt-1 text-sm text-slate-500">
                Customize the questions to suit your study needs.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="questionType"
                className="block text-sm font-medium"
              >
                Question format
              </label>
              <select
                id="questionType"
                value={questionType}
                onChange={(event) =>
                  setQuestionType(event.target.value as QuestionType)
                }
                className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-3 text-sm outline-none focus:border-[#2F80ED] dark:border-slate-700"
              >
                <option className="dark:bg-slate-500" value="mixed">Mixed question types</option>
                <option className="dark:bg-slate-500" value="multiple_choice">Multiple choice</option>
                <option className="dark:bg-slate-500" value="true_false">True or false</option>
                <option className="dark:bg-slate-500" value="short_answer">Short answer</option>
              </select>
              <p className="text-xs text-slate-500">
                Mixed quizzes combine multiple-choice, true/false, and short-answer questions.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="questionCount"
                className="block text-sm font-medium"
              >
                Number of questions
              </label>
              <select
                id="questionCount"
                value={questionCount}
                onChange={(event) =>
                  setQuestionCount(Number(event.target.value))
                }
                className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-3 text-sm outline-none focus:border-[#2F80ED] dark:border-slate-700"
              >
                {[5, 10, 15, 20, 25, 30].map((count) => (
                  <option className="dark:bg-slate-500" key={count} value={count}>
                    {count} questions
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium"
              >
                Difficulty
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(event) =>
                  setDifficulty(event.target.value as Difficulty)
                }
                className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-3 text-sm outline-none focus:border-[#2F80ED] dark:border-slate-700 dark:text-slate-100"
              >
                <option className="dark:bg-slate-500" value="easy">Easy</option>
                <option className="dark:bg-slate-500" value="medium">Medium</option>
                <option className="dark:bg-slate-500" value="hard">Hard</option>
                <option className="dark:bg-slate-500" value="mixed">Mixed difficulty</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="answerFeedback"
                className="block text-sm font-medium"
              >
                Answer feedback
              </label>
              <select
                id="answerFeedback"
                value={answerFeedback}
                onChange={(event) =>
                  setAnswerFeedback(event.target.value as AnswerFeedback)
                }
                className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-3 text-sm outline-none focus:border-[#2F80ED] dark:border-slate-700"
              >
                <option className="dark:bg-slate-500" value="end">
                  Show answers and explanations at the end
                </option>
                <option className="dark:bg-slate-500" value="immediate">
                  Show feedback after each answer
                </option>
              </select>
            </div>

            {error && document && (
              <div
                role="alert"
                className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300"
              >
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={() => void handleGenerateQuiz()}
              disabled={
                generating ||
                document.status !== "completed"
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F80ED] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating quiz...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate quiz
                </>
              )}
            </button>

            {generating && (
              <p className="text-center text-xs text-slate-500">
                EDU AI is generating your questions. Please keep this page open while it works.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
