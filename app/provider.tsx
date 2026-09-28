"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import { AuthInitializer } from "@/lib/redux/features/auth/authInitializer";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </Provider>
  );
}