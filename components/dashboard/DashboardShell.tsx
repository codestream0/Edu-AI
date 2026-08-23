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
    <div className="min-h-screen bg-[#F5F9FF]">

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

        {/* Main application */}
        <div className="min-w-0">

          <Topbar
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          />

          <main className="p-6">
            {children}
          </main>

        </div>

      </div>

    </div>
  );
}