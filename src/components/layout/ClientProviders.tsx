"use client";

import { ReactNode } from "react";
import { ToastProvider } from "@/context/ToastContext";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <ToastProvider>{children}</ToastProvider>
    </ErrorBoundary>
  );
}
