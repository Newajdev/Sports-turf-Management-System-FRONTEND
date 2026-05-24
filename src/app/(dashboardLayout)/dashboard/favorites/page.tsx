import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getFavoriteTurfs } from "@/services/user.services";
import { queryKeys } from "@/lib/queryKeys";
import { PlayerFavoritesContent } from "@/components/modules/User/Favorites/PlayerFavoritesContent";

export default async function FavoritesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.playerFavorites(),
    queryFn: getFavoriteTurfs,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Saved Turfs</h1>
        <p className="text-muted-foreground">
          Turfs you have saved for quick access when booking.
        </p>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <PlayerFavoritesContent />
      </HydrationBoundary>
    </div>
  );
}
