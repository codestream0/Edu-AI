"use client";

import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Brain,
  ClipboardList,
  FileText,
  FileUp,
  Flame,
  MessageCircle,
  Mic,
  Paperclip,
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

interface DashboardStats {
  documentsStudied: number;
  quizzesCompleted: number;
  averageScore: number;
  studyStreak: number;
}

const DashboardPage = () => {
  const user = useAppSelector((state) => state.auth.user);

  const fullName = user?.fullName || "User";
  const firstName = fullName.split(" ")[0];

  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);
  const [documentsLoading, setDocumentsLoading] = useState(true);
  const [documentsError, setDocumentsError] = useState("");
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    documentsStudied: 0,
    quizzesCompleted: 0,
    averageScore: 0,
    studyStreak: 0,
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [documentsResponse, progressResponse] = await Promise.all([
          api.get("/document/get-documents"),
          api.get("/progress/get-progress"),
        ]);

        const documents = documentsResponse.data?.documents;

        if (!Array.isArray(documents)) {
          throw new Error("Unexpected get-documents response format");
        }

        setRecentDocuments(documents);

        const progress =
          progressResponse.data?.progress ?? progressResponse.data;

        setDashboardStats({
          documentsStudied: Number(progress?.summary?.documentsStudied ?? 0),
          quizzesCompleted: Number(progress?.summary?.quizzesCompleted ?? 0),
          averageScore: Number(progress?.summary?.averageScore ?? 0),
          studyStreak: Number(progress?.summary?.studyStreak ?? 0),
        });
      } catch (error) {
        console.error("Failed to load dashboard:", error);
        setDocumentsError("Could not load dashboard data.");
      } finally {
        setDocumentsLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  const latestDocuments = [...recentDocuments]
    .sort(
      (first, second) =>
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime(),
    )
    .slice(0, 4);

  return (
    <div className="w-full max-w-full overflow-x-hidden ">
      {/* Welcome */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
          Welcome back, {firstName.charAt(0).toUpperCase() + firstName.slice(1)}{" "}
          👋
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 sm:hidden">
          What would you like to learn today?
        </p>
      </div>

      {/* AI Tutor */}
      <div className="mt-5 rounded-xl bg-gray-200 p-4  sm:mt-6 sm:p-6 dark:bg-slate-800">
        <h2 className="mb-4 text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
          Ask EDU AI, your personal learning assistant
        </h2>

        <Link href="/ai-tutor" className="block">
          <div className="relative">
            <Input
              placeholder="Ask EDU AI anything..."
              className="
                h-12
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
                sm:h-14
                sm:pr-24
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
              "
            />

            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-0.5 sm:right-3 sm:gap-2">
              <button
                type="button"
                aria-label="Attach file"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-500
                  transition
                  hover:bg-slate-200
                  hover:text-slate-700
                  sm:h-10
                  sm:w-10
                  dark:text-slate-400
                  dark:hover:bg-slate-700
                "
              >
                <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <button
                type="button"
                aria-label="Voice input"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-500
                  transition
                  hover:bg-slate-200
                  hover:text-slate-700
                  sm:h-10
                  sm:w-10
                  dark:text-slate-400
                  dark:hover:bg-slate-700
                "
              >
                <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
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
          title="AI Summary"
          description="Turn your study material into a concise note"
          direct="Summarize"
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

      {/* Recent Study Material */}
      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="min-w-0 truncate text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
            Recent study material
          </h2>

          <Link
            href="/document"
            className="shrink-0 text-xs font-medium text-[#2F80ED] hover:underline sm:text-sm"
          >
            View all
          </Link>
        </div>

        <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4">
          {documentsLoading && (
            <p className="text-sm text-slate-500">Loading documents...</p>
          )}

          {!documentsLoading && documentsError && (
            <p className="text-sm text-red-600">{documentsError}</p>
          )}

          {!documentsLoading &&
            !documentsError &&
            latestDocuments.length === 0 && (
              <p className="text-sm text-slate-500">No documents yet.</p>
            )}

          {!documentsLoading &&
            !documentsError &&
            latestDocuments.map((document) => (
              <RecentDocument
                key={document._id}
                title={
                  document.title || document.originalName || "Untitled document"
                }
                type={
                  document.originalName?.split(".").pop()?.toUpperCase() ??
                  document.fileType
                }
                pages={document.pageCount}
                description={`Uploaded ${new Date(
                  document.createdAt,
                ).toLocaleDateString()}`}
              />
            ))}
        </div>
      </div>

      {/* Study Overview */}
      <div className="mt-6 pb-6">
        <h2 className="mb-3 text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
          Study overview
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <LearningStatsCard
            icon={<FileText />}
            title="Documents"
            count={dashboardStats.documentsStudied}
          />

          <LearningStatsCard
            icon={<ClipboardList />}
            title="Quizzes"
            count={dashboardStats.quizzesCompleted}
          />

          <LearningStatsCard
            icon={<FileUp />}
            title="Average score"
            count={dashboardStats.averageScore}
            suffix="%"
          />

          <LearningStatsCard
            icon={<Flame />}
            title="Study streak"
            count={dashboardStats.studyStreak}
            suffix=" days"
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
    <Link href={link} className="block">
      <div
        className="
          flex
          min-h-38.75
          w-full
          flex-col
          justify-between
          rounded-xl
          bg-gray-100
          p-4
          shadow-md
          transition
          hover:-translate-y-0.5
          hover:shadow-lg
          sm:min-h-42.5
          sm:p-6
          dark:bg-slate-800
        "
      >
        <div>
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#2F80ED] dark:bg-blue-950/50">
            <span className="[&>svg]:h-5 [&>svg]:w-5">{icon}</span>
          </div>

          <h2 className="text-sm font-semibold text-slate-900 sm:text-base dark:text-white">
            {title}
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm dark:text-slate-400">
            {description}
          </p>
        </div>

        <p className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-white">
          {direct}
          <ArrowRight className="h-3.5 w-3.5" />
        </p>
      </div>
    </Link>
  );
};

const LearningStatsCard = ({
  icon,
  title,
  count,
  suffix = "",
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
  suffix?: string;
}) => {
  return (
    <div
      className="
        rounded-xl
        border
        border-slate-200
        bg-gray-100
        p-4
        dark:border-slate-800
        dark:bg-slate-800
      "
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#2F80ED] dark:bg-slate-900">
          <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        </div>

        <p className="truncate text-xs font-semibold text-slate-900 sm:text-sm dark:text-white">
          {title}
        </p>
      </div>

      <p className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
        {count}
        {suffix}
      </p>
    </div>
  );
};
export default DashboardPage;
