"use client";

import { useEffect, useState } from "react";

import {
  Menu,
  Sparkles,
  X,
} from "lucide-react";

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

  // Mobile conversation drawer
  const [conversationSidebarOpen, setConversationSidebarOpen] =
    useState(false);

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
       * Refresh conversation list.
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

    // Close mobile drawer
    setConversationSidebarOpen(false);
  };

  /*
   * Load an existing conversation.
   */
  const handleSelectConversation = async (id: string) => {
    if (id === conversationId) {
      setConversationSidebarOpen(false);
      return;
    }

    try {
      setIsLoadingConversation(true);

      const data = await getConversation(id);

      setConversationId(data.conversation._id);
      setMessages(data.messages);
      setInput("");

      // Close mobile drawer after selecting chat
      setConversationSidebarOpen(false);
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

      setConversations((currentConversations) =>
        currentConversations.filter(
          (conversation) => conversation._id !== id,
        ),
      );

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
    <div className="relative flex h-[calc(100vh-140px)] min-h-0 overflow-hidden rounded-2xl border bg-white dark:bg-slate-950">

      {conversationSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setConversationSidebarOpen(false)}
        />
      )}


      <div
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          w-72
          transition-transform
          duration-300
          md:relative
          md:z-auto
          md:w-64
          md:translate-x-0
          ${
            conversationSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="relative h-full">
          <ConversationSidebar
            conversations={conversations}
            activeConversationId={conversationId}
            onNewConversation={handleNewConversation}
            onSelectConversation={handleSelectConversation}
            onDeleteConversation={handleDeleteConversation}
          />

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setConversationSidebarOpen(false)}
            className="
              absolute
              right-3
              top-3
              rounded-lg
              p-2
              text-slate-500
              hover:bg-slate-100
              dark:text-slate-400
              dark:hover:bg-slate-800
              md:hidden
            "
            aria-label="Close conversations"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* =========================================================
          MAIN AI TUTOR AREA
          ========================================================= */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Header */}
        <div className="shrink-0 border-b px-4 py-4 sm:p-5">
          <div className="flex items-center gap-3">

            {/* Mobile conversation menu */}
            <button
              type="button"
              onClick={() =>
                setConversationSidebarOpen(true)
              }
              className="
                rounded-lg
                p-2
                text-slate-500
                transition
                hover:bg-slate-100
                dark:text-slate-400
                dark:hover:bg-slate-800
                md:hidden
              "
              aria-label="Open conversations"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
              <Sparkles className="h-5 w-5 text-[#2F80ED]" />
            </div>

            <div className="min-w-0">
              <h1 className="font-semibold">
                AI Tutor
              </h1>

              <p className="truncate text-sm text-slate-500">
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
            <TutorMessages
              messages={messages}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Suggested Prompts */}
        {messages.length === 0 &&
          !isLoading &&
          !isLoadingConversation && (
            <div className="shrink-0">
              <SuggestedPrompts
                onPromptClick={handlePromptClick}
              />
            </div>
          )}

        <div className="shrink-0 border-t p-3 sm:p-4">
          <TutorInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            disabled={
              isLoading || isLoadingConversation
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AITutorPage;