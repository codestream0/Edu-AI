"use client";

import { api } from "@/lib/api";
import { FileText, Upload } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Document{
  _id: string,
  title:string,
  fileType: string,
  originalName?: string,
  pageCount:number,
  createdAt:string;
}

export default function DocumentsPage() {
  const [documents,setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("");
  useEffect(()=>{
    const getDocuments = async ()=>{
      try{
        setLoading(true)
        const response = await api.get("/document/get-documents")
        const result = response.data?.documents

        if (!Array.isArray(result)) {
          console.error("Unexpected get-documents response:", response.data)
          setDocuments([])
          setError("The documents response was not in the expected format.")
          return
        }
        
        setDocuments(result)
      }catch (error) {
        console.error("Failed to fetch documents:", error);

        setError("Failed to load your documents.");
      } finally {
        setLoading(false);
      }
    }
    getDocuments()
  },[])

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
        <div className="mb-4 mt-5 flex items-center justify-between">
          <h2 className="font-semibold text-center text-slate-900 dark:text-white">
            Recent Study Materials
          </h2>
        </div>

          {loading && (
          <div className="py-10 text-center text-sm text-slate-500">
            Loading documents...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && documents.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
            <FileText className="mx-auto h-8 w-8 text-slate-400" />

            <p className="mt-3 font-medium text-slate-700 dark:text-slate-200">
              No documents yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Upload your first study material to get started.
            </p>
          </div>
        )}

        <div className="space-y-4">
        {!loading && !error && documents.length > 0 && (
          <div className="space-y-4">
            {documents.map((document) => (
              <DocumentCard
                key={document._id}
                document={document}
              />
            ))}
          </div>
        )}

        </div>
      </section>

    </div>
  );
}

function DocumentCard({
  document,
}: {
  document: {
    _id: string;
    title: string;
    fileType: string;
    originalName?: string;
    pageCount: number
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
            {document.originalName?.split(".").pop()?.toUpperCase() ?? document.fileType} . {document.pageCount} pages
          </p>
        </div>

        <Link
          href={`/document/${document._id}`}
          className="text-sm font-medium text-[#2F80ED]"
        >
          Open
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-2 border-t border-slate-200 pt-4 dark:border-slate-800">
        <Link
          href={`/document/${document._id}/summary`}
          className="text-center text-sm font-medium text-slate-600 hover:text-[#2F80ED] dark:text-slate-300"
        >
          Summary
        </Link>

        <Link
          href={`/document/${document._id}/quiz`}
          className="text-center text-sm font-medium text-slate-600 hover:text-[#2F80ED] dark:text-slate-300"
        >
          Quiz
        </Link>
      </div>
    </div>
  );
}
