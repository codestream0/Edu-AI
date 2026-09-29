"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "@/lib/redux/store";
import { AuthInitializer } from "@/lib/redux/features/auth/authInitializer";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-sm text-slate-500">
              Loading EDU AI...
            </p>
          </div>
        }
        persistor={persistor}
      >
        <AuthInitializer>
          {children}
        </AuthInitializer>
      </PersistGate>
    </Provider>
  );
}