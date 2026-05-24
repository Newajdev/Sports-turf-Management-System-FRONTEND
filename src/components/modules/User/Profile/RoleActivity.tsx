"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarRange, LayoutDashboard, FileText, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

interface RoleActivityProps {
  user: any;
}

const RoleActivity = ({ user }: RoleActivityProps) => {
  const isPlayer = user.role === "PLAYER";
  const isOwner = user.role === "TURF_OWNER";
  const isAdmin = user.role === "SYSTEM_ADMIN";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Stats / Overview */}
        <Card className="border-none shadow-premium-subtle bg-card/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription aria-live="polite">
                Summary of your latest interactions on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex flex-col items-center justify-center gap-3 text-muted-foreground text-sm border-t border-border/20 mt-4">
            {isPlayer ? (
              <>
                <p>View your bookings, reviews, and notifications from the dashboard.</p>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Go to Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <p className="italic">Activity tracking coming soon in the next update.</p>
            )}
          </CardContent>
        </Card>

        {/* Shortcuts */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Shortcuts</h3>
            <p className="text-sm text-muted-foreground">Quick access to your core management tools.</p>
          </div>

          <div className="grid gap-4">
             {isPlayer && (
                 <Link href="/dashboard/bookings">
                    <Button variant="outline" className="w-full justify-between h-14 group hover:border-primary/50 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-md">
                                <CalendarRange className="h-5 w-5 text-blue-500" />
                            </div>
                            <div className="text-left">
                                <div className="font-semibold text-sm">My Bookings</div>
                                <div className="text-[10px] text-muted-foreground">Manage your turf schedules</div>
                            </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Button>
                 </Link>
             )}

             {isOwner && (
                 <Link href="/turf-owner/dashboard/my-turf">
                    <Button variant="outline" className="w-full justify-between h-14 group hover:border-primary/50 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/10 rounded-md">
                                <LayoutDashboard className="h-5 w-5 text-emerald-500" />
                            </div>
                            <div className="text-left">
                                <div className="font-semibold text-sm">Turf Management</div>
                                <div className="text-[10px] text-muted-foreground">Monitor availability and sales</div>
                            </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Button>
                 </Link>
             )}

             {isAdmin && (
                 <Link href="/admin/dashboard/reports-management">
                    <Button variant="outline" className="w-full justify-between h-14 group hover:border-primary/50 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/10 rounded-md">
                                <FileText className="h-5 w-5 text-purple-500" />
                            </div>
                            <div className="text-left">
                                <div className="font-semibold text-sm">System Reports</div>
                                <div className="text-[10px] text-muted-foreground">Audit platform-wide activities</div>
                            </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Button>
                 </Link>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleActivity;
