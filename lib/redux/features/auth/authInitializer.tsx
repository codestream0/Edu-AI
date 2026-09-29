"use client";

import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";

import { useAppDispatch } from "@/lib/redux/hooks";
import {
  setAccessToken,
  logout,
} from "@/lib/redux/features/auth/authSlice";

import { api } from "@/lib/api";
import { Loader } from "lucide-react";

export function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [initialized, setInitialized] = useState(false);
  const restorePromise = useRef<Promise<void> | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const response = await api.post("/auth/refresh-token");

        const accessToken = response.data.accessToken;

        if (accessToken) {
          dispatch(setAccessToken(accessToken));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        // A 401 simply means there is no valid refresh cookie (for example,
        // on a new visitor's first load). Other failures are actionable.
        if (!(error instanceof AxiosError && error.response?.status === 401)) {
          console.error("Error restoring session:", error);
        }
        dispatch(logout());
      }
    }

    // React Strict Mode replays effects in development. Share the in-flight
    // request across that replay while letting the active effect finish UI setup.
    restorePromise.current ??= restoreSession();
    void restorePromise.current.then(() => {
      if (isMounted) setInitialized(true);
    });

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">
          {/* Restoring your session... */}
          <Loader/>
        </p>
      </div>
    );
  }

  return children;
}
