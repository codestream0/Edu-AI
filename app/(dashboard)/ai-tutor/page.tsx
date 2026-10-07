"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

import { SuggestedPrompts } from "@/components/ai-tutor/suggestedPrompt";
import {
  TutorInput,
} from "@/components/ai-tutor/tutorInput";
import {
  TutorMessages,
  TutorMessage,
} from "@/components/ai-tutor/tutorMessages";

import { sendAIMessage } from "@/services/ai.service";

const AITutorPage = () => {
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(
    null,
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const trimmedMessage = message.trim();

    setInput("");
    setIsLoading(true);

    try {
      const result = await sendAIMessage(
        trimmedMessage,
        conversationId ?? undefined,
      );

      if (!conversationId) {
        setConversationId(result.conversationId);
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        result.userMessage,
        result.assistantMessage,
      ]);
    } catch (error) {
      console.error("Failed to send AI message:", error);

    
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)] flex-col rounded-2xl border bg-white dark:bg-slate-950">
      <div className="border-b p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
            <Sparkles className="text-[#2F80ED]" />
          </div>

          <div>
            <h1 className="font-semibold">AI Tutor</h1>

            <p className="text-sm text-slate-500">
              Your personalized learning assistant
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <TutorMessages
          messages={messages}
          isLoading={isLoading}
        />
      </div>

      {messages.length === 0 && !isLoading && (
        <SuggestedPrompts
          onPromptClick={handlePromptClick}
        />
      )}

      <TutorInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={isLoading}
      />
    </div>
  );
};

export default AITutorPage;