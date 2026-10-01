"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowLeft, Loader2, Sparkles } from "lucide-react";

import Link from "next/link";

import { useParams } from "next/navigation";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import { api } from "@/lib/api";

interface Document {
  _id: string;
  title?: string;
  originalName?: string;
  summary?: string;
  extractedText?: string;

  status?: "uploaded" | "processing" | "completed" | "failed";
}

export default function DocumentSummaryPage() {
  const { id } = useParams<{ id: string }>();

  const [document, setDocument] = useState<Document | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [summary, setSummary] = useState("");

  const [generating, setGenerating] = useState(false);

  const [processing, setProcessing] = useState(false);

  const summaryRequestInFlight = useRef(false);

  const processingPollRef = useRef<NodeJS.Timeout | null>(null);

  /*
  |--------------------------------------------------------------------------
  | Load document
  |--------------------------------------------------------------------------
  */

  const loadDocument = async () => {
    try {
      const response = await api.get("/document/get-documents");

      const documents = response.data?.documents;

      if (!Array.isArray(documents)) {
        throw new Error("Unexpected documents response");
      }

      const selected = documents.find(
        (item: Document) => String(item._id) === String(id),
      );

      if (!selected) {
        throw new Error("This document could not be found.");
      }

      setDocument(selected);

      if (selected.summary?.trim()) {
        setSummary(selected.summary.trim());
      }

      return selected;
    } catch (error) {
      console.error("Failed to load document:", error);

      throw error;
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Generate summary
  |--------------------------------------------------------------------------
  */

  const generateDocumentSummary = async () => {
    if (summaryRequestInFlight.current) {
      return;
    }

    if (!id) {
      setError("Document ID is missing.");

      return;
    }

    summaryRequestInFlight.current = true;

    setGenerating(true);
    setError("");

    try {
      const response = await api.post(
        `/document/${encodeURIComponent(id)}/summary`,
      );

      const generatedSummary = response.data?.summary;

      if (typeof generatedSummary !== "string" || !generatedSummary.trim()) {
        throw new Error("The backend did not return a summary.");
      }

      const cleanSummary = generatedSummary.trim();

      setSummary(cleanSummary);

      setDocument((current) =>
        current
          ? {
              ...current,
              summary: cleanSummary,
            }
          : current,
      );
    } catch (generationError: any) {
      console.error(
        "Failed to generate document summary:",
        generationError.response?.data || generationError,
      );

      setError(
        generationError.response?.data?.message ||
          "Failed to generate a summary. Please try again.",
      );
    } finally {
      summaryRequestInFlight.current = false;

      setGenerating(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Wait for document processing
  |--------------------------------------------------------------------------
  */

  const waitForDocumentProcessing = async () => {
    if (!id) {
      return;
    }

    setProcessing(true);
    setGenerating(true);
    setError("");

    const poll = async () => {
      try {
        const selected = await loadDocument();

        /*
         * OCR is still running.
         */
        if (selected.status === "processing") {
          processingPollRef.current = setTimeout(poll, 2000);

          return;
        }

        /*
         * Document processing failed.
         */
        if (selected.status === "failed") {
          setProcessing(false);
          setGenerating(false);

          setError(
            "Document processing failed. Please try uploading the document again.",
          );

          return;
        }

        /*
         * Document processing completed.
         */
        if (selected.status === "completed") {
          setProcessing(false);

          /*
           * If a summary already exists,
           * use it instead of generating again.
           */
          if (selected.summary?.trim()) {
            setSummary(selected.summary.trim());

            setGenerating(false);

            return;
          }

          /*
           * OCR is finished.
           * Now generate the AI summary.
           */
          await generateDocumentSummary();

          return;
        }

        /*
         * Uploaded but not yet processing.
         * Check again shortly.
         */
        processingPollRef.current = setTimeout(poll, 2000);
      } catch (error) {
        console.error("Document processing polling error:", error);

        setProcessing(false);
        setGenerating(false);

        setError(
          "Failed to check document processing status. Please try again.",
        );
      }
    };

    await poll();
  };

  /*
  |--------------------------------------------------------------------------
  | Initial document load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let active = true;

    const initialize = async () => {
      setLoading(true);
      setError("");
      setDocument(null);
      setSummary("");

      try {
        const selected = await loadDocument();

        if (!active) {
          return;
        }

        /*
         * Document is still being OCR processed.
         */
        if (selected.status === "processing") {
          await waitForDocumentProcessing();

          return;
        }

        /*
         * Document processing failed.
         */
        if (selected.status === "failed") {
          setError(
            "Document processing failed. Please upload the document again.",
          );

          return;
        }

        /*
         * Document is already completed
         * and has no summary.
         */
        if (selected.status === "completed" && !selected.summary?.trim()) {
          return;
        }
      } catch (error) {
        console.error("Failed to initialize summary page:", error);

        if (active) {
          setError("Failed to load this document. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void initialize();

    return () => {
      active = false;

      if (processingPollRef.current) {
        clearTimeout(processingPollRef.current);
      }
    };
  }, [id]);

  /*
  |--------------------------------------------------------------------------
  | Cleanup polling
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    return () => {
      if (processingPollRef.current) {
        clearTimeout(processingPollRef.current);
      }
    };
  }, []);

  const title =
    document?.title || document?.originalName || "Untitled document";

  const isProcessing = processing || document?.status === "processing";

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link
        href={`/document/${encodeURIComponent(id)}`}
        className="flex w-fit items-center gap-2 text-sm text-slate-500 transition-colors hover:text-[#2F80ED]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to document
      </Link>

      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#2F80ED]" />

          <h1 className="text-2xl font-bold">AI Summary</h1>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          {loading ? "Loading document..." : document ? title : "Document"}
        </p>
      </div>

      {loading && (
        <div className="rounded-xl border border-slate-200 p-6 text-sm text-slate-500 dark:border-slate-800">
          Loading document...
        </div>
      )}

      {!loading && error && (
        <div
          role="alert"
          className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300"
        >
          {error}
        </div>
      )}

      {document && !loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          {/* Summary header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Summary</h2>

              <p className="mt-1 text-sm text-slate-500">
                A concise overview of {title}.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void generateDocumentSummary()}
              disabled={generating || isProcessing}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2F80ED] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {generating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}

              {isProcessing
                ? "Processing document..."
                : generating
                  ? "Generating summary..."
                  : summary
                    ? "Regenerate summary"
                    : "Generate summary"}
            </button>
          </div>

          {isProcessing && (
            <div
              role="status"
              className="mt-5 rounded-xl bg-[#EAF3FF] p-4 text-sm text-[#2F80ED] dark:bg-blue-950/30"
            >
              <div className="flex items-start gap-3">
                <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin" />

                <div>
                  <p className="font-medium">
                    EDU AI is processing your document...
                  </p>

                  <p className="mt-1 text-blue-600/80 dark:text-blue-300/80">
                    We're extracting text from your document. This may take a
                    moment for large documents.
                  </p>
                </div>
              </div>
            </div>
          )}

          {generating && !isProcessing && (
            <div
              role="status"
              className="mt-5 rounded-xl bg-[#EAF3FF] p-4 text-sm text-[#2F80ED] dark:bg-blue-950/30"
            >
              <div className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin" />

                <div>
                  <p className="font-medium">
                    EDU AI is analyzing your document...
                  </p>

                  <p className="mt-1 text-blue-600/80 dark:text-blue-300/80">
                    This may take a moment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {summary && !generating && !isProcessing && (
            <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-800">
              <div className="prose prose-slate max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {summary}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {!summary && !generating && !isProcessing && (
            <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
              <Sparkles className="mx-auto h-8 w-8 text-[#2F80ED]" />

              <h3 className="mt-3 font-semibold">No summary yet</h3>

              <p className="mt-1 text-sm text-slate-500">
                Let EDU AI analyze this document and create a study-friendly
                summary.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
