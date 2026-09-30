"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Brain } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";

interface Document {
  _id: string;
  title?: string;
  originalName?: string;
}

export default function DocumentQuizPage() {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function loadDocument() {
      setLoading(true);
      setError("");
      setDocument(null);
      try {
        const response = await api.get("/document/get-documents");
        const documents = response.data?.documents;
        if (!Array.isArray(documents)) throw new Error("Unexpected documents response");
        const selected = documents.find((item: Document) => String(item._id) === String(id));
        if (active) {
          if (selected) setDocument(selected);
          else setError("This document could not be found.");
        }
      } catch (loadError) {
        console.error("Failed to load document quiz:", loadError);
        if (active) setError("Failed to load this document. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void loadDocument();
    return () => { active = false; };
  }, [id]);

  const title = document?.title || document?.originalName || "Untitled document";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href={`/document/${encodeURIComponent(id)}`} className="flex w-fit items-center gap-2 text-sm text-slate-500 hover:text-[#2F80ED]">
        <ArrowLeft className="h-4 w-4" /> Back to document
      </Link>

      <div>
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-[#2F80ED]" />
          <h1 className="text-2xl font-bold">Practice Quiz</h1>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          {loading ? "Loading document..." : document ? `For ${title}` : "Document"}
        </p>
      </div>

      {loading && <p className="rounded-xl border border-slate-200 p-6 text-sm text-slate-500 dark:border-slate-800">Loading document...</p>}
      {!loading && error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
      {document && !loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">
          Quiz questions for <span className="font-medium text-slate-700 dark:text-slate-200">{title}</span> are not available yet.
        </div>
      )}
    </div>
  );
}
