import TurfTable from "@/components/modules/Admin/TurfManagement/TurfTable";
import { getAllTurfs } from "@/services/admin.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface TurfManagementPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const TurfManagementPage = async ({ searchParams }: TurfManagementPageProps) => {
  const queryClient = new QueryClient();
  const params = await searchParams;
  
  const queryString = Object.entries(params)
    .map(([key, value]) => {
        if (Array.isArray(value)) {
            return value.map(v => `${key}=${v}`).join('&');
        }
        return `${key}=${value}`;
    })
    .join('&');

  await queryClient.prefetchQuery({
    queryKey: ["admin-turfs", queryString],
    queryFn: () => getAllTurfs(queryString),
  });

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Turf Management</h1>
        <p className="text-muted-foreground">Monitor and manage all turf listings and their operational status.</p>
      </div>
      
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TurfTable />
      </HydrationBoundary>
    </div>
  );
};

export default TurfManagementPage;
