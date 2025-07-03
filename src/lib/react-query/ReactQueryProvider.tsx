"use client"; // for app directory

import { ReactNode } from "react";
import { QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

interface Props {
  children: ReactNode;
  dehydratedState?: unknown;
}

export default function ReactQueryProvider({
  children,
  dehydratedState,
}: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
