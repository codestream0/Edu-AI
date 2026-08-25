"use client";

import { FileText, Upload } from "lucide-react";
import Link from "next/link";

const documents = [
  {
    id: "calculus-ii",
    title: "Calculus II Notes",
    type: "PDF",
    pages: 24,
    lastStudied: "2 hours ago",
  },
  {
    id: "digital-logic",
    title: "Digital Logic Presentation",
    type: "PPTX",
    pages: 32,
    lastStudied: "yesterday",
  },
  {
    id: "organic-chemistry",
    title: "Organic Chemistry Summary",
    type: "DOCX",
    pages: 11,
    lastStudied: "3 days ago",
  },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          My Documents
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Upload, summarize, and generate quizzes from your study materials.
        </p>
      </div>

      <Link href="/document/upload">
        <div className="flex min-h-55 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white transition hover:border-[#2F80ED] hover:bg-blue-50/30 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">

          <Upload className="mb-4 h-8 w-8 text-[#2F80ED]" />

          <h2 className="font-semibold text-slate-900 dark:text-white">
            Drop your study material here
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            or Browse files
          </p>

          <p className="mt-2 text-xs text-slate-400">
            PDF, PPTX and DOCX up to 20MB
          </p>
        </div>
      </Link>

      {/* Recent */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Recent Study Materials
          </h2>

          <button className="text-sm font-medium text-[#2F80ED]">
            View all
          </button>
        </div>

        <div className="space-y-4">
          {documents.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
            />
          ))}
        </div>
      </section>

    </div>
  );
}

function DocumentCard({
  document,
}: {
  document: {
    id: string;
    title: string;
    type: string;
    pages: number;
    lastStudied: string;
  };
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

      <div className="flex items-start gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2F80ED] dark:bg-blue-950/40">
          <FileText className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {document.title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {document.type} · {document.pages} pages
          </p>

          <p className="text-xs text-slate-400">
            Last studied {document.lastStudied}
          </p>
        </div>

        <Link
          href={`/document/${document.id}`}
          className="text-sm font-medium text-[#2F80ED]"
        >
          Open
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-2 border-t border-slate-200 pt-4 dark:border-slate-800">
        <Link
          href={`/document/${document.id}/summary`}
          className="text-center text-sm font-medium text-slate-600 hover:text-[#2F80ED] dark:text-slate-300"
        >
          Summary
        </Link>

        <Link
          href={`/document/${document.id}/quiz`}
          className="text-center text-sm font-medium text-slate-600 hover:text-[#2F80ED] dark:text-slate-300"
        >
          Quiz
        </Link>
      </div>

    </div>
  );
}