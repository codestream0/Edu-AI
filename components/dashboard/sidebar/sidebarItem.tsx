"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
  collapsed?: boolean;
}

export function SidebarItem({
  title,
  href,
  icon: Icon,
  collapsed = false,
}: SidebarItemProps) {

  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      title={collapsed ? title : undefined}
      className={cn(
        "flex items-center rounded-xl py-2.5 text-sm font-medium transition-colors",
        collapsed
          ? "justify-center px-0"
          : "gap-3 px-3",
        isActive
          ? "bg-[#EAF3FF] text-[#2F80ED]"
          : "text-slate-700 hover:bg-slate-100"
      )}
    >
      <Icon className="h-4.5 w-4.5 shrink-0" />

      {!collapsed && (
        <span className="whitespace-nowrap">
          {title}
        </span>
      )}
    </Link>
  );
}