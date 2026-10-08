
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Download,
  Loader2,
  Sparkles,
} from "lucide-react";
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
  status?: "uploaded" | "processing" | "completed" | "failed";
  pageCount?: number | null;
  processingPage?: number;
  processingProgress?: number;
}

export default function DocumentSummaryPage() {
  const { id } = useParams<{ id: string }>();

  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const [generating, setGenerating] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [exporting, setExporting] = useState(false);

  const summaryRequestInFlight = useRef(false);

  const processingPollRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const summaryExportRef = useRef<HTMLDivElement | null>(null);

  /**
   * Load one document.
   */
  const loadDocument = useCallback(async (): Promise<Document> => {
    const response = await api.get(
      `/document/${encodeURIComponent(id)}`,
    );

    const selected: Document | undefined = response.data?.document;

    if (!selected) {
      throw new Error("This document could not be found.");
    }

    setDocument(selected);
    setSummary(selected.summary?.trim() ?? "");

    return selected;
  }, [id]);

  /**
   * Generate a summary or force regeneration.
   */
  const generateDocumentSummary = useCallback(
    async (regenerate = false) => {
      if (summaryRequestInFlight.current) return;

      summaryRequestInFlight.current = true;

      try {
        setGenerating(true);
        setError("");

        const endpoint = `/document/${encodeURIComponent(id)}/summary`;

        const response = await api.post(
          regenerate ? `${endpoint}?regenerate=true` : endpoint,
        );

        const newSummary: string | undefined = response.data?.summary;

        if (!newSummary?.trim()) {
          throw new Error("The server did not return a summary.");
        }

        setSummary(newSummary);

        setDocument((previous) =>
          previous
            ? {
                ...previous,
                summary: newSummary,
              }
            : previous,
        );
      } catch (err: unknown) {
        console.error("Summary generation failed:", err);

        let message = "Failed to generate summary. Please try again.";

        if (err && typeof err === "object" && "response" in err) {
          const apiError = err as {
            response?: {
              data?: {
                message?: string;
              };
            };
            message?: string;
          };

          message =
            apiError.response?.data?.message ||
            apiError.message ||
            message;
        } else if (err instanceof Error) {
          message = err.message;
        }

        setError(message);
      } finally {
        summaryRequestInFlight.current = false;
        setGenerating(false);
      }
    },
    [id],
  );

  /**
   * Poll while the document is being uploaded or processed.
   */
  const waitForDocumentProcessing = useCallback(async () => {
    setProcessing(true);
    setError("");

    const poll = async (): Promise<void> => {
      try {
        const selected = await loadDocument();

        if (selected.status === "failed") {
          setProcessing(false);
          setError(
            "Document processing failed. Please try uploading the document again.",
          );
          return;
        }

        if (
          selected.status === "uploaded" ||
          selected.status === "processing"
        ) {
          processingPollRef.current = setTimeout(() => {
            void poll();
          }, 2000);

          return;
        }

        if (selected.status === "completed") {
          setProcessing(false);

          // Reuse the cached summary if one already exists.
          if (selected.summary?.trim()) {
            return;
          }

          // OCR has completed, so summary generation can begin.
          await generateDocumentSummary();

          return;
        }

        setProcessing(false);
        setError("The document has an unknown processing status.");
      } catch (err) {
        console.error("Document processing polling error:", err);

        setProcessing(false);
        setError(
          "Failed to check document processing status. Please try again.",
        );
      }
    };

    await poll();
  }, [loadDocument, generateDocumentSummary]);

  /**
   * Initialize the page.
   */
  useEffect(() => {
    let active = true;

    const initialize = async () => {
      setLoading(true);
      setError("");
      setDocument(null);
      setSummary("");
      setProcessing(false);

      try {
        const selected = await loadDocument();

        if (!active) return;

        if (selected.status === "failed") {
          setError(
            "Document processing failed. Please upload the document again.",
          );
          return;
        }

        if (
          selected.status === "uploaded" ||
          selected.status === "processing"
        ) {
          setProcessing(true);
          await waitForDocumentProcessing();
          return;
        }

        if (selected.status === "completed") {
          if (!selected.summary?.trim()) {
            await generateDocumentSummary();
          }
        }
      } catch (err) {
        console.error("Failed to initialize summary page:", err);

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load this document. Please try again.",
          );
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
  }, [
    id,
    loadDocument,
    waitForDocumentProcessing,
    generateDocumentSummary,
  ]);

  /**
   * Export the generated summary as a PDF.
   */
  const exportSummaryAsPDF = useCallback(async () => {
    if (!summaryExportRef.current || !summary.trim()) {
      return;
    }

    try {
      setExporting(true);
      setError("");

      // Dynamically import browser-only PDF libraries.
      const [{ default: html2canvas }, { default: jsPDF }] =
        await Promise.all([
          import("html2canvas"),
          import("jspdf"),
        ]);

      const element = summaryExportRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: element.scrollWidth,
      });

      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;

      const contentWidth = pageWidth - margin * 2;
      const contentHeight =
        (canvas.height * contentWidth) / canvas.width;

      let heightLeft = contentHeight;
      let position = margin;

      // First page.
      pdf.addImage(
        imageData,
        "PNG",
        margin,
        position,
        contentWidth,
        contentHeight,
      );

      heightLeft -= pageHeight - margin * 2;

      // Additional pages.
      while (heightLeft > 0) {
        position = -(contentHeight - heightLeft) + margin;

        pdf.addPage();

        pdf.addImage(
          imageData,
          "PNG",
          margin,
          position,
          contentWidth,
          contentHeight,
        );

        heightLeft -= pageHeight - margin * 2;
      }

      const rawFileName =
        document?.title ||
        document?.originalName ||
        "edu-ai-summary";

      const safeFileName = rawFileName
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase();

      pdf.save(`${safeFileName || "edu-ai-summary"}-summary.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);

      setError(
        "Failed to export the summary as PDF. Please try again.",
      );
    } finally {
      setExporting(false);
    }
  }, [document, summary]);

  const title =
    document?.title ||
    document?.originalName ||
    "Untitled document";

  const isProcessing =
    processing ||
    document?.status === "processing" ||
    document?.status === "uploaded";

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Back button */}
      <Link
        href={`/document/${encodeURIComponent(id)}`}
        className="flex w-fit items-center gap-2 text-sm text-slate-500 transition-colors hover:text-[#2F80ED]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to document
      </Link>

      {/* Page heading */}
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#2F80ED]" />

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            AI Summary
          </h1>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          {loading ? "Loading document..." : document ? title : "Document"}
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-xl border border-slate-200 p-6 text-sm text-slate-500 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading document...
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div
          role="alert"
          className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300"
        >
          {error}
        </div>
      )}

      {/* Document */}
      {document && !loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Summary
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                A concise overview of {title}.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {/* Export PDF */}
              <button
                type="button"
                onClick={() => void exportSummaryAsPDF()}
                disabled={
                  exporting ||
                  generating ||
                  isProcessing ||
                  document.status !== "completed" ||
                  !summary.trim()
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-[#2F80ED] hover:text-[#2F80ED] disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
              >
                {exporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}

                {exporting ? "Exporting PDF..." : "Export PDF"}
              </button>

              {/* Generate / regenerate */}
              <button
                type="button"
                onClick={() =>
                  void generateDocumentSummary(Boolean(summary))
                }
                disabled={
                  generating ||
                  isProcessing ||
                  document.status !== "completed"
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2F80ED] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {generating || isProcessing ? (
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
          </div>

          {/* Processing status */}
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
                    We&apos;re extracting text from your document. This may
                    take a while for large documents.
                  </p>

                  {document.pageCount &&
                    document.processingPage !== undefined && (
                      <p className="mt-2 text-xs">
                        Page {document.processingPage} of{" "}
                        {document.pageCount}
                        {document.processingProgress !== undefined &&
                          ` · ${document.processingProgress}% complete`}
                      </p>
                    )}
                </div>
              </div>
            </div>
          )}

          {/* Generating status */}
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

          {/* Summary */}
          {summary && !generating && !isProcessing && (
            <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-800">
              {/*
                This wrapper is specifically used for PDF generation.
                It uses a white background so the exported PDF remains
                readable even when the application is in dark mode.
              */}
              <div
                ref={summaryExportRef}
                className="bg-white px-1 py-2 text-slate-900"
              >
                {/* PDF title */}
                <div className="mb-6 border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#2F80ED]" />

                    <h2 className="text-xl font-bold text-slate-900">
                      AI Summary
                    </h2>
                  </div>

                  <h3 className="mt-2 text-lg font-semibold text-slate-800">
                    {title}
                  </h3>

                  {document.originalName && (
                    <p className="mt-1 text-xs text-slate-500">
                      Original file: {document.originalName}
                    </p>
                  )}

                  {document.pageCount && (
                    <p className="mt-1 text-xs text-slate-500">
                      Pages: {document.pageCount}
                    </p>
                  )}
                </div>

                {/* Markdown summary */}
                <div className="prose prose-slate max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {summary}
                  </ReactMarkdown>
                </div>

                {/* PDF footer */}
                <div className="mt-8 border-t border-slate-200 pt-4">
                  <p className="text-center text-xs text-slate-400">
                    Generated by EDU AI
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Empty summary */}
          {!summary && !generating && !isProcessing && !error && (
            <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
              <Sparkles className="mx-auto h-8 w-8 text-[#2F80ED]" />

              <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">
                No summary yet
              </h3>

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

