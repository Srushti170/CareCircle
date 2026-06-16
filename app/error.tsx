"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/error-state";

export default function AppError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      actionLabel="Try Again"
      message="A page-level error occurred. Your navigation shell is still safe, and you can retry without restarting the whole website."
      onAction={reset}
      title="This section hit an error"
    />
  );
}
