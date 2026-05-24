import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMyReports } from "@/services/report.services";
import PlayerReportsTable from "@/components/modules/User/Reports/PlayerReportsTable";

export default async function PlayerReportsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["player-reports", "page=1&limit=10&searchTerm="],
    queryFn: () => getMyReports("page=1&limit=10&searchTerm="),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">My Reports</h1>
        <p className="text-muted-foreground">
          View turf reports you have submitted for review by administrators.
        </p>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <PlayerReportsTable />
      </HydrationBoundary>
    </div>
  );
}
