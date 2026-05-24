"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFavoriteTurfs } from "@/services/user.services";
import { queryKeys } from "@/lib/queryKeys";
import TurfCard from "@/components/modules/turfs/turf-card";
import { ITurf } from "@/interface/turf.interface";

export function PlayerFavoritesContent() {
  const { data: response, isLoading } = useQuery({
    queryKey: queryKeys.playerFavorites(),
    queryFn: getFavoriteTurfs,
  });

  const turfs = (response?.data ?? []) as ITurf[];

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!turfs.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center text-muted-foreground">
        <Heart className="h-12 w-12 opacity-30" />
        <p>You haven&apos;t saved any turfs yet.</p>
        <Link href="/book-a-turf">
          <Button>Browse Turfs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {turfs.map((turf) => (
        <TurfCard key={turf.id} turf={turf} />
      ))}
    </div>
  );
}
