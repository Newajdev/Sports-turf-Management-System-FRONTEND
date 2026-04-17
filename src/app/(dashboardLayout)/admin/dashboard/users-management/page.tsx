import UsersTable from "@/components/modules/Admin/UsersManagement/UsersTable";
import { getAllUsers } from "@/services/admin.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface UsersManagementPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const UsersManagementPage = async ({ searchParams }: UsersManagementPageProps) => {
  const queryClient = new QueryClient();
  const params = await searchParams;
  
  // Convert params object to query string
  const queryString = Object.entries(params)
    .map(([key, value]) => {
        if (Array.isArray(value)) {
            return value.map(v => `${key}=${v}`).join('&');
        }
        return `${key}=${value}`;
    })
    .join('&');

  await queryClient.prefetchQuery({
    queryKey: ["users", queryString],
    queryFn: () => getAllUsers(queryString),
  });

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Users Management</h1>
        <p className="text-muted-foreground">Manage all platform users, their roles, and access status.</p>
      </div>
      
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsersTable />
      </HydrationBoundary>
    </div>
  );
};

export default UsersManagementPage;
