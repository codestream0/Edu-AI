"use client";

import { Menu, Bell, Search, LogOut } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";
import { ThemeToggle } from "./themetoggle";
import { logout } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const user = useAppSelector((state) => state.auth.user);
  console.log(user?.fullName || "user");
  const fullName = user?.fullName || "User";
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log("Logout failed:", error);
    } finally {
      dispatch(logout());
      router.replace("/login");
    }
  };
  return (
    <header
      className="
        flex h-20 shrink-0 items-center justify-between
        border-b border-slate-200
        bg-white
        px-3 sm:px-5 lg:px-6
        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <button
          onClick={onMenuClick}
          type="button"
          aria-label="Toggle sidebar"
          className="
            shrink-0
            rounded-lg
            p-2
            text-slate-700
            transition-colors
            hover:bg-slate-100
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden md:block">
          <div className="relative">
            <Search
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="search"
              placeholder="Search documents, quizzes, topics..."
              className="
                h-10
                w-64
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-9
                pr-4
                text-sm
                text-slate-900
                outline-none
                transition-all

                placeholder:text-slate-400

                focus:border-[#2F80ED]
                focus:ring-2
                focus:ring-[#2F80ED]/10

                lg:w-80

                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:border-blue-500
              "
            />
          </div>
        </div>

        <button
          type="button"
          aria-label="Search"
          className="
            rounded-lg
            p-2
            text-slate-600
            hover:bg-slate-100
            md:hidden
            dark:text-slate-300
            dark:hover:bg-slate-800
          "
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-4">
        <ThemeToggle />

        <button
          onClick={handleLogout}
          type="button"
          aria-label="Logout"
          className="
            group
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            text-slate-700
            transition-colors
            hover:bg-red-50
            hover:text-red-500
            dark:text-slate-300
            dark:hover:bg-red-950/40
            dark:hover:text-red-400
          "
        >
          <LogOut className="h-5 w-5" />

          <span
            className="
              pointer-events-none
              absolute
              right-0
              top-full
              z-50
              mt-2
              whitespace-nowrap
              rounded-md
              bg-slate-900
              px-2.5
              py-1.5
              text-xs
              font-medium
              text-white
              opacity-0
              shadow-lg
              transition-opacity
              duration-200
              group-hover:opacity-100
              dark:bg-white
              dark:text-slate-900
            "
          >
            Logout
          </span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
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
            {fullName.split("")[0].toUpperCase()}
          </div>

          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {fullName.split(" ", 2)[0].charAt(0).toUpperCase() +
                fullName.split(" ", 2)[0].slice(1)}
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Student
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
