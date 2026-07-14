"use client";

import { useEffect } from "react";
import { GlobalErrorContent } from "@/components/shared/global-error";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {}, [error]);

  return <GlobalErrorContent error={error} reset={reset} />;
}
