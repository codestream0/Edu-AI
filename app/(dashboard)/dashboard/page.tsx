"use client";

import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Brain,
  ClipboardList,
  FileText,
  FileUp,
  FireExtinguisher,
  Flame,
  MessageCircle,
  Mic,
  Paperclip,
  Power,
  PowerCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { RecentDocument } from "@/components/dashboard/recentDocument";
import { useAppSelector } from "@/lib/redux/hooks";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

interface Document {
  _id: string;
  title: string;
  fileType: string;
  originalName?: string;
  pageCount?: number;
  createdAt: string;
}

const DashboardPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const fullName = user?.fullName || "User";
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);
  const [documentsLoading, setDocumentsLoading] = useState(true);
  const [documentsError, setDocumentsError] = useState("");

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await api.get("/document/get-documents");
        const documents = response.data?.documents;

        if (!Array.isArray(documents)) {
          throw new Error("Unexpected get-documents response format");
        }

        setRecentDocuments(documents);
      } catch (error) {
        console.error("Failed to load dashboard documents:", error);
        setDocumentsError("Could not load recent study materials.");
      } finally {
        setDocumentsLoading(false);
      }
    };

    void getDocuments();
  }, []);

  const latestDocuments = [...recentDocuments]
    .sort(
      (first, second) =>
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime(),
    )
    .slice(0, 4);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Welcome back, {fullName.split(" ",2)[0].charAt(0).toUpperCase() + fullName.split(" ",2)[0].slice(1)} 👋
      </h1>

      <div className="mt-6 rounded-xl bg-white p-6 shadow-xl dark:bg-slate-800">
        <h1 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          Ask EDU AI, your personal learning assistant
        </h1>
        <Link href="/ai-tutor" className="block">
          <div className="relative">
            <Input
              placeholder="Type your message here..."
              className="
              h-14
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              pr-24
              text-sm
              shadow-sm
              focus-visible:border-[#2F80ED]
              focus-visible:ring-1
              focus-visible:ring-[#2F80ED]

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-white
            "
            />

            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
              <button
                type="button"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                <Paperclip className="h-5 w-5" />
              </button>

              <button
                type="button"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Link>
        <div></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ActivityCards
          icon={<FileUp />}
          title="Upload Document"
          description="Share your documents with EDU AI"
          direct="Upload"
          link="/document"
        />
        <ActivityCards
          icon={<MessageCircle />}
          title="Ask EDU AI"
          description="Start a personalized learning session"
          direct="Start"
          link="/ai-tutor"
        />
        <ActivityCards
          icon={<Sparkles />}
          title="AI summary"
          description="turn your study plan into a concise note"
          direct="summarize"
          link="/document"
        />
        <ActivityCards
          icon={<Brain />}
          title="Take a Quiz"
          description="Generate quizzes from your study material"
          direct="Generate"
          link="/quiz"
        />
      </div>
      <div className="mt-6">
        <div className="flex justify-between items-center ">
          <h1 className="font-semibold ">Recent study Material</h1>
          <Link href={"/document"} className="text-[12px] font-medium ">
            view all
          </Link>
        </div>
        <div className="grid gap-4 mt-4">
          {documentsLoading && (
            <p className="text-sm text-slate-500">Loading documents...</p>
          )}
          {!documentsLoading && documentsError && (
            <p className="text-sm text-red-600">{documentsError}</p>
          )}
          {!documentsLoading && !documentsError && latestDocuments.length === 0 && (
            <p className="text-sm text-slate-500">No documents yet.</p>
          )}
          {!documentsLoading && !documentsError && latestDocuments.map((document) => (
            <RecentDocument
              key={document._id}
              title={document.title || document.originalName || "Untitled document"}
              type={document.originalName?.split(".").pop()?.toUpperCase() ?? document.fileType}
              pages={document.pageCount}
              description={`Uploaded ${new Date(document.createdAt).toLocaleDateString()}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <h1 className="font-semibold">Study overview</h1>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <LearningStatsCard icon={<FileText />} title="Document" count={12} />
          <LearningStatsCard
            icon={<ClipboardList />}
            title="Quizzes"
            count={10}
          />
          <LearningStatsCard
            icon={<FileUp />}
            title="Average score"
            count={52}
          />
          <LearningStatsCard
            icon={<Flame />}
            title="Study days streaks"
            count={7}
          />
        </div>
      </div>
    </div>
  );
};

const ActivityCards = ({
  icon,
  title,
  description,
  direct,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  direct: string;
  link: string;
}) => {
  return (
    <Link href={link}>
      <div className="mt-6 rounded-xl min-w-100 space-y-3 bg-slate-50 p-6 shadow-xl dark:bg-slate-800">
        <button className="h-5 w-3 text-slate-500 ">{icon}</button>
        <h2 className="mb-2 text-lg font-semibold text-[14px] text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="text-slate-600 text-[13px]  dark:text-slate-400">
          {description}
        </p>
        <p className="flex gap-1 items-center font-bold text-slate-900 text-[11px] dark:text-white ">
          {direct} <ArrowRight className="h-3 w-3" />
        </p>
      </div>
    </Link>
  );
};

const LearningStatsCard = ({
  icon,
  title,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
}) => {
  return (
    <div className=" rounded-xl  min-w-100  bg-slate-50 p-6 border border-gray-300 dark:bg-slate-800 dark:border-gray-800 ">
      <div className="flex gap-6 items-center mb-8">
        <button className="h-5 w-3 text-slate-500 ">{icon}</button>
        <p className="text-lg font-semibold text-[14px] text-slate-900 dark:text-white">
          {title}
        </p>
      </div>
      <p className="text-center">{count}</p>
    </div>
  );
};

export default DashboardPage;
