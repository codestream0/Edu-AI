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
    <div className="min-h-screen bg-[#F5F9FF] dark:bg-slate-900">

      <div
        className={`grid min-h-screen transition-all duration-300 ${
          sidebarOpen
            ? "grid-cols-[256px_1fr]"
            : "grid-cols-[72px_1fr]"
        }`}
      >

       
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="min-w-0">

          <Topbar
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          />

          <main className="min-h-[calc(100vh-80px)] p-6">
            {children}
          </main>

        </div>

      </div>

    </div>
  );
}