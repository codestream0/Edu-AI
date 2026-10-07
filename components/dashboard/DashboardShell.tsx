"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar/sidebar";
import { Topbar } from "./topbar";

export function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F9FF] dark:bg-slate-900">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      <div
        className={`
          min-h-screen
          transition-all
          duration-300
          ${sidebarOpen ? "ml-64" : "ml-18"}
        `}
      >
        {/* Fixed Topbar */}
        <div
          className={`
            fixed
            top-0
            right-0
            z-30
            h-20
            transition-all
            duration-300
            ${sidebarOpen ? "left-64" : "left-18"}
          `}
        >
          <Topbar
            onMenuClick={() => setSidebarOpen((prev) => !prev)}
          />
        </div>

        {/* Page content */}
        <main className="h-screen overflow-y-auto px-4 pb-6 pt-24 sm:px-6 sm:pt-24">
          {children}
        </main>
      </div>
    </div>
  );
}