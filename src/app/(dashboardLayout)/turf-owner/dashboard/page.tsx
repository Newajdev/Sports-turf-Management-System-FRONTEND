import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getOwnerAnalytics } from "@/services/analytics.services";
import OwnerDashboardContent from "@/components/modules/TurfOwner/Dashboard/OwnerDashboardContent";

export default async function TurfOwnerDashboard() {
    const queryClient = new QueryClient();

    // Prefetching initial data
    await queryClient.prefetchQuery({
        queryKey: ["owner-analytics"],
        queryFn: () => getOwnerAnalytics(),
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">
                    Performance analytics and summaries for your turfs.
                </p>
            </div>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <OwnerDashboardContent />
            </HydrationBoundary>
        </div>
    );
}