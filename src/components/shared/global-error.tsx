"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * GlobalErrorContent renders the "Technical Foul" error UI.
 * This can be used safely within any layout as it does NOT render <html> or <body> tags.
 */
export function GlobalErrorContent({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error for support tracking
    console.error("Critical System Error:", error);
  }, [error]);

  return (
    <div className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden bg-background px-6 py-12 text-center sm:py-24">
      {/* Decorative Background Elements (Red/Danger themed) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
        <div className="h-[500px] w-[500px] rounded-full bg-destructive/30 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-4">
        <div className="mb-8 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10 ring-1 ring-destructive/20 animate-pulse">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
          Technical Foul
        </h1>

        <p className="text-xl font-medium text-muted-foreground mb-8">
          A critical boundary was breached. The system pitch requires a reset.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <button
            onClick={() => reset()}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 px-8 text-base transition-all hover:scale-105 active:scale-95 bg-destructive hover:bg-destructive/90 text-white border-none cursor-pointer"
            )}
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Try to Recover
          </button>

          <button
            onClick={() => window.location.reload()}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 px-8 text-base hover:bg-muted cursor-pointer"
            )}
          >
            Full Pitch Reload
          </button>
        </div>

        <footer className="mt-16 text-xs text-muted-foreground/40 font-mono">
          {error.digest && <span>DIGEST: {error.digest}</span>}
          <p className="mt-2 text-center uppercase tracking-widest opacity-50">
            System Critical Boundary Failure
          </p>
        </footer>
      </div>

      {/* Decorative Accents */}
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full border-2 border-destructive/10 opacity-20" />
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full border-2 border-destructive/10 opacity-20" />
    </div>
  );
}

/**
 * GlobalError is the root error boundary for Next.js.
 * This MUST render <html> and <body> tags because it replaces the entire layout.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <GlobalErrorContent error={error} reset={reset} />
      </body>
    </html>
  );
}
