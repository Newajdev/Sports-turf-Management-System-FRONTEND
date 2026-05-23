import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getTurfBookings } from "@/services/booking.services";
import { getMyTurf } from "@/services/turf.services";
import OwnerBookingsTable from "@/components/modules/TurfOwner/Bookings/OwnerBookingsTable";
import { redirect } from "next/navigation";

export default async function OwnerBookingsPage() {
    const turf = await getMyTurf() as any;
    
    if (!turf) {
        redirect("/turf-owner/dashboard/my-turf");
    }

    const queryClient = new QueryClient();

    // Prefetching initial data
    await queryClient.prefetchQuery({
        queryKey: ["owner-bookings", turf.id, "page=1&limit=10&searchTerm=&"],
        queryFn: () => getTurfBookings(turf.id, "page=1&limit=10&searchTerm=&"),
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Turf Bookings</h1>
                <p className="text-muted-foreground">
                    Manage and track all bookings for {turf.name}.
                </p>
            </div>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <OwnerBookingsTable turfId={turf.id} />
            </HydrationBoundary>
        </div>
    );
}
