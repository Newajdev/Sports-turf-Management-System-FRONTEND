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
import { Bell, Info } from "lucide-react";

const NotificationDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant={"outline"} size={"icon"} className="rounded-full relative hover:bg-muted transition-colors">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </Button>
        }
      />

      <DropdownMenuContent align={"end"} className="w-80 p-2 shadow-premium-hover border-none">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-bold p-2">Notifications</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-muted/50" />
        
        <div className="max-h-[300px] overflow-y-auto">
          <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 rounded-md hover:bg-muted transition-colors">
            <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1 rounded">
                    <Info className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm font-semibold">Welcome to TurfPro!</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Start by exploring the analytics dashboard to see your platform performance.
            </p>
            <span className="text-[10px] text-muted-foreground/60 mt-1">Just now</span>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="bg-muted/50" />
        <div className="p-2 text-center">
            <button className="text-xs font-semibold text-primary hover:underline">
                View all notifications
            </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
