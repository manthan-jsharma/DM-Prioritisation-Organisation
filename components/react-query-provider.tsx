"use client";

import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import EmailList from "./email-list";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export interface EmailListProviderProps {
  category: string;
}
export function EmailListProvider({ category }: EmailListProviderProps) {
  return (
    <ReactQueryProvider>
      <EmailList category={category} />
    </ReactQueryProvider>
  );
}
