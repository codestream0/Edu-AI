import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistReducer,
  persistStore,
} from "redux-persist";

import authReducer from "./features/auth/authSlice";

// redux-persist's default web storage checks localStorage as soon as this
// module is imported. In Next.js that also happens during server rendering,
// where it selects a no-op adapter for the lifetime of the module.
const storage = {
  getItem(key: string) {
    return Promise.resolve(
      typeof window === "undefined" ? null : window.localStorage.getItem(key)
    );
  },
  setItem(key: string, value: string) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
    }
    return Promise.resolve(value);
  },
  removeItem(key: string) {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
    return Promise.resolve();
  },
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "edu-ai",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
