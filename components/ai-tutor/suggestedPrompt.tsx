"use client";

import {
  BookOpen,
  Brain,
  FileText,
  Lightbulb,
} from "lucide-react";

interface SuggestedPromptsProps {
  onPromptClick?: (prompt: string) => void;
}

const prompts = [
  {
    title: "Explain a topic",
    description: "Break down a difficult concept",
    icon: Lightbulb,
    prompt: "Explain a difficult topic to me in simple terms.",
  },
  {
    title: "Practice questions",
    description: "Test my understanding",
    icon: Brain,
    prompt: "Give me practice questions on what I'm studying.",
  },
  {
    title: "Summarize notes",
    description: "Turn notes into key points",
    icon: FileText,
    prompt: "Summarize my study material into important points.",
  },
  {
    title: "Study a subject",
    description: "Learn step by step",
    icon: BookOpen,
    prompt: "Help me study a subject step by step.",
  },
];

export function SuggestedPrompts({
  onPromptClick,
}: SuggestedPromptsProps) {
  return (
    <div className="px-6 pb-5">
      <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
        Try asking EDU AI
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {prompts.map((prompt) => {
          const Icon = prompt.icon;

          return (
            <button
              key={prompt.title}
              type="button"
              onClick={() => onPromptClick?.(prompt.prompt)}
              className="
                flex items-start gap-3 rounded-xl border
                border-slate-200 bg-white p-4 text-left
                transition hover:border-[#2F80ED]
                hover:bg-[#F5F9FF]
                dark:border-slate-800
                dark:bg-slate-900
                dark:hover:border-blue-500
                dark:hover:bg-slate-800
              "
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#2F80ED] dark:bg-blue-950/60 dark:text-blue-400">
                <Icon className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {prompt.title}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {prompt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}