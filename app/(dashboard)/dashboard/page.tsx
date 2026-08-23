import { Input } from "@/components/ui/input";
import { ArrowRight, Brain, FileUp, MessageCircle, Mic, Paperclip, Sparkles } from "lucide-react";
import Link from "next/link";

const DashboardPage = () => {
    return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Welcome back, Hamza 👋
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
      <div>
      </div>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      <ActivityCards icon={<FileUp/>} title="Upload Document" description="Share your documents with EDU AI" direct="Upload" link="/document" />
      <ActivityCards icon={<MessageCircle/>} title="Ask EDU AI" description="Start a personalized learning session" direct="Start" link="/ai-tutor" />
      <ActivityCards icon={<Sparkles/>} title="AI summary" description="turn your study plan into a concise note" direct="summarize" link="/document" />
      <ActivityCards icon={<Brain/>} title="Take a Quiz" description="Generate quizzes from your study material" direct="Generate" link="/quiz" />
    </div>

    

  </div>
    )
}

const ActivityCards=({icon, title, description,direct,link}:{icon: React.ReactNode; title: string; description: string; direct: string; link: string})=>{
  return(
    <Link href={link}>
      <div className="mt-6 rounded-xl min-w-100 space-y-3 bg-slate-50 p-6 shadow-xl dark:bg-slate-800">
        <button className="h-5 w-3 text-slate-500 ">{icon}</button>
        <h2 className="mb-2 text-lg font-semibold text-[14px] text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="text-slate-600 text-[13px]  dark:text-slate-400">
          {description}
        </p>
        <p className="flex gap-1 items-center font-bold text-slate-900 text-[11px] dark:text-white " >{direct} <ArrowRight className="h-3 w-3" /></p>
      </div>
    </Link>
  )
}

export default DashboardPage;