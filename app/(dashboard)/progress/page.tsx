"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Database,
  Flame,
  Globe,
  Lightbulb,
  Loader2,
  Monitor,
  Network,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import Link from "next/link";
import { api } from "@/lib/api";
import { useEffect } from "react";

type RecentQuiz = {
  _id?: string;
  id?: string;
  title?: string;
  questionType?: string;
  questionCount?: number;
  date?: string;
  completedAt?: string;
  score: number;
  totalPoints: number;
  percentage: number;
  status?: string;
  quiz?: {
    _id?: string;
    title?: string;
    questionType?: string;
    questionCount?: number;
  };
};
type ProgressData = {
  documentsStudied: number;
  quizzesCompleted: number;
  averageScore: number;
  studyStreak: number;

  weeklyChange?: {
    documents?: number;
    quizzes?: number;
    score?: number;
    streak?: number;
  };

  performance: {
    date: string;
    score: number;
  }[];

  activity: {
    day: string;
    sessions: number;
  }[];

  recentQuizzes: RecentQuiz[];
};

const EMPTY_PROGRESS: ProgressData = {
  documentsStudied: 0,
  quizzesCompleted: 0,
  averageScore: 0,
  studyStreak: 0,
  weeklyChange: {},
  performance: [],
  activity: [
    { day: "Mon", sessions: 0 },
    { day: "Tue", sessions: 0 },
    { day: "Wed", sessions: 0 },
    { day: "Thu", sessions: 0 },
    { day: "Fri", sessions: 0 },
    { day: "Sat", sessions: 0 },
    { day: "Sun", sessions: 0 },
  ],
  recentQuizzes: [],
};

const QUIZ_ICONS = [Code2, Network, Database, Monitor, Globe];

function formatDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ProgressCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  change,
  progress,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  change?: number;
  progress?: number;
}) {
  const positive = (change ?? 0) >= 0;

  return (
    <div className="min-w-0 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${color}`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            {title}
          </p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>

          <div className="mt-2 flex min-h-4 items-center gap-1 text-xs">
            {change !== undefined && (
              <span className={positive ? "text-emerald-600" : "text-red-500"}>
                {positive ? (
                  <ArrowUpRight className="inline h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="inline h-3.5 w-3.5" />
                )}
                {positive ? "+" : ""}
                {change}
                {title === "Average quiz score" ? "%" : ""}
              </span>
            )}

            <span className="truncate text-slate-400">{subtitle}</span>
          </div>

          {progress !== undefined && (
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-[#2F80ED] transition-all"
                style={{
                  width: `${Math.min(100, Math.max(0, progress))}%`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StudyProgressPage() {
  const [progress, setProgress] = useState<ProgressData>(EMPTY_PROGRESS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState("7");

  useEffect(() => {
    let active = true;

    async function loadProgress() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/progress/get-progress");
        const data = response.data?.progress ?? response.data;

        if (!active) return;

        const recentQuizzes: RecentQuiz[] = (
          Array.isArray(data.recentAttempts) ? data.recentAttempts : []
        ).map((attempt: any) => ({
          id: attempt._id,
          title: attempt.quiz?.title ?? "Untitled quiz",
          date: attempt.completedAt,
          completedAt: attempt.completedAt,
          score: Number(attempt.score ?? 0),
          totalPoints: Number(attempt.totalPoints ?? 0),
          percentage: Number(attempt.percentage ?? 0),
          status: "Completed",
          questionType: attempt.quiz?.questionType,
          questionCount: attempt.quiz?.questionCount,
        }));

        const performance = (
          Array.isArray(data.performance) ? data.performance : []
        )
          .map((item: any) => ({
            date: item.date,
            score: Number(item.score ?? 0),
          }))
          .filter((item: { date: string; score: number }) =>
            Number.isFinite(new Date(item.date).getTime()),
          )
          .sort(
            (a: { date: string }, b: { date: string }) =>
              new Date(a.date).getTime() - new Date(b.date).getTime(),
          );

        // Build the current week's activity from recorded quiz attempts.
        const weekStart = new Date();
        weekStart.setHours(0, 0, 0, 0);
        const dayOfWeek = weekStart.getDay();
        weekStart.setDate(
          weekStart.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1),
        );

        const activity = [
          { day: "Mon", sessions: 0 },
          { day: "Tue", sessions: 0 },
          { day: "Wed", sessions: 0 },
          { day: "Thu", sessions: 0 },
          { day: "Fri", sessions: 0 },
          { day: "Sat", sessions: 0 },
          { day: "Sun", sessions: 0 },
        ];

        // recentAttempts contains only the latest five attempts.
        // This is a useful temporary chart, not a complete activity history.
        recentQuizzes.forEach((quiz) => {
          if (!quiz.completedAt) return;

          const completedDate = new Date(quiz.completedAt);
          if (completedDate < weekStart) return;

          const daysSinceMonday = (completedDate.getDay() + 6) % 7;

          if (daysSinceMonday >= 0 && daysSinceMonday < 7) {
            activity[daysSinceMonday].sessions += 1;
          }
        });

        if (!active) return;

        setProgress({
          documentsStudied: Number(data.summary?.documentsStudied ?? 0),
          quizzesCompleted: Number(data.summary?.quizzesCompleted ?? 0),
          averageScore: Number(data.summary?.averageScore ?? 0),
          studyStreak: Number(data.summary?.studyStreak ?? 0),
          performance,
          recentQuizzes,
          activity,
          weeklyChange: {},
        });
      } catch (err) {
        console.error("Failed to load study progress:", err);

        if (active) {
          setError(
            "We couldn't load your progress. Check that your progress API is available and try again.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadProgress();

    return () => {
      active = false;
    };
  }, []);

  const performanceData = useMemo(() => {
    const count = Number(period);

    if (count === 0) return progress.performance;

    return progress.performance.slice(-count);
  }, [progress.performance, period]);

  return (
    <div className="min-h-full space-y-6  p-4  sm:p-6 lg:p-7">
      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <BarChart3 className="mt-0.5 h-8 w-8 text-[#2F80ED]" />

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Study Progress
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track your learning activity and quiz performance.
            </p>
          </div>
        </div>

        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 rounded-lg bg-[#2F80ED] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          <Target className="h-4 w-4" />
          Practice quiz
        </Link>
      </div>

      {error && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">
          <Loader2 className="h-5 w-5 animate-spin text-[#2F80ED]" />
          Loading your study progress...
        </div>
      )}

      {/* Overview cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ProgressCard
          title="Documents studied"
          value={progress.documentsStudied}
          subtitle="this week"
          change={progress.weeklyChange?.documents}
          icon={BookOpen}
          color="bg-blue-500"
        />

        <ProgressCard
          title="Quizzes completed"
          value={progress.quizzesCompleted}
          subtitle="this week"
          change={progress.weeklyChange?.quizzes}
          icon={ClipboardCheck}
          color="bg-violet-500"
        />

        <ProgressCard
          title="Average quiz score"
          value={`${progress.averageScore}%`}
          subtitle="this week"
          change={progress.weeklyChange?.score}
          progress={progress.averageScore}
          icon={TrendingUp}
          color="bg-emerald-500"
        />

        <ProgressCard
          title="Study streak"
          value={`${progress.studyStreak} ${progress.studyStreak === 1 ? "day" : "days"}`}
          subtitle="consecutive"
          change={progress.weeklyChange?.streak}
          icon={Flame}
          color="bg-orange-400"
        />
      </section>

      {/* Performance and activity charts */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5 xl:col-span-3">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <BarChart3 className="mt-0.5 h-5 w-5 text-[#2F80ED]" />
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Quiz performance
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Your score across completed quiz attempts
                </p>
              </div>
            </div>

            <div className="relative">
              <select
                aria-label="Performance time period"
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-xs text-slate-600 outline-none focus:border-[#2F80ED] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                <option value="7">Last 7 attempts</option>
                <option value="10">Last 10 attempts</option>
                <option value="30">Last 30 attempts</option>
                <option value="0">All attempts</option>
              </select>
            </div>
          </div>

          <div className="h-56 w-full">
            {performanceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E8EEF7"
                    className="dark:stroke-slate-800"
                  />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value: string) =>
                      new Date(value).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })
                    }
                    tick={{ fontSize: 10, fill: "#64748B" }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fontSize: 10, fill: "#64748B" }}
                    axisLine={false}
                    tickLine={false}
                    width={38}
                  />
                  <Tooltip
                    labelFormatter={(value) =>
                      new Date(String(value)).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }
                    labelClassName="dark:text-black"
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#2F80ED"
                    strokeWidth={2.5}
                    dot={{
                      r: 3.5,
                      fill: "#2F80ED",
                      strokeWidth: 2,
                      stroke: "#FFFFFF",
                    }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState
                icon={TrendingUp}
                title="No quiz performance yet"
                description="Complete a quiz to see your score trends here."
              />
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5 xl:col-span-2">
          <div className="mb-5 flex items-start gap-3">
            <CalendarDays className="mt-0.5 h-5 w-5 text-[#2F80ED]" />
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Study activity
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Study sessions throughout the week
              </p>
            </div>
          </div>

          <div className="h-56 w-full">
            {progress.activity.some((day) => day.sessions > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={progress.activity}
                  margin={{ top: 8, right: 0, left: -18, bottom: 0 }}
                  className="hover:cursor-pointer"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E8EEF7"
                    className="dark:stroke-slate-800"
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 10, fill: "#64748B" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 10, fill: "#64748B" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value) => [value, "Study sessions"]}
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid #E2E8F0",
                      fontSize: 12,
                    }}
                  />
                  <Bar
                    dataKey="sessions"
                    fill="#2F80ED"
                    radius={[5, 5, 0, 0]}
                    maxBarSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState
                icon={Activity}
                title="No study activity yet"
                description="Your activity will appear as you study."
              />
            )}
          </div>
        </div>
      </section>

      {/* Recent quiz activity and insights */}
      <section className="grid grid-cols-1 gap-4">
        <div className="min-w-0 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5 ">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <ClipboardCheck className="mt-0.5 h-5 w-5 text-[#2F80ED]" />
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Recent quiz activity
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Your latest completed quiz attempts
                </p>
              </div>
            </div>

            <Link
              href="/quiz"
              className="shrink-0 text-xs font-medium text-[#2F80ED] hover:underline"
            >
              View all
            </Link>
          </div>

          {progress.recentQuizzes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-130 text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 dark:border-slate-800">
                    <th className="px-2 py-3 font-medium">Quiz title</th>
                    <th className="px-2 py-3 font-medium">Date</th>
                    <th className="px-2 py-3 font-medium">Score</th>
                    <th className="px-2 py-3 font-medium">Status</th>
                    <th className="px-2 py-3" />
                  </tr>
                </thead>

                <tbody>
                  {progress.recentQuizzes.map((quiz, index) => {
                    const QuizIcon = QUIZ_ICONS[index % QUIZ_ICONS.length];

                    const quizId = quiz.id ?? quiz._id;
                    const quizTitle =
                      quiz.title ?? quiz.quiz?.title ?? "Untitled quiz";
                    const questionType =
                      quiz.questionType ??
                      quiz.quiz?.questionType ??
                      "Practice";
                    const questionCount =
                      quiz.questionCount ?? quiz.quiz?.questionCount ?? 0;
                    const quizDate = quiz.date ?? quiz.completedAt;
                    const percentage = Number(quiz.percentage ?? 0);
                    const score = Number(quiz.score ?? 0);
                    const totalPoints = Number(quiz.totalPoints ?? 0);
                    const status = quiz.status ?? "Completed";

                    return (
                      <tr
                        key={quizId ?? `${quizTitle}-${index}`}
                        className="border-b border-slate-50 transition hover:bg-slate-50/80 dark:border-slate-800/70 dark:hover:bg-slate-800/40"
                      >
                        <td className="px-2 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2F80ED] dark:bg-blue-950/40">
                              <QuizIcon className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-48 truncate font-medium text-slate-800 dark:text-slate-200">
                                {quizTitle}
                              </p>

                              <p className="mt-1 text-[10px] capitalize text-slate-400">
                                {questionType.replaceAll("_", " ")} ·{" "}
                                {questionCount} questions
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-2 py-3 text-slate-500">
                          {quizDate ? formatDate(quizDate) : "—"}
                        </td>

                        <td className="whitespace-nowrap px-2 py-3">
                          <p className="font-semibold text-slate-700 dark:text-slate-200">
                            {score} / {totalPoints}
                          </p>
                          <p className="mt-1 text-[10px] text-slate-400">
                            {percentage}%
                          </p>
                        </td>

                        <td className="px-2 py-3">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                            <CheckCircle2 className="h-3 w-3" />
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              icon={ClipboardCheck}
              title="No completed quizzes"
              description="Your completed quiz attempts will appear here."
              action={
                <Link
                  href="/quiz"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#2F80ED] hover:underline"
                >
                  Explore quizzes <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
          )}
        </div>
      </section>

      <p className="text-xs text-slate-400">
        Your study progress is based on recorded learning activity and quiz
        results.
      </p>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-40 flex-col items-center justify-center px-5 py-8 text-center">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-[#2F80ED] dark:bg-blue-950/40">
        <Icon className="h-5 w-5" />
      </div>
      <p className="font-medium text-slate-800 dark:text-slate-200">{title}</p>
      <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
        {description}
      </p>
      {action}
    </div>
  );
}

