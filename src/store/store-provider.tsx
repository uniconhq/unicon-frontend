"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import qs from "qs";

import { client } from "@/client";

import { UserStoreProvider } from "@/store/user/user-store-provider";

export function StoreProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  client.setConfig({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false });
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <UserStoreProvider>{children}</UserStoreProvider>
    </QueryClientProvider>
  );
}
