"use client";

import { ArrowLeft, Upload, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function UploadDocumentPage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      <Link
        href="/document"
        className="flex w-fit items-center gap-2 text-sm text-slate-500 hover:text-[#2F80ED]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to documents
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Upload Document
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Upload your study material and let EDU AI help you learn.
        </p>
      </div>

      <label
        htmlFor="document"
        className="flex min-h-75 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white transition hover:border-[#2F80ED] dark:border-slate-700 dark:bg-slate-900"
      >
        {file ? (
          <>
            <FileText className="h-10 w-10 text-[#2F80ED]" />

            <p className="mt-4 font-medium text-slate-900 dark:text-white">
              {file.name}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </>
        ) : (
          <>
            <Upload className="h-10 w-10 text-[#2F80ED]" />

            <p className="mt-4 font-semibold text-slate-900 dark:text-white">
              Drop your document here
            </p>

            <p className="mt-1 text-sm text-slate-500">
              or click to browse
            </p>

            <p className="mt-3 text-xs text-slate-400">
              PDF, DOCX or PPTX · Maximum 20MB
            </p>
          </>
        )}

        <input
          id="document"
          type="file"
          accept=".pdf,.docx,.pptx"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
          }}
        />
      </label>

      {file && (
        <button className="w-full rounded-xl bg-[#2F80ED] px-5 py-3 font-medium text-white hover:bg-blue-600">
          Upload & Analyze
        </button>
      )}

    </div>
  );
}