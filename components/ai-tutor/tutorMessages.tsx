"use client";

import { Bot, Copy, RefreshCw, Save } from "lucide-react";

export function TutorMessages() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl space-y-6">
        {/* AI Message */}
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#2F80ED]">
            <Bot className="h-5 w-5" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              EDU AI
            </p>

            <div className="rounded-2xl rounded-tl-md bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              Hello! I'm your AI learning assistant. What would you like to
              learn today?
            </div>


            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                title="Copy"
              >
                <Copy className="h-4 w-4" />
              </button>

              <button
                type="button"
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                title="Regenerate"
              >
                <RefreshCw className="h-4 w-4" />
              </button>

              <button
                type="button"
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                title="Save"
              >
                <Save className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}