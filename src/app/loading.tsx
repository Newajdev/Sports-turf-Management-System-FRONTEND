"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function GlobalLoading() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Skeleton className="h-8 w-32" />
    </div>
  );
}
