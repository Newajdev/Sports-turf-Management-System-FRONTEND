import ReportsTable from "@/components/modules/Admin/ReportManagement/ReportsTable";
import { getAllReports } from "@/services/admin.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const ReportsManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admin-reports"],
    queryFn: () => getAllReports(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Report Management</h1>
          <p className="text-muted-foreground">
            Monitor and resolve reports submitted by players regarding turfs or other content.
          </p>
        </div>
      </div>
      
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ReportsTable />
      </HydrationBoundary>
    </div>
  );
};

export default ReportsManagementPage;
