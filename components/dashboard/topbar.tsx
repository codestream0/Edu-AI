"use client";

import {
  Menu,
  Bell,
  Search,
} from "lucide-react";

import { ThemeToggle } from "./themetoggle";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header
      className="
        flex h-20 shrink-0 items-center justify-between
        border-b border-slate-200
        bg-white
        px-3 sm:px-5 lg:px-6
        dark:border-slate-800
        dark:bg-slate-950
      "
    >

      <div className="flex min-w-0 items-center gap-2 sm:gap-4">

        <button
          onClick={onMenuClick}
          type="button"
          aria-label="Toggle sidebar"
          className="
            shrink-0
            rounded-lg
            p-2
            text-slate-700
            transition-colors
            hover:bg-slate-100
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden md:block">
          <div className="relative">
            <Search
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="search"
              placeholder="Search documents, quizzes, topics..."
              className="
                h-10
                w-64
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-9
                pr-4
                text-sm
                text-slate-900
                outline-none
                transition-all

                placeholder:text-slate-400

                focus:border-[#2F80ED]
                focus:ring-2
                focus:ring-[#2F80ED]/10

                lg:w-80

                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:border-blue-500
              "
            />
          </div>
        </div>

        <button
          type="button"
          aria-label="Search"
          className="
            rounded-lg
            p-2
            text-slate-600
            hover:bg-slate-100
            md:hidden
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-4">

        <ThemeToggle />

        <button
          type="button"
          aria-label="Notifications"
          className="
            relative
            rounded-lg
            p-2
            text-slate-700
            transition-colors
            hover:bg-slate-100

            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <Bell className="h-5 w-5" />

          <span
            className="
              absolute
              right-1.5
              top-1.5
              h-1.5
              w-1.5
              rounded-full
              bg-[#2F80ED]
            "
          />
        </button>

        <div className="flex items-center gap-2 sm:gap-3">

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#EAF3FF]
              text-sm
              font-semibold
              text-[#2F80ED]

              dark:bg-blue-950
              dark:text-blue-400
            "
          >
            H
          </div>

          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Hamza
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Student
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}