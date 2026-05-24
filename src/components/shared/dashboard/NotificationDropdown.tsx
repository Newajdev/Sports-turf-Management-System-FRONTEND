/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Bell, Info, CheckCheck, Clock } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyNotifications, markAllAsRead, markAsRead } from "@/services/notification.services";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const NotificationDropdown = () => {
  const queryClient = useQueryClient();
  
  const { data: notificationsResponse, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getMyNotifications("limit=5"),
  });

  const notifications = notificationsResponse?.data || [];
  const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  const { mutate: readAll } = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const { mutate: readOne } = useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant={"outline"} size={"icon"} className="rounded-full relative hover:bg-muted transition-colors">
            <Bell className="h-6 w-6 text-muted-foreground" />
            {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground border-2 border-background">
                    {unreadCount > 9 ? "9+" : unreadCount}
                </span>
            )}
          </Button>
        }
      />

      <DropdownMenuContent align={"end"} className="w-80 p-2 shadow-premium-hover border-none">
        <DropdownMenuGroup className="flex items-center justify-between p-2">
          <DropdownMenuLabel className="font-bold p-0 text-sm">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-[10px] font-semibold text-primary px-2 hover:bg-primary/5"
                onClick={() => readAll()}
            >
                <CheckCheck className="mr-1 h-3 w-3" /> Mark all read
            </Button>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-muted/50" />
        
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="p-8 text-center text-xs text-muted-foreground">Loading notifications...</div>
          ) : notifications.length > 0 ? (
            notifications.map((notification: any) => (
              <DropdownMenuItem 
                key={notification.id}
                className={cn(
                    "flex flex-col items-start gap-1 p-3 rounded-md transition-colors cursor-pointer mb-1",
                    !notification.isRead ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted"
                )}
                onClick={() => !notification.isRead && readOne(notification.id)}
              >
                <div className="flex items-center gap-2 w-full">
                    <div className={cn("p-1 rounded", !notification.isRead ? "bg-primary/10" : "bg-muted")}>
                        <Info className={cn("h-3 w-3", !notification.isRead ? "text-primary" : "text-muted-foreground")} />
                    </div>
                    <span className={cn("text-xs font-semibold truncate", !notification.isRead ? "text-foreground" : "text-muted-foreground")}>
                        {notification.title}
                    </span>
                    {!notification.isRead && (
                        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">
                  {notification.message}
                </p>
                <div className="flex items-center gap-1 mt-1 text-[9px] text-muted-foreground/60">
                    <Clock className="h-2.5 w-2.5" />
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-muted-foreground flex flex-col items-center gap-2">
                <Bell className="h-8 w-8 text-muted/30" />
                No new notifications
            </div>
          )}
        </div>

        <DropdownMenuSeparator className="bg-muted/50" />
        <div className="p-1">
            <Link href="/dashboard/notifications" className="block">
              <Button
                variant="ghost"
                className="w-full h-8 text-xs font-semibold text-primary hover:bg-primary/5 hover:text-primary transition-colors"
              >
                View all notifications
              </Button>
            </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
