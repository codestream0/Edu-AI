"use client";

import { Bot, Copy, RefreshCw, Check, Save, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";

export type TutorMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

interface TutorMessagesProps {
  messages: TutorMessage[];
  isLoading?: boolean;
}

export function TutorMessages({
  messages,
  isLoading = false,
}: TutorMessagesProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (messageId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);

      setCopied(messageId);

      setTimeout(() => {
        setCopied(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {messages.map((message) => {
          const isUser = message.role === "user";

          return (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                isUser ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  isUser
                    ? "bg-[#2F80ED] text-white"
                    : "bg-[#EAF3FF] text-[#2F80ED]"
                }`}
              >
                {isUser ? (
                  <User className="h-5 w-5" />
                ) : (
                  <Bot className="h-5 w-5" />
                )}
              </div>

              <div
                className={`max-w-[80%] space-y-2 ${isUser ? "items-end" : ""}`}
              >
                <p
                  className={`text-sm font-medium ${
                    isUser
                      ? "text-right text-slate-700 dark:text-slate-300"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {isUser ? "You" : "EDU AI"}
                </p>

                <div
                  className={`whitespace-pre-wrap rounded-2xl px-5 py-4 text-sm leading-6 ${
                    isUser
                      ? "rounded-tr-md bg-[#2F80ED] text-white"
                      : "rounded-tl-md bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  }`}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>

                {!isUser && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleCopy(message.id, message.content)}
                      className="
                          rounded-md p-1.5
                          text-slate-400
                          transition
                          hover:bg-slate-100
                          hover:text-slate-700
                          dark:hover:bg-slate-800
                          dark:hover:text-slate-200
                        "
                      title={copied === message.id ? "Copied" : "Copy"}
                    >
                      {copied === message.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      className="
                        rounded-md p-1.5
                        text-slate-400
                        transition
                        hover:bg-slate-100
                        hover:text-slate-700
                        dark:hover:bg-slate-800
                        dark:hover:text-slate-200
                      "
                      title="Regenerate"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#2F80ED]">
              <Bot className="h-5 w-5" />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                EDU AI
              </p>

              <div className="rounded-2xl rounded-tl-md bg-slate-50 px-5 py-4 dark:bg-slate-900">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
