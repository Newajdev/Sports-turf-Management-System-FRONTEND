"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminAnalytics } from "@/services/analytics.services";
import StatsCard from "@/components/shared/StatsCard";
import BookingOverviewChart from "@/components/shared/BookingOverviewChart";
import UserDistributionPieChart from "@/components/shared/UserDistributionPieChart";
import RevenueOverviewLineChart from "@/components/shared/RevenueOverviewLineChart";
import { Skeleton } from "@/components/ui/skeleton";

const AdminDashboardContent = () => {
  const { data: analyticsResponse, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: getAdminAnalytics,
  });

  const stats = analyticsResponse?.data;

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

  const bookingData = stats?.bookings ? Object.entries(stats.bookings).map(([status, count]) => ({
    status: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
    count,
  })) : [];

  const userDistributionData = stats?.users ? [
    { name: "Players", value: stats.users.players },
    { name: "Turf Owners", value: stats.users.owners },
  ] : [];

  // Mock data for the line chart since we don't have time-series revenue from backend
  const revenueLineData = [
    { month: "Jan", revenue: (stats?.revenue || 0) * 0.1 },
    { month: "Feb", revenue: (stats?.revenue || 0) * 0.15 },
    { month: "Mar", revenue: (stats?.revenue || 0) * 0.12 },
    { month: "Apr", revenue: (stats?.revenue || 0) * 0.18 },
    { month: "May", revenue: (stats?.revenue || 0) * 0.2 },
    { month: "Jun", revenue: (stats?.revenue || 0) * 0.25 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={`$${stats?.revenue?.toLocaleString() || 0}`}
          iconName="DollarSign"
          description="Total earnings from bookings"
        />
        <StatsCard
          title="Total Users"
          value={stats?.users?.total || 0}
          iconName="Users"
          description={`${stats?.users?.players || 0} Players, ${stats?.users?.owners || 0} Owners`}
        />
        <StatsCard
          title="Total Turfs"
          value={stats?.turfs?.total || 0}
          iconName="MapPin"
          description="Registered turfs across the platform"
        />
        <StatsCard
          title="Active Bookings"
          value={stats?.bookings?.confirmed || 0}
          iconName="CalendarCheck"
          description="Confirmed bookings in the system"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RevenueOverviewLineChart data={revenueLineData} />
        <UserDistributionPieChart data={userDistributionData} />
      </div>

      <div className="grid gap-4">
        <BookingOverviewChart data={bookingData} />
      </div>
    </div>
  );
};

export default AdminDashboardContent;
