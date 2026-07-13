"use client";

import StatsCard from "@/components/shared/StatsCard";
import { IOwnerAnalytics } from "@/types/analytics.type";
import { useQuery } from "@tanstack/react-query";
import { getOwnerAnalytics } from "@/services/analytics.services";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import UserDistributionPieChart from "@/components/shared/UserDistributionPieChart";
import RevenueOverviewLineChart from "@/components/shared/RevenueOverviewLineChart";

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
            <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-32 w-full rounded-xl" />
                    ))}
                </div>
                <Skeleton className="h-[400px] w-full rounded-xl" />
            </div>
        );
    }

    // Mock data since owner analytics only gives total values currently
    const revenueLineData = [
        { month: "Jan", revenue: (analytics.revenue || 0) * 0.1 },
        { month: "Feb", revenue: (analytics.revenue || 0) * 0.15 },
        { month: "Mar", revenue: (analytics.revenue || 0) * 0.12 },
        { month: "Apr", revenue: (analytics.revenue || 0) * 0.18 },
        { month: "May", revenue: (analytics.revenue || 0) * 0.2 },
        { month: "Jun", revenue: (analytics.revenue || 0) * 0.25 },
    ];

    const bookingDistributionData = [
        { name: "Confirmed", value: Math.floor(analytics.totalBookings * 0.7) || 7 },
        { name: "Pending", value: Math.floor(analytics.totalBookings * 0.2) || 2 },
        { name: "Cancelled", value: Math.floor(analytics.totalBookings * 0.1) || 1 },
    ];

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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <RevenueOverviewLineChart data={revenueLineData} />
                {/* Reusing UserDistributionPieChart component but passing bookings data */}
                <UserDistributionPieChart data={bookingDistributionData} />
            </div>
        </div>
    );
};

export default OwnerDashboardContent;
