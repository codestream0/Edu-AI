"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar/sidebar";
import { Topbar } from "./topbar";

export function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F9FF] dark:bg-slate-900">

      {/* Sidebar */}
      <div
        className={`
          shrink-0 transition-all duration-300

          hidden md:block
          ${sidebarOpen ? "md:w-64" : "md:w-[72px]"}
        `}
      >
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed left-0 top-0 z-50 h-screen
          w-64
          transition-transform duration-300
          md:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar
          open={true}
          onToggle={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main application area */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Topbar */}
        <Topbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Page content */}
        <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>

      </div>
    </div>
  );
}