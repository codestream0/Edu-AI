import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import { store } from "@/lib/redux/store";

import {
  setAccessToken,
  logout,
} from "@/lib/redux/features/auth/authSlice";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Main Axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Separate instance for refreshing tokens.
// This prevents the refresh request from triggering the same interceptors.
const refreshApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Track whether a refresh is already in progress.
let refreshPromise: Promise<string> | null = null;

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = store.getState().auth.accessToken;

    if (accessToken) {
      config.headers.set(
        "Authorization",
        `Bearer ${accessToken}`
      );
    }

    return config;
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & {
          _retry?: boolean;
        })
      | undefined;

    // Only handle unauthorized responses.
    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/signup") ||
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh-token") ||
      originalRequest.url?.includes("/auth/logout")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // If another request is already refreshing,
      // wait for that same refresh operation.
      if (!refreshPromise) {
        refreshPromise = refreshApi
          .post("/auth/refresh-token")
          .then((response) => {
            const newAccessToken =
              response.data.accessToken;

            if (!newAccessToken) {
              throw new Error(
                "Refresh response did not contain an access token"
              );
            }

            store.dispatch(
              setAccessToken(newAccessToken)
            );

            return newAccessToken as string;
          })
          .catch((refreshError) => {
            store.dispatch(logout());
            return Promise.reject(refreshError);
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;

      // Retry the original request with the new token.
      originalRequest.headers.set(
        "Authorization",
        `Bearer ${newAccessToken}`
      );

      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);