"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavSection } from "@/types/dashboard.type";
import { Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";

interface DashboardNavbarProps {
  userInfo: any;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardNavbarContent = ({
  dashboardHome,
  navItems,
  userInfo,
}: DashboardNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSmallerScreen = () => {
      setIsMobile(window.innerWidth < 1024); // Matching common dash breakpoint
    };

    checkSmallerScreen();
    window.addEventListener("resize", checkSmallerScreen);

    return () => {
      window.removeEventListener("resize", checkSmallerScreen);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <Sheet open={isOpen && isMobile} onOpenChange={setIsOpen}>
          <SheetTrigger
            className="lg:hidden"
            render={
              <Button variant="ghost" size="icon" className="hover:bg-muted">
                <Menu className="h-5 w-5 text-muted-foreground" />
              </Button>
            }
          />

          <SheetContent side="left" className="w-[300px] p-0 border-r-0 shadow-2xl">
            <DashboardMobileSidebar
              userInfo={userInfo}
              dashboardHome={dashboardHome}
              navItems={navItems}
            />
          </SheetContent>
        </Sheet>

        {/* Search Bar - Desktop Only */}
        <div className="hidden sm:flex items-center relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="text"
            placeholder="Search platform..."
            className="w-[250px] lg:w-[400px] pl-9 pr-4 bg-muted/40 border-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all rounded-full"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <NotificationDropdown />

        {/* User Account */}
        <div className="flex items-center gap-3 pl-2 border-l border-muted/50 h-8">
            <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-bold leading-none">{userInfo?.name || "User"}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-tight">{userInfo?.role?.replace("_", " ")}</span>
            </div>
            <UserDropdown userInfo={userInfo} />
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbarContent;
