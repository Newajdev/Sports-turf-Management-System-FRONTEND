"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar, MapPin, Bell, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMyBookings } from "@/services/booking.services";
import { getMyNotifications } from "@/services/notification.services";

interface PlayerDashboardContentProps {
  user: {
    name: string;
    profilePhoto?: string | null;
  };
}

export function PlayerDashboardContent({ user }: PlayerDashboardContentProps) {
  const { data: bookingsResponse } = useQuery({
    queryKey: ["player-bookings", "dashboard"],
    queryFn: () =>
      getMyBookings("limit=3&status=CONFIRMED,PENDING&sort=-date"),
  });

  const { data: notificationsResponse } = useQuery({
    queryKey: ["notifications", "dashboard"],
    queryFn: () => getMyNotifications("limit=50"),
  });

  const upcomingBookings = (bookingsResponse?.data ?? []) as Array<{
    id: string;
    status: string;
    date: string;
    turf?: { name: string };
    turfSlot?: { slot?: { startTime: string } };
    customSlot?: { startTime: string };
  }>;
  const notifications = (notificationsResponse?.data ?? []) as Array<{
    isRead?: boolean;
  }>;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.name?.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your bookings.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Upcoming</CardDescription>
            <CardTitle className="text-2xl">{upcomingBookings.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Active bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1">
              <Bell className="h-3 w-3" /> Notifications
            </CardDescription>
            <CardTitle className="text-2xl">{unreadCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Unread messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Quick action</CardDescription>
            <CardTitle className="text-lg">Book a turf</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/book-a-turf">
              <Button size="sm" className="w-full">
                Browse turfs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {!user.profilePhoto && (
        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-amber-500" />
              <p className="text-sm">Complete your profile by adding a photo.</p>
            </div>
            <Link href="/profile">
              <Button variant="outline" size="sm">
                Go to Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Bookings
          </CardTitle>
          <CardDescription>Your next scheduled sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingBookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="mb-4">No upcoming bookings.</p>
              <Link href="/book-a-turf">
                <Button>Book a Turf</Button>
              </Link>
            </div>
          ) : (
            upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between rounded-lg border border-border/50 p-4"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{booking.turf?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(booking.date), "MMM dd, yyyy")} ·{" "}
                      {booking.turfSlot?.slot?.startTime ||
                        booking.customSlot?.startTime}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">{booking.status}</Badge>
              </div>
            ))
          )}
          {upcomingBookings.length > 0 && (
            <Link href="/dashboard/bookings" className="block text-center">
              <Button variant="link" size="sm">
                View all bookings
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
