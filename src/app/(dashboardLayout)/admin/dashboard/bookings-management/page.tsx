import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllBookings } from "@/services/admin.services";
import BookingsTable from "@/components/modules/Admin/BookingsManagement/BookingsTable";

export default async function BookingsManagementPage() {
    const queryClient = new QueryClient();

    // Prefetching initial data
    await queryClient.prefetchQuery({
        queryKey: ["admin-bookings", "page=1&limit=10&searchTerm=&"],
        queryFn: () => getAllBookings("page=1&limit=10&searchTerm=&"),
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Bookings Management</h1>
                <p className="text-muted-foreground">
                    Monitor and oversee all platform bookings and schedules.
                </p>
            </div>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <BookingsTable />
            </HydrationBoundary>
        </div>
    );
}
