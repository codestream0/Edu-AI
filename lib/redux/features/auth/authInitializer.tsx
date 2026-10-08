
"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  setAccessToken,
  logout,
} from "@/lib/redux/features/auth/authSlice";
import { refreshApi } from "@/lib/api";

export function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector(
    (state) => state.auth.accessToken,
  );

  const [initialized, setInitialized] = useState(false);

  const restorePromise = useRef<Promise<void> | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      /*
       * If we already have an access token, there is nothing
       * to restore.
       *
       * This is important immediately after login because the
       * login request has already given us a valid access token.
       */
      if (accessToken) {
        return;
      }

      try {
        const response = await refreshApi.post("/auth/refresh-token");

        const newAccessToken = response.data?.accessToken;

        if (!newAccessToken) {
          throw new Error(
            "Refresh response did not contain an access token",
          );
        }

        dispatch(setAccessToken(newAccessToken));
      } catch (error: unknown) {
        /*
         * A 401 here simply means there is no valid refresh
         * session. Do not treat it as a server error.
         */
        if (
          !(
            error &&
            typeof error === "object" &&
            "response" in error &&
            (error as { response?: { status?: number } }).response
              ?.status === 401
          )
        ) {
          console.error("Error restoring session:", error);
        }

        dispatch(logout());
      }
    }

    /*
     * React Strict Mode can execute effects twice during
     * development. Reuse the same restore request.
     */
    restorePromise.current ??= restoreSession();

    void restorePromise.current.finally(() => {
      if (isMounted) {
        setInitialized(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [accessToken, dispatch]);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="h-5 w-5 animate-spin text-slate-500" />
      </div>
    );
  }

  return children;
}

