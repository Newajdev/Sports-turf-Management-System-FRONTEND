"use client";

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getFavoriteTurfs, toggleFavoriteTurf } from "@/services/user.services";
import { queryKeys } from "@/lib/queryKeys";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SaveTurfButtonProps {
  turfId: string;
  isLoggedIn: boolean;
  className?: string;
}

export function SaveTurfButton({
  turfId,
  isLoggedIn,
  className,
}: SaveTurfButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isToggling, setIsToggling] = useState(false);

  const { data: favoritesResponse } = useQuery({
    queryKey: queryKeys.playerFavorites(),
    queryFn: getFavoriteTurfs,
    enabled: isLoggedIn,
  });

  const favorites = (favoritesResponse?.data ?? []) as Array<{ id: string }>;
  const isSaved = favorites.some((t) => t.id === turfId);

  useEffect(() => {
    if (!isLoggedIn) return;
    queryClient.prefetchQuery({
      queryKey: queryKeys.playerFavorites(),
      queryFn: getFavoriteTurfs,
    });
  }, [isLoggedIn, queryClient]);

  const handleToggle = async () => {
    if (!isLoggedIn) {
      router.push(`/auth/login?redirect=/book-a-turf/${turfId}`);
      return;
    }

    setIsToggling(true);
    try {
      const res = await toggleFavoriteTurf(turfId);
      if (res.success) {
        const saved = (res.data as { isFavorite?: boolean })?.isFavorite;
        toast.success(saved ? "Saved to favorites" : "Removed from favorites");
        queryClient.invalidateQueries({ queryKey: queryKeys.playerFavorites() });
      } else {
        toast.error(res.message || "Failed to update favorites");
      }
    } catch {
      toast.error("Failed to update favorites");
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn("gap-2", className)}
      disabled={isToggling}
      onClick={handleToggle}
    >
      {isToggling ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart
          className={cn(
            "h-4 w-4",
            isSaved && "fill-red-500 text-red-500",
          )}
        />
      )}
      {isSaved ? "Saved" : "Save turf"}
    </Button>
  );
}
