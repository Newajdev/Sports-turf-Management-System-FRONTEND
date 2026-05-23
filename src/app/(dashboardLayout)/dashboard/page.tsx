import { getUserInfo } from "@/services/auth.services";
import { PlayerDashboardContent } from "@/components/modules/User/Dashboard/PlayerDashboardContent";
import { redirect } from "next/navigation";
import { defaultDashboardRoute } from "@/lib/authUtils";

export default async function PlayerDashboardPage() {
  const user = await getUserInfo();

  if (!user) {
    redirect("/auth/login");
  }

  if (user.role !== "PLAYER") {
    redirect(defaultDashboardRoute(user.role));
  }

  return <PlayerDashboardContent user={user} />;
}
