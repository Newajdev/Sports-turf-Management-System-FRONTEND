"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SheetTitle } from "@/components/ui/sheet";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import UserInfoCell from "../cell/UserInfoCell";

interface DashboardMobileSidebarProps {
  userInfo: any;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardMobileSidebar = ({
  dashboardHome,
  navItems,
  userInfo,
}: DashboardMobileSidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Brand Header */}
      <div className="flex h-16 items-center border-b px-6">
        <Link 
            href={dashboardHome} 
            className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary"
        >
          <div className="rounded-lg bg-primary p-1">
            <Icons.Trophy className="h-6 w-6 text-primary-foreground" />
          </div>
          <span>TurfPro</span>
        </Link>
      </div>

      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-6">
          {navItems.map((section, sectionId) => (
            <div key={sectionId} className="space-y-2">
              {section.title && (
                <h4 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  {section.title}
                </h4>
              )}

              <div className="space-y-1">
                {section.items.map((item, id) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  const Icon = getIconComponent(item.icon);

                  return (
                    <Link
                      href={item.href}
                      key={id}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon 
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                          isActive ? "text-primary-foreground" : "text-muted-foreground/70 group-hover:text-primary"
                        )} 
                      />
                      <span className="flex-1">{item.title}</span>
                       {isActive && (
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground/50 animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {sectionId < navItems.length - 1 && (
                <Separator className="my-4 opacity-50" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Footer */}
      <div className="border-t p-4">
        <div className="rounded-xl border bg-muted/30 p-3">
             <UserInfoCell 
                name={userInfo?.name || "User"} 
                email={userInfo?.email || ""} 
                profilePhoto={userInfo?.image} 
            />
        </div>
      </div>
    </div>
  );
};

export default DashboardMobileSidebar;
