import SportTypeTable from "@/components/modules/Admin/SportTypeManagement/SportTypeTable";
import { getAllSportTypes } from "@/services/admin.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const SportTypesManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admin-sport-types"],
    queryFn: getAllSportTypes,
  });

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Sport Types</h1>
                <p className="text-muted-foreground">Manage the sports categories available for turf listings.</p>
            </div>
      </div>
      
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SportTypeTable />
      </HydrationBoundary>
    </div>
  );
};

export default SportTypesManagementPage;
