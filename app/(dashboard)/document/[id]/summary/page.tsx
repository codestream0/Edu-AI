"use client";

import { ArrowLeft, Copy, Download, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DocumentSummaryPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">

      <Link
        href="/document/calculus-ii"
        className="flex w-fit items-center gap-2 text-sm text-slate-500 hover:text-[#2F80ED]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to document
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#2F80ED]" />

            <h1 className="text-2xl font-bold">
              AI Summary
            </h1>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Calculus II Notes
          </p>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm">
            <Copy className="h-4 w-4" />
            Copy
          </button>

          <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>

      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

        <h2 className="text-lg font-semibold">
          Summary
        </h2>

        <div className="prose prose-slate mt-6 max-w-none dark:prose-invert">

          <h3>Overview</h3>

          <p>
            This document introduces the fundamental concepts of
            integration, techniques of integration, and applications
            of definite integrals.
          </p>

          <h3>Key Concepts</h3>

          <ul>
            <li>Definite and indefinite integration</li>
            <li>Integration by substitution</li>
            <li>Integration by parts</li>
            <li>Applications of integration</li>
          </ul>

        </div>

      </div>

    </div>
  );
}