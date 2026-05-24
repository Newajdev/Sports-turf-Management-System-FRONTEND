import { PlayerNotificationsList } from "@/components/modules/User/Notifications/PlayerNotificationsList";

export default function PlayerNotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">
          Stay updated on bookings, payments, and account activity.
        </p>
      </div>

      <PlayerNotificationsList />
    </div>
  );
}
