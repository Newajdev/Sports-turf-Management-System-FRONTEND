"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Bell, CheckCheck, Info, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  deleteNotification,
  getMyNotifications,
  markAllAsRead,
  markAsRead,
} from "@/services/notification.services";
import { queryKeys } from "@/lib/queryKeys";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function PlayerNotificationsList() {
  const queryClient = useQueryClient();

  const { data: notificationsResponse, isLoading } = useQuery({
    queryKey: queryKeys.playerNotifications("all"),
    queryFn: () => getMyNotifications("limit=50"),
  });

  const notifications = (notificationsResponse?.data ?? []) as Array<{
    id: string;
    title: string;
    message: string;
    isRead?: boolean;
    createdAt: string;
  }>;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  const { mutate: readAll, isPending: markingAll } = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: (res) => {
      if (res.success) {
        toast.success("All notifications marked as read");
        invalidate();
      } else {
        toast.error(res.message);
      }
    },
  });

  const { mutate: readOne } = useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onSuccess: () => invalidate(),
  });

  const { mutate: removeOne } = useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Notification deleted");
        invalidate();
      } else {
        toast.error(res.message);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {unreadCount > 0
            ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`
            : "All caught up"}
        </p>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            disabled={markingAll}
            onClick={() => readAll()}
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
            <Bell className="h-10 w-10 opacity-30" />
            <p className="text-sm">No notifications yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={cn(
                "transition-colors",
                !notification.isRead && "border-primary/30 bg-primary/5",
              )}
            >
              <CardContent className="flex gap-3 p-4">
                <div
                  className={cn(
                    "mt-0.5 rounded p-1.5",
                    !notification.isRead ? "bg-primary/10" : "bg-muted",
                  )}
                >
                  <Info
                    className={cn(
                      "h-4 w-4",
                      !notification.isRead
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        !notification.isRead && "text-foreground",
                      )}
                    >
                      {notification.title}
                    </p>
                    <div className="flex shrink-0 gap-1">
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => readOne(notification.id)}
                        >
                          Mark read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => removeOne(notification.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground/70">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
