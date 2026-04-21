import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMyBookings } from "@/services/booking.services";
import PlayerBookingsTable from "@/components/modules/User/Bookings/PlayerBookingsTable";

export default async function PlayerBookingsPage() {
    const queryClient = new QueryClient();

    // Prefetching initial data
    await queryClient.prefetchQuery({
        queryKey: ["player-bookings", "page=1&limit=10&searchTerm=&"],
        queryFn: () => getMyBookings("page=1&limit=10&searchTerm=&"),
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
                <p className="text-muted-foreground">
                    View and manage your upcoming and past turf bookings.
                </p>
            </div>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <PlayerBookingsTable />
            </HydrationBoundary>
        </div>
    );
}
