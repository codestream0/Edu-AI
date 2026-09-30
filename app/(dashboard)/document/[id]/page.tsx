"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Brain, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";


interface Document {
  _id: string;
  title?: string;
  fileType?: string;
  originalName?: string;
  pageCount?: number;
  createdAt?: string;
}

export default function DocumentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    let active = true;

    async function loadDocument() {
      setLoading(true);
      setError("");
      setDocument(null);
      try {
  
        const response = await api.get("/document/get-documents");
        const documents = response.data?.documents;
        if (!Array.isArray(documents)) {
          throw new Error("The documents response was not in the expected format.");
        }
        const selected = documents.find(
          (item: Document) => String(item._id) === String(id),
        );
        if (active) {
          if (selected) setDocument(selected);
          else setError("This document could not be found.");
        }
      } catch (loadError) {
        console.error("Failed to load document:", loadError);
        if (active) setError("Failed to load this document. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadDocument();
    return () => { active = false; };
  }, [id]);

  const handleDeleteDocument = async (userId:string)=>{
    try{
      console.log("loading!!!");
      
      const response = await api.delete(`/document/${userId}`);
      console.log(`Document ${userId} deleted successfully`, response.data);
      setDocument(null)
      router.back();
    }catch(error){
      console.error("Failed to delete document",error)
    }
  }

  const title = document?.title || document?.originalName || "Untitled document";
  const fileType = document?.originalName?.split(".").pop()?.toUpperCase() || document?.fileType || "Document";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">     
          <Link href="/document" aria-label="Back to documents" className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white">
              {loading ? "Loading document..." : document ? title : "Document"}
            </h1>
            {document && <p className="text-sm text-slate-500">{fileType} · {document.pageCount ?? "—"} pages</p>}
          </div>
        </div>
        <button
          className=" rounded-xl bg-[#2F80ED] px-2 py-2 font-medium text-white hover:bg-blue-600"
          onClick={()=> handleDeleteDocument(id)}
        >
          Delete document
        </button>
      </div>

      {loading && <p className="rounded-xl border border-slate-200 p-6 text-sm text-slate-500 dark:border-slate-800">Loading document details...</p>}
      {!loading && error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</p>}

      {document && !loading && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href={`/document/${encodeURIComponent(id)}/summary`} className="rounded-xl border border-slate-200 bg-white p-5 hover:border-[#2F80ED] dark:border-slate-800 dark:bg-slate-900">
              <Sparkles className="h-6 w-6 text-[#2F80ED]" />
              <h2 className="mt-3 font-semibold">AI Summary</h2>
              <p className="mt-1 text-sm text-slate-500">Get a concise summary of this document.</p>
            </Link>
            <Link href={`/document/${encodeURIComponent(id)}/quiz`} className="rounded-xl border border-slate-200 bg-white p-5 hover:border-[#2F80ED] dark:border-slate-800 dark:bg-slate-900">
              <Brain className="h-6 w-6 text-purple-500" />
              <h2 className="mt-3 font-semibold">Generate Quiz</h2>
              <p className="mt-1 text-sm text-slate-500">Test your knowledge using this material.</p>
            </Link>
          </div>

          <div className="min-h-80 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 border-b pb-5 dark:border-slate-800">
              <FileText className="h-5 w-5 text-[#2F80ED]" />
              <h2 className="font-semibold">Document details</h2>
            </div>
            <dl className="grid gap-4 pt-5 text-sm sm:grid-cols-2">
              <div><dt className="text-slate-500">File name</dt><dd className="mt-1 break-all font-medium">{document.originalName || title}</dd></div>
              <div><dt className="text-slate-500">Type</dt><dd className="mt-1 font-medium">{fileType}</dd></div>
              <div><dt className="text-slate-500">Pages</dt><dd className="mt-1 font-medium">{document.pageCount ?? "Unknown"}</dd></div>
              {document.createdAt && <div><dt className="text-slate-500">Uploaded</dt><dd className="mt-1 font-medium">{new Date(document.createdAt).toLocaleDateString()}</dd></div>}
            </dl>
          </div>
        </>
      )}
    </div>
  );
}
