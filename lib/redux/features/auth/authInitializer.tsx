"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const response = await api.post("/auth/refresh-token");

        const accessToken = response.data.accessToken;

        if (accessToken) {
          console.log("access token restored");
          
          dispatch(setAccessToken(accessToken));
        } else {
          console.log("No access token returned. Logging out.");
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error restoring session:", error);
        dispatch(logout());
      } finally {
        if (isMounted) {
          setInitialized(true);
        }
      }
    }

    restoreSession();

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