"use client";

import { MessageSquare, Plus, Trash2 } from "lucide-react";

interface Conversation {
  _id: string;
  title: string;
  updatedAt: string;
}

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onNewConversation: () => void;
  onSelectConversation: (conversationId: string) => void;
  onDeleteConversation: (conversationId: string) => void;
}

export function ConversationSidebar({
  conversations,
  activeConversationId,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
}: ConversationSidebarProps) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      {/* Header */}
      <div className="border-b border-slate-200 p-4 dark:border-slate-800">
        <button
          type="button"
          onClick={onNewConversation}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F80ED] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2674d8]"
        >
          <Plus className="h-4 w-4" />
          New conversation
        </button>
      </div>

      {/* Conversations */}
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Conversations
        </p>

        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
            <MessageSquare className="mb-3 h-8 w-8 text-slate-300 dark:text-slate-700" />

            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              No conversations yet
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Start a new conversation with EDU AI.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {conversations.map((conversation) => {
              const isActive =
                activeConversationId === conversation._id;

              return (
                <div
                  key={conversation._id}
                  className={`group flex items-center gap-1 rounded-lg transition ${
                    isActive
                      ? "bg-[#EAF3FF] text-[#2F80ED] dark:bg-blue-950/50"
                      : "text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      onSelectConversation(conversation._id)
                    }
                    className="min-w-0 flex-1 px-3 py-2.5 text-left"
                  >
                    <p className="truncate text-sm font-medium">
                      {conversation.title}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {new Date(
                        conversation.updatedAt,
                      ).toLocaleDateString()}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onDeleteConversation(conversation._id)
                    }
                    className="mr-1 rounded-md p-1.5 text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 dark:hover:bg-red-950/40"
                    title="Delete conversation"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}