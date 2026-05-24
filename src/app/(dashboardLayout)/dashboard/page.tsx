import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getUserInfo } from "@/services/auth.services";
import { getPlayerAnalytics } from "@/services/analytics.services";
import { PlayerDashboardContent } from "@/components/modules/User/Dashboard/PlayerDashboardContent";
import { redirect } from "next/navigation";
import { defaultDashboardRoute } from "@/lib/authUtils";
import { queryKeys } from "@/lib/queryKeys";

export default async function PlayerDashboardPage() {
  const user = await getUserInfo();

  if (!user) {
    redirect("/auth/login");
  }

  if (user.role !== "PLAYER") {
    redirect(defaultDashboardRoute(user.role));
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.playerAnalytics(),
    queryFn: getPlayerAnalytics,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlayerDashboardContent user={user} />
    </HydrationBoundary>
  );
}
