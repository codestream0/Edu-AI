"use client";

import { Menu, Bell } from "lucide-react";

import { ThemeToggle } from "./themetoggle";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header
      className="
        flex h-20 items-center justify-between
        border-b border-slate-200
        bg-white
        px-6

        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      {/* Left side */}
      <div className="flex items-center gap-4">

        {/* Sidebar toggle */}
        <button
          onClick={onMenuClick}
          className="
            rounded-lg
            p-2
            text-slate-700
            hover:bg-slate-100

            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="hidden md:block">
          <input
            placeholder="Search documents, quizzes, topics..."
            className="
              w-80
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-2
              text-sm
              text-slate-900
              outline-none

              placeholder:text-slate-400

              focus:border-[#2F80ED]

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-white
              dark:placeholder:text-slate-500
              dark:focus:border-blue-500
            "
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">

        {/* Dark mode */}
        <ThemeToggle />

        {/* Notification */}
        <button
          className="
            rounded-lg
            p-2
            text-slate-700
            hover:bg-slate-100

            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <Bell className="h-5 w-5" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2">

          <div
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-full
              bg-[#EAF3FF]
              font-semibold
              text-[#2F80ED]

              dark:bg-blue-950
              dark:text-blue-400
            "
          >
            H
          </div>

          <span
            className="
              hidden
              text-sm
              font-medium
              text-slate-900
              md:block

              dark:text-slate-200
            "
          >
            Hamza
          </span>

        </div>

      </div>
    </header>
  );
}