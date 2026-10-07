"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

import { SuggestedPrompts } from "@/components/ai-tutor/suggestedPrompt";
import { TutorInput } from "@/components/ai-tutor/tutorInput";
import {
  TutorMessages,
  TutorMessage,
} from "@/components/ai-tutor/tutorMessages";
import { ConversationSidebar } from "@/components/ai-tutor/conversationSidebar";

import {
  deleteConversation,
  getConversation,
  getConversations,
  sendAIMessage,
  Conversation,
} from "@/services/ai.service";

const AITutorPage = () => {
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);

  /*
   * Load conversations when the AI Tutor page opens
   */
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const data = await getConversations();
        setConversations(data);
      } catch (error) {
        console.error("Failed to load conversations:", error);
      }
    };

    loadConversations();
  }, []);

  /*
   * Send a message to EDU AI
   */
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

      /*
       * If this is the first message in a new chat,
       * the backend creates the conversation.
       */
      if (!conversationId) {
        setConversationId(result.conversationId);
      }

      /*
       * Add the user and assistant messages to the current chat.
       */
      setMessages((currentMessages) => [
        ...currentMessages,
        result.userMessage,
        result.assistantMessage,
      ]);

      /*
       * Refresh the conversation sidebar so the newly
       * created/updated conversation appears there.
       */
      const updatedConversations = await getConversations();
      setConversations(updatedConversations);
    } catch (error) {
      console.error("Failed to send AI message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /*
   * Put a suggested prompt into the input.
   */
  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  /*
   * Start a new conversation.
   */
  const handleNewConversation = () => {
    setConversationId(null);
    setMessages([]);
    setInput("");
  };

  /*
   * Load an existing conversation.
   */
  const handleSelectConversation = async (id: string) => {
    /*
     * Don't reload the conversation the user is
     * already viewing.
     */
    if (id === conversationId) return;

    try {
      setIsLoadingConversation(true);

      const data = await getConversation(id);

      setConversationId(data.conversation._id);
      setMessages(data.messages);
      setInput("");
    } catch (error) {
      console.error("Failed to load conversation:", error);
    } finally {
      setIsLoadingConversation(false);
    }
  };

  /*
   * Delete a conversation.
   */
  const handleDeleteConversation = async (id: string) => {
    try {
      await deleteConversation(id);

      /*
       * Remove it from the sidebar immediately.
       */
      setConversations((currentConversations) =>
        currentConversations.filter((conversation) => conversation._id !== id),
      );

      /*
       * If the deleted conversation is currently open,
       * clear the chat area.
       */
      if (conversationId === id) {
        setConversationId(null);
        setMessages([]);
        setInput("");
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-140px)] overflow-hidden rounded-2xl border bg-white dark:bg-slate-950">
      <ConversationSidebar
        conversations={conversations}
        activeConversationId={conversationId}
        onNewConversation={handleNewConversation}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
      />

      {/* Main AI Tutor Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <div className="shrink-0 border-b p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
              <Sparkles className="h-5 w-5 text-[#2F80ED]" />
            </div>

            <div>
              <h1 className="font-semibold">AI Tutor</h1>

              <p className="text-sm text-slate-500">
                Your personalized learning assistant
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {isLoadingConversation ? (
            <div className="flex h-full items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[#2F80ED]" />
                Loading conversation...
              </div>
            </div>
          ) : (
            <TutorMessages messages={messages} isLoading={isLoading} />
          )}
        </div>

        {/* Suggested Prompts */}
        {messages.length === 0 && !isLoading && !isLoadingConversation && (
          <div className="shrink-0">
            <SuggestedPrompts onPromptClick={handlePromptClick} />
          </div>
        )}

        {/* Input */}
        <div className="shrink-0 border-t p-4">
          <TutorInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            disabled={isLoading || isLoadingConversation}
          />
        </div>
      </div>
    </div>
  );
};

export default AITutorPage;
