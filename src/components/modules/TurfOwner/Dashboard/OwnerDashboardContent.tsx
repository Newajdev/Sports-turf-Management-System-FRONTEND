"use client";

import StatsCard from "@/components/shared/StatsCard";
import { IOwnerAnalytics } from "@/types/analytics.type";
import { useQuery } from "@tanstack/react-query";
import { getOwnerAnalytics } from "@/services/analytics.services";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EMPTY_ANALYTICS: IOwnerAnalytics = {
    revenue: 0,
    totalBookings: 0,
    averageRating: 0,
    turfCount: 0,
};

const OwnerDashboardContent = () => {
    const { data: analyticsResponse, isLoading } = useQuery({
        queryKey: ["owner-analytics"],
        queryFn: () => getOwnerAnalytics(),
    });

    const analytics =
        analyticsResponse?.success === false
            ? EMPTY_ANALYTICS
            : (analyticsResponse?.data ?? EMPTY_ANALYTICS);

    const loadWarning =
        analyticsResponse?.success === false ? analyticsResponse.message : null;

    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {loadWarning && (
                <Alert variant="destructive">
                    <AlertDescription>
                        {loadWarning}. Showing default values until analytics load successfully.
                    </AlertDescription>
                </Alert>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Revenue"
                    value={`৳${analytics.revenue}`}
                    iconName="DollarSign"
                    description="Total earnings from all bookings"
                />
                <StatsCard
                    title="Total Bookings"
                    value={analytics.totalBookings}
                    iconName="CalendarCheck"
                    description="Confirmed and completed bookings"
                />
                <StatsCard
                    title="Average Rating"
                    value={Number(analytics.averageRating ?? 0).toFixed(1)}
                    iconName="Star"
                    description="Overall rating from players"
                />
                <StatsCard
                    title="Active Turfs"
                    value={analytics.turfCount}
                    iconName="MapPin"
                    description="Number of turfs you manage"
                />
            </div>
        </div>
    );
};

export default OwnerDashboardContent;
