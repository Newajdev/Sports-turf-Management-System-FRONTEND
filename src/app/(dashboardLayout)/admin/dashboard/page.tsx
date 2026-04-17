import AdminDashboardContent from "@/components/modules/Admin/AdminDashboardContent";
import { getAdminAnalytics } from "@/services/analytics.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const AdminDashboardPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admin-analytics"],
    queryFn: getAdminAnalytics,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardContent />
    </HydrationBoundary>
  );
};

export default AdminDashboardPage;
