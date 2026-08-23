"use client";

import { Menu, Bell } from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({
  onMenuClick,
}: TopbarProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">

      <div className="flex items-center gap-4">

        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <Menu className="h-5 w-5 text-slate-700" />
        </button>

        <div className="hidden md:block">
          <input
            placeholder="Search documents, quizzes, topics..."
            className="w-80 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-[#2F80ED]"
          />
        </div>

      </div>

      <div className="flex items-center gap-4">

        <button className="rounded-lg p-2 hover:bg-slate-100">
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF3FF] font-semibold text-[#2F80ED]">
            H
          </div>

          <span className="hidden text-sm font-medium md:block">
            Hamza
          </span>
        </div>

      </div>

    </header>
  );
}