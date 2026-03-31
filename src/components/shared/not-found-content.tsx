"use client";

import Link from "next/link";
import { Home, ArrowLeft, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function NotFoundContent() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-24 text-center sm:py-32">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]" />
      </div>
      
      {/* Grass/Turf Stripes Effect (Subtle) */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(90deg,transparent_49%,var(--border)_50%,transparent_51%)] bg-[length:40px_40px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-primary/10 p-4 ring-1 ring-primary/20 animate-bounce">
            <Trophy className="h-12 w-12 text-primary" />
          </div>
        </div>

        <h1 className="text-[12rem] font-black leading-none tracking-tighter text-primary/10 sm:text-[16rem]">
          404
        </h1>
        
        <div className="-mt-12 sm:-mt-20">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Pitch Out of Bounds
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {`The page you're looking for seems to have been substituted or doesn't exist on this pitch. 
            Let's get you back in the game.`}
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 px-8 text-base transition-transform hover:scale-105"
              )}
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 px-8 text-base cursor-pointer"
              )}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Previous Page
            </button>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full border-2 border-primary/20 opacity-20 sm:h-96 sm:w-96" />
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border-2 border-primary/20 opacity-20 sm:h-96 sm:w-96" />
    </div>
  );
}
