"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setAccessToken, logout } from "@/lib/redux/features/auth/authSlice";
import { api } from "@/lib/api";

export function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function restoreSession() {
      try {
        const response = await api.post("/auth/refreshToken");

        const accessToken = response.data.accessToken;

        if (accessToken) {
          dispatch(setAccessToken(accessToken));
        } else {
          dispatch(logout());
        }
      } catch {
        dispatch(logout());
      } finally {
        setInitialized(true);
      }
    }

    restoreSession();
  }, [dispatch]);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">
          Restoring your session...
        </p>
      </div>
    );
  }

  return children;
}