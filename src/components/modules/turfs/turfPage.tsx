/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getTurfs } from "@/app/(commonLayout)/book-a-turf/_actions";
import { useQuery } from "@tanstack/react-query";
import TurfCard from "./turf-card";
import PageHeroSection from "@/components/shared/page-hero-section";
import { Skeleton } from "@/components/ui/skeleton";
import { TurfItem } from "@/interface/turf.interface";

function TurfPage() {
    const { data, isPending, isError } = useQuery({
        queryKey: ["turfs"],
        queryFn: () => getTurfs(),
    });

    const turfs = data?.data || [];
    console.log(turfs)

    return (
      <div className="flex flex-col w-full min-h-screen bg-background">
        <PageHeroSection
          title="Available Turfs"
          description="Browse and book top-tier sports venues for your next match."
          badge="Premium Venues"
        />

        <div className="container mx-auto px-4 md:px-6 py-12">
          {isError ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h2 className="text-2xl font-bold text-red-500 mb-2">
                Failed to load turfs
              </h2>
              <p className="text-muted-foreground">
                Please try again later or check your connection.
              </p>
            </div>
          ) : isPending ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-[2rem]" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : turfs.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground italic">
                  Showing {turfs.length} available venues
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {turfs.map((turf: TurfItem) => (
                  <TurfCard key={turf.id} turf={turf} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-3xl">
              <h2 className="text-xl font-bold mb-2">No turfs found</h2>
              <p className="text-muted-foreground">
                {"We couldn't find any available turfs at the moment."}
              </p>
            </div>
          )}
        </div>
      </div>
    );
}

export default TurfPage;
