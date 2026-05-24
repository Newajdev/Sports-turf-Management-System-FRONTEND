import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllMyCustomSlots } from "@/services/slot.services";
import PlayerCustomSlotsTable from "@/components/modules/User/CustomSlots/PlayerCustomSlotsTable";

export default async function PlayerCustomSlotsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["player-custom-slots", "page=1&limit=10&searchTerm="],
    queryFn: () => getAllMyCustomSlots("page=1&limit=10&searchTerm="),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Slot Requests</h1>
        <p className="text-muted-foreground">
          Manage your custom time slot requests across all turfs.
        </p>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <PlayerCustomSlotsTable />
      </HydrationBoundary>
    </div>
  );
}
