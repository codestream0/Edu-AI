"use client";

import {
  ArrowLeft,
  Download,
  FileText,
  Sparkles,
  Brain,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DocumentDetailsPage() {
  const params = useParams();

  const id = params.id;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">
          <Link
            href="/document"
            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>
            <h1 className="font-bold text-slate-900 dark:text-white">
              Calculus II Notes
            </h1>

            <p className="text-sm text-slate-500">
              PDF · 24 pages
            </p>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm dark:border-slate-700">
          <Download className="h-4 w-4" />
          Download
        </button>

      </div>

      {/* AI actions */}
      <div className="grid gap-4 sm:grid-cols-2">

        <Link
          href={`/document/${id}/summary`}
          className="rounded-xl border border-slate-200 bg-white p-5 hover:border-[#2F80ED] dark:border-slate-800 dark:bg-slate-900"
        >
          <Sparkles className="h-6 w-6 text-[#2F80ED]" />

          <h2 className="mt-3 font-semibold">
            AI Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Get a concise summary of this document.
          </p>
        </Link>

        <Link
          href={`/document/${id}/quiz`}
          className="rounded-xl border border-slate-200 bg-white p-5 hover:border-[#2F80ED] dark:border-slate-800 dark:bg-slate-900"
        >
          <Brain className="h-6 w-6 text-purple-500" />

          <h2 className="mt-3 font-semibold">
            Generate Quiz
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Test your knowledge using this material.
          </p>
        </Link>

      </div>

      {/* Document viewer */}
      <div className="min-h-175 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

        <div className="flex items-center gap-3 border-b pb-5 dark:border-slate-800">
          <FileText className="h-5 w-5 text-[#2F80ED]" />

          <h2 className="font-semibold">
            Document Preview
          </h2>
        </div>

        <div className="flex min-h-150 items-center justify-center text-sm text-slate-400">
          Document viewer will appear here
        </div>

      </div>

    </div>
  );
}