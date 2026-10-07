"use client";

import {
  ArrowUp,
  Mic,
  Paperclip,
} from "lucide-react";

interface TutorInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend?: (message: string) => void;
  disabled?: boolean;
}

export function TutorInput({
  value,
  onChange,
  onSend,
  disabled = false,
}: TutorInputProps) {
  const handleSend = () => {
    const trimmedMessage = value.trim();

    if (!trimmedMessage || disabled) return;

    onSend?.(trimmedMessage);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-slate-200 p-4 dark:border-slate-800">
      <div
        className="
          mx-auto flex max-w-4xl items-end gap-2
          rounded-2xl border border-slate-200
          bg-slate-50 p-2
          focus-within:border-[#2F80ED]
          focus-within:ring-2
          focus-within:ring-[#2F80ED]/10
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <button
          type="button"
          disabled={disabled}
          className="
            mb-1 rounded-lg p-2
            text-slate-500
            transition
            hover:bg-slate-200
            hover:text-slate-700
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:hover:bg-slate-800
            dark:hover:text-slate-300
          "
          title="Attach file"
        >
          <Paperclip className="h-5 w-5" />
        </button>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask EDU AI anything..."
          rows={1}
          className="
            max-h-32
            min-h-10
            flex-1
            resize-none
            bg-transparent
            px-2
            py-2
            text-sm
            text-slate-900
            outline-none
            placeholder:text-slate-400
            disabled:cursor-not-allowed
            dark:text-slate-100
            dark:placeholder:text-slate-500
          "
        />

        <button
          type="button"
          disabled={disabled}
          className="
            mb-1 rounded-lg p-2
            text-slate-500
            transition
            hover:bg-slate-200
            hover:text-slate-700
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:hover:bg-slate-800
            dark:hover:text-slate-300
          "
          title="Voice input"
        >
          <Mic className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className="
            mb-1 flex h-9 w-9 items-center
            justify-center rounded-xl
            bg-[#2F80ED]
            text-white
            transition
            hover:bg-blue-600
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
          title="Send message"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-2 text-center text-xs text-slate-400">
        EDU AI can make mistakes. Check important information.
      </p>
    </div>
  );
}