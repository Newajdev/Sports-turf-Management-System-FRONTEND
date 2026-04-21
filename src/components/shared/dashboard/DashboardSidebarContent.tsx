"use client";

import { NavSection } from "@/types/dashboard.type";
import { UserRole } from "@/lib/authUtils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getIconComponent } from "@/lib/iconMapper";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserInfoCell from "../cell/UserInfoCell";

interface DashboardSidebarContentProps {
  userInfo: any;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardSidebarContent = ({ userInfo, navItems, dashboardHome }: DashboardSidebarContentProps) => {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r bg-background lg:flex lg:w-72 lg:flex-col shadow-premium-subtle">
      {/* Brand Header */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
          <div className="rounded-lg bg-primary p-1">
            <Icons.Trophy className="h-6 w-6 text-primary-foreground" />
          </div>
          <span>TurfPro</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-6">
          {navItems.map((section, idx) => (
            <div key={idx} className="space-y-2">
              {section.title && (
                <h4 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  {section.title}
                </h4>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = getIconComponent(item.icon);
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {Icon && (
                        <Icon 
                          className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                            isActive ? "text-primary-foreground" : "text-muted-foreground/70 group-hover:text-primary"
                          )} 
                        />
                      )}
                      <span>{item.title}</span>
                      {isActive && (
                        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground/50 animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* User Footer */}
      <div className="border-t p-4">
        <div className="rounded-xl border bg-muted/30 p-3 transition-colors hover:bg-muted/50">
             <UserInfoCell 
                name={userInfo?.name || "User"} 
                email={userInfo?.email || ""} 
                profilePhoto={userInfo?.image} 
            />
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebarContent;
