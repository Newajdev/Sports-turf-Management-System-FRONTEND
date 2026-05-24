"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Clock, Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ITurf } from "@/interface/turf.interface";
import { createCustomTurfSlot } from "@/services/slot.services";
import { createCustomBooking } from "@/services/booking.services";
import { createCustomTurfSlotSchema } from "@/zod/slot.validation";
import { toast } from "sonner";

interface CustomSlotRequestFormProps {
  turf: ITurf;
  isLoggedIn?: boolean;
}

export function CustomSlotRequestForm({
  turf,
  isLoggedIn = false,
}: CustomSlotRequestFormProps) {
  const router = useRouter();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [sportType, setSportType] = useState(turf.sportTypes?.[0]?.title ?? "");
  const [playersCount, setPlayersCount] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      router.push(`/auth/login?redirect=/book-a-turf/${turf.id}`);
      return;
    }

    if (!turf.sportTypes?.length) {
      toast.error("This turf has no sport types configured.");
      return;
    }

    const payload = {
      turfId: turf.id,
      startTime,
      endTime,
      date,
      sportType,
      playersCount,
    };

    if (startTime >= endTime) {
      toast.error("End time must be after start time");
      return;
    }

    const parsed = createCustomTurfSlotSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid request details");
      return;
    }

    setIsSubmitting(true);
    try {
      const slotResponse = await createCustomTurfSlot(parsed.data);
      const customSlot = slotResponse.data as { id: string } | null | undefined;
      if (!slotResponse.success || !customSlot?.id) {
        toast.error(slotResponse.message || "Failed to create custom slot request");
        return;
      }

      const bookingResponse = await createCustomBooking({
        turfId: turf.id,
        customSlotId: customSlot.id,
        date,
      });

      if (!bookingResponse.success) {
        toast.error(bookingResponse.message || "Failed to submit booking request");
        return;
      }

      toast.success("Request sent! Pay from My Bookings once the owner approves.");
      router.push("/dashboard/bookings");
    } catch {
      toast.error("Failed to submit custom slot request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-border/60 rounded-2xl shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Custom time request</CardTitle>
        </div>
        <CardDescription>
          Need a time outside listed slots? Propose your own. The owner will review and you can pay after approval.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isLoggedIn && (
          <Alert className="mb-4">
            <LogIn className="h-4 w-4" />
            <AlertDescription>
              <Button
                variant="link"
                className="h-auto p-0 text-primary"
                onClick={() =>
                  router.push(`/auth/login?redirect=/book-a-turf/${turf.id}`)
                }
              >
                Sign in
              </Button>{" "}
              to submit a custom time request.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="custom-date">Preferred date</Label>
            <Input
              id="custom-date"
              type="date"
              value={date}
              min={format(new Date(), "yyyy-MM-dd")}
              onChange={(e) => setDate(e.target.value)}
              required
              disabled={!isLoggedIn}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start time</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                disabled={!isLoggedIn}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End time</Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                disabled={!isLoggedIn}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Sport</Label>
            <Select
              value={sportType}
              onValueChange={(v) => v && setSportType(v)}
              disabled={!isLoggedIn || !turf.sportTypes?.length}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sport" />
              </SelectTrigger>
              <SelectContent>
                {turf.sportTypes?.map((sport) => (
                  <SelectItem key={sport.id} value={sport.title}>
                    {sport.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="players">Players</Label>
            <Input
              id="players"
              type="number"
              min={1}
              max={50}
              value={playersCount}
              onChange={(e) => setPlayersCount(Number(e.target.value))}
              required
              disabled={!isLoggedIn}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting || !isLoggedIn}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit request"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
