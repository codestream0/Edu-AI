"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  title: string;
  href: string;
  icon: React.ElementType;
  collapsed?: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  title,
  href,
  icon: Icon,
  collapsed = false,
  onClick,
}: SidebarItemProps) {
  const pathname = usePathname();

  const isActive =
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      title={collapsed ? title : undefined}
      className={`
        group
        flex
        h-11
        items-center
        rounded-xl
        transition-colors
        ${
          collapsed
            ? "justify-center"
            : "gap-3 px-3"
        }
        ${
          isActive
            ? "bg-[#EAF3FF] text-[#2F80ED] dark:bg-blue-950/50 dark:text-blue-400"
            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        }
      `}
    >
      <Icon className="h-5 w-5 shrink-0" />

      {!collapsed && (
        <span className="truncate text-sm font-medium">
          {title}
        </span>
      )}
    </Link>
  );
}