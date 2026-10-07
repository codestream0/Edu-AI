"use client";

import Image from "next/image";
import { ChevronDown, GraduationCap, X } from "lucide-react";

import {
  mainNavigation,
  secondaryNavigation,
  bottomNavigation,
} from "./sidebar_data";
import { SidebarItem } from "./sidebarItem";

import { useAppSelector } from "@/lib/redux/hooks";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export function Sidebar({ open, onToggle }: SidebarProps) {
  const user = useAppSelector((state) => state.auth.user);

  const fullName = user?.fullName || "User";

  const handleNavigation = () => {
    // Always collapse after navigating
    if (open) {
      onToggle();
    }
  };

  return (
    <>
      {/* Overlay when sidebar is expanded */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={onToggle}
        />
      )}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          h-screen
          overflow-hidden
          border-r
          border-slate-200
          bg-white
          transition-all
          duration-300
          dark:border-slate-800
          dark:bg-slate-950

          ${open ? "w-64" : "w-[72px]"}
        `}
      >
        {/* Header */}
        <div
          className={`
            flex
            h-20
            items-center
            border-b
            border-slate-100
            dark:border-slate-800
            ${open ? "justify-between px-4" : "justify-center"}
          `}
        >
          <div
            className={`
              flex
              items-center
              ${open ? "gap-3" : "justify-center"}
            `}
          >
            <button
              type="button"
              onClick={onToggle}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-600"
              aria-label={open ? "Close sidebar" : "Open sidebar"}
            >
              <GraduationCap size={27} />
            </button>

            {open && (
              <span
                className="
                  whitespace-nowrap
                  text-lg
                  font-bold
                  text-[#0F172A]
                  dark:text-slate-100
                "
              >
                EDU AI
              </span>
            )}
          </div>

          {open && (
            <button
              type="button"
              onClick={onToggle}
              className="
                rounded-lg
                p-1.5
                text-slate-500
                transition
                hover:bg-slate-100
                dark:text-slate-400
                dark:hover:bg-slate-800
              "
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex h-[calc(100vh-80px)] flex-col px-3">
          {/* Main navigation */}
          <nav className="space-y-1">
            {mainNavigation.map((item) => (
              <SidebarItem
                key={item.href}
                title={item.title}
                href={item.href}
                icon={item.icon}
                collapsed={!open}
                onClick={handleNavigation}
              />
            ))}
          </nav>

          {/* Library */}
          {open && (
            <div className="mt-8">
              <div
                className="
                  mb-2
                  px-3
                  text-xs
                  font-medium
                  uppercase
                  tracking-wide
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Library
              </div>

              <nav className="space-y-1">
                {secondaryNavigation.map((item) => (
                  <SidebarItem
                    key={item.href}
                    title={item.title}
                    href={item.href}
                    icon={item.icon}
                    collapsed={!open}
                    onClick={handleNavigation}
                  />
                ))}
              </nav>
            </div>
          )}

          {/* Bottom section */}
          <div className="mt-auto pb-4">
            <div
              className="
                mb-3
                border-t
                border-slate-200
                dark:border-slate-800
              "
            />

            <nav className="space-y-1">
              {bottomNavigation.map((item) => (
                <SidebarItem
                  key={item.href}
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                  collapsed={!open}
                  onClick={handleNavigation}
                />
              ))}
            </nav>

            {/* User profile */}
            {open && (
              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  p-3
                  hover:bg-slate-50
                  dark:hover:bg-slate-900
                "
              >
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
                  {fullName.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="
                      truncate
                      text-sm
                      font-semibold
                      text-slate-900
                      dark:text-slate-100
                    "
                  >
                    {fullName
                      .split(" ", 2)[0]
                      .charAt(0)
                      .toUpperCase() +
                      fullName.split(" ", 2)[0].slice(1)}
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Student
                  </p>
                </div>

                <ChevronDown
                  className="
                    h-4
                    w-4
                    text-slate-400
                    dark:text-slate-500
                  "
                />
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}