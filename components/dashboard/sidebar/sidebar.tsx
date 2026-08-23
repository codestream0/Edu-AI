"use client";

import Image from "next/image";
import {
  ChevronDown,
  X,
} from "lucide-react";

import {
  mainNavigation,
  secondaryNavigation,
  bottomNavigation,
} from "./sidebar_data";

import { SidebarItem } from "./sidebarItem";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export function Sidebar({
  open,
  onToggle,
}: SidebarProps) {
  return (
    <aside
      className="
        h-screen
        overflow-hidden
        border-r
        border-slate-200
        bg-white
        transition-all
        duration-300

        dark:border-slate-800
        dark:bg-slate-950
      "
    >

      <div className="flex h-20 items-center justify-between px-4">

        <div
          className={`flex items-center ${
            open
              ? "gap-3"
              : "w-full justify-center"
          }`}
        >
          <Image
            src="/logo.png"
            alt="EDU AI Logo"
            width={45}
            height={45}
            className="h-auto w-11.25 shrink-0"
          />

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
            onClick={onToggle}
            className="
              rounded-lg
              p-1.5
              text-slate-500
              hover:bg-slate-100

              dark:text-slate-400
              dark:hover:bg-slate-800
            "
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex h-[calc(100vh-80px)] flex-col px-3">

        <nav className="space-y-1">
          {mainNavigation.map((item) => (
            <SidebarItem
              key={item.href}
              title={item.title}
              href={item.href}
              icon={item.icon}
              collapsed={!open}
            />
          ))}
        </nav>

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
                />
              ))}
            </nav>

          </div>
        )}

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
              />
            ))}
          </nav>

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
                H
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
                  Hamza
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
  );
}