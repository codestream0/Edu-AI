"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

type QuestionType = "multiple_choice" | "true_false" | "short_answer";

interface QuizQuestion {
  questionId: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: string;
  acceptedAnswers: string[];
  explanation: string;
  points: number;
}

interface Quiz {
  _id?: string;
  id?: string;
  title: string;
  sourceDocument?: string;
  questionType: string;
  questionCount: number;
  difficulty: string;
  answerFeedback: "immediate" | "end";
  questions: QuizQuestion[];
}

type AnswerMap = Record<string, string>;

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [quizResult, setQuizResult] = useState<{
    score: number;
    totalPoints: number;
    percentage: number;
    correctCount: number;
    questionCount: number;
    review?: {
      questionId: string;
      question: string;
      submittedAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      explanation: string;
      pointsAwarded: number;
      points: number;
    }[];
  } | null>(null);

  useEffect(() => {
    let active = true;

    async function loadQuiz() {
      setLoading(true);
      setError("");

      try {
        // Change this endpoint if your backend uses another route.
        const response = await api.get(`/quiz/${encodeURIComponent(id)}`);
        const data = response.data?.quiz;

        if (!data || !Array.isArray(data.questions)) {
          throw new Error("The server returned an invalid quiz.");
        }

        if (active) {
          setQuiz(data);
        }
      } catch (err) {
        console.error("Failed to load quiz:", err);

        if (active) {
          setError(
            "Unable to load this quiz. It may not exist, or the server request failed.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadQuiz();

    return () => {
      active = false;
    };
  }, [id]);

  const questions = quiz?.questions ?? [];
  const currentQuestion = questions[currentIndex];

  function updateAnswer(questionId: string, answer: string) {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: answer,
    }));
  }

  function isCorrect(question: QuizQuestion): boolean {
    const userAnswer = answers[question.questionId]?.trim();
    const correctAnswer = question.correctAnswer?.trim();

    // Unanswered questions or questions missing an answer key
    // must not crash the page.
    if (!userAnswer || !correctAnswer) {
      return false;
    }

    if (question.type === "short_answer") {
      const acceptedAnswers = [
        correctAnswer,
        ...(question.acceptedAnswers ?? []),
      ];

      return acceptedAnswers.some(
        (answer) =>
          typeof answer === "string" &&
          answer.trim().toLowerCase() === userAnswer.toLowerCase(),
      );
    }

    return userAnswer.toLowerCase() === correctAnswer.toLowerCase();
  }

  const score = questions.reduce(
    (total, question) =>
      total + (isCorrect(question) ? question.points || 1 : 0),
    0,
  );

  const totalPoints = questions.reduce(
    (total, question) => total + (question.points || 1),
    0,
  );

  async function submitQuiz() {
    if (!quiz) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await api.post(
        `/quiz/${encodeURIComponent(id)}/submit`,
        {
          answers: quiz.questions.map((question) => ({
            questionId: question.questionId,
            answer: answers[question.questionId] ?? "",
          })),
        },
      );

      const result = response.data?.result;

      if (!result) {
        throw new Error("The server did not return quiz results.");
      }

      setQuizResult(result);
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit quiz:", err);

      setError(
        "Failed to submit your quiz. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center gap-2 text-sm text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading quiz...
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="mx-auto max-w-2xl space-y-5 py-10">
        <Link
          href="/dashboard"
          className="flex w-fit items-center gap-2 text-sm text-slate-500 hover:text-[#2F80ED]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
        >
          {error || "Quiz not found."}
        </div>

        <button
          onClick={() => router.refresh()}
          className="rounded-lg bg-[#2F80ED] px-4 py-2 text-sm font-medium text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl py-10">
        <p className="text-lg font-semibold">This quiz has no questions.</p>
        <Link
          href="/dashboard"
          className="mt-4 inline-block text-sm text-[#2F80ED]"
        >
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-10">
      <Link
        href={
          quiz.sourceDocument
            ? `/document/${encodeURIComponent(quiz.sourceDocument)}`
            : "/dashboard"
        }
        className="flex w-fit items-center gap-2 text-sm text-slate-500 transition hover:text-[#2F80ED]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to document
      </Link>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-[#2F80ED] dark:bg-blue-950/40">
            {quiz.difficulty} difficulty
          </span>

          <span className="text-sm text-slate-500">
            {questions.length} questions
          </span>
        </div>

        <h1 className="text-2xl font-bold sm:text-3xl">{quiz.title}</h1>

        <p className="text-sm text-slate-500">
          Answer each question, then submit your quiz to review your results.
        </p>
      </header>

      {!submitted && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Progress</span>
            <span>
              {Object.keys(answers).filter((key) => answers[key].trim()).length}
              {" of "}
              {questions.length} answered
            </span>
          </div>

          <div
            className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
            role="progressbar"
            aria-valuenow={currentIndex + 1}
            aria-valuemin={1}
            aria-valuemax={questions.length}
          >
            <div
              className="h-full rounded-full bg-[#2F80ED] transition-all"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {submitted && quizResult ? (
        <section className="space-y-6">
          {/* Quiz score */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
            <CheckCircle2 className="mx-auto h-10 w-10 text-[#2F80ED]" />

            <h2 className="mt-3 text-xl font-bold">Quiz completed!</h2>

            <p className="mt-2 text-3xl font-bold text-[#2F80ED]">
              {quizResult.score} / {quizResult.totalPoints}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {quizResult.percentage}% · {quizResult.correctCount} of{" "}
              {quizResult.questionCount} correct
            </p>
          </div>

          {/* Question-by-question review */}
          {quizResult.review?.map((item, index) => (
            <article
              key={item.questionId}
              className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold dark:bg-slate-800">
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{item.question}</p>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        item.isCorrect
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                          : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                      }`}
                    >
                      {item.isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>

                  <p
                    className={`mt-3 text-sm ${
                      item.isCorrect ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    Your answer: {item.submittedAnswer || "Not answered"}
                  </p>

                  <p className="mt-1 text-sm text-emerald-600">
                    Correct answer: {item.correctAnswer || "Not provided"}
                  </p>

                  {item.explanation && (
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        Explanation:{" "}
                      </span>
                      {item.explanation}
                    </p>
                  )}

                  <p className="mt-3 text-xs text-slate-500">
                    Points: {item.pointsAwarded} / {item.points}
                  </p>
                </div>
              </div>
            </article>
          ))}

          {/* Actions */}
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F80ED] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            <RotateCcw className="h-4 w-4" />
            Back to dashboard
          </button>
        </section>
      ) : (
        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-[#2F80ED] dark:bg-blue-950/40">
              {currentIndex + 1}
            </span>

            <h2 className="pt-1 text-lg font-semibold leading-7">
              {currentQuestion.question}
            </h2>
          </div>

          {currentQuestion.type === "multiple_choice" ||
          currentQuestion.type === "true_false" ? (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const selected = answers[currentQuestion.questionId] === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      updateAnswer(currentQuestion.questionId, option)
                    }
                    aria-pressed={selected}
                    className={`w-full rounded-xl border p-4 text-left text-sm transition ${
                      selected
                        ? "border-[#2F80ED] bg-blue-50 text-[#2F80ED] dark:bg-blue-950/30"
                        : "border-slate-200 hover:border-blue-300 dark:border-slate-700"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs">
                        {selected ? "✓" : ""}
                      </span>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <textarea
              value={answers[currentQuestion.questionId] ?? ""}
              onChange={(event) =>
                updateAnswer(currentQuestion.questionId, event.target.value)
              }
              rows={4}
              placeholder="Type your answer..."
              className="w-full rounded-xl border border-slate-300 bg-transparent p-4 text-sm outline-none focus:border-[#2F80ED] dark:border-slate-700"
            />
          )}

          {quiz.answerFeedback === "immediate" &&
            answers[currentQuestion.questionId]?.trim() && (
              <div className="rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-800">
                <p className="font-medium">Answer selected</p>
                <p className="mt-1 text-slate-500">
                  Your result will be available after submission.
                </p>
              </div>
            )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
              disabled={currentIndex === 0 || submitting}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700"
            >
              Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((index) =>
                    Math.min(questions.length - 1, index + 1),
                  )
                }
                disabled={submitting}
                className="rounded-lg bg-[#2F80ED] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-60"
              >
                Next question
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void submitQuiz()}
                disabled={submitting}
                className="flex items-center gap-2 rounded-lg bg-[#2F80ED] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-60"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Submitting..." : "Submit quiz"}
              </button>
            )}
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
        </section>
      )}
    </div>
  );
}
