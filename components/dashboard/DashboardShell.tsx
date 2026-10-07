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
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Main application area */}
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
            onMenuClick={() =>
              setSidebarOpen((prev) => !prev)
            }
          />
        </div>

        {/* Scrollable page content */}
        <main className="h-screen overflow-y-auto pt-20 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}