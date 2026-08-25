"use client";

import { ArrowLeft, Brain, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const questions = [
  {
    question: "What is the fundamental theorem of calculus?",
    options: [
      "A theorem connecting differentiation and integration",
      "A theorem about matrices",
      "A theorem about probability",
      "A theorem about limits only",
    ],
    answer: 0,
  },
  {
    question: "What is the integral of x?",
    options: [
      "x",
      "x²",
      "x² / 2 + C",
      "2x",
    ],
    answer: 2,
  },
];

export default function DocumentQuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const question = questions[current];

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      <Link
        href="/document/calculus-ii"
        className="flex w-fit items-center gap-2 text-sm text-slate-500 hover:text-[#2F80ED]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to document
      </Link>

      <div>
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-[#2F80ED]" />

          <h1 className="text-2xl font-bold">
            Practice Quiz
          </h1>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Generated from Calculus II Notes
        </p>
      </div>

      {/* Progress */}
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span>
            Question {current + 1} of {questions.length}
          </span>

          <span className="text-slate-500">
            {Math.round(((current + 1) / questions.length) * 100)}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full bg-[#2F80ED]"
            style={{
              width: `${((current + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

        <h2 className="text-lg font-semibold">
          {question.question}
        </h2>

        <div className="mt-6 space-y-3">
          {question.options.map((option, index) => (
            <button
              key={option}
              onClick={() => setSelected(index)}
              className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${
                selected === index
                  ? "border-[#2F80ED] bg-blue-50 dark:bg-blue-950/30"
                  : "border-slate-200 hover:border-[#2F80ED] dark:border-slate-700"
              }`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border text-sm">
                {String.fromCharCode(65 + index)}
              </span>

              <span>{option}</span>
            </button>
          ))}
        </div>

        <button
          disabled={selected === null}
          onClick={() => {
            if (current < questions.length - 1) {
              setCurrent(current + 1);
              setSelected(null);
            }
          }}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F80ED] px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCircle className="h-5 w-5" />

          {current === questions.length - 1
            ? "Finish Quiz"
            : "Next Question"}
        </button>

      </div>

    </div>
  );
}