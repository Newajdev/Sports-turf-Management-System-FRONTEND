import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMyReviews } from "@/services/review.services";
import PlayerReviewsTable from "@/components/modules/User/Reviews/PlayerReviewsTable";

export default async function PlayerReviewsPage() {
    const queryClient = new QueryClient();

    // Prefetching initial data
    await queryClient.prefetchQuery({
        queryKey: ["player-reviews", "page=1&limit=10&searchTerm="],
        queryFn: () => getMyReviews("page=1&limit=10&searchTerm="),
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">My Reviews</h1>
                <p className="text-muted-foreground">
                    Manage the reviews you've shared for turfs you've visited.
                </p>
            </div>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <PlayerReviewsTable />
            </HydrationBoundary>
        </div>
    );
}
