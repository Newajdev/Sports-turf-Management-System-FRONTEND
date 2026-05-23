"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ITurf } from "@/interface/turf.interface";
import { createCustomTurfSlot } from "@/services/slot.services";
import { createCustomBooking } from "@/services/booking.services";
import { createCustomTurfSlotSchema } from "@/zod/slot.validation";
import { toast } from "sonner";

interface CustomSlotRequestFormProps {
  turf: ITurf;
  isLoggedIn?: boolean;
}

export function CustomSlotRequestForm({ turf, isLoggedIn = false }: CustomSlotRequestFormProps) {
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

    const payload = {
      turfId: turf.id,
      startTime,
      endTime,
      date,
      sportType,
      playersCount,
    };

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

      toast.success("Custom time request submitted. Awaiting owner approval.");
      router.push("/dashboard/bookings");
    } catch {
      toast.error("Failed to submit custom slot request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-border/50 bg-zinc-950/40 backdrop-blur-xl rounded-3xl">
      <CardHeader>
        <CardTitle className="text-xl uppercase italic">Request Custom Time</CardTitle>
        <CardDescription>
          Propose a custom slot. After the owner approves, you can pay from My Bookings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="custom-date">Date</Label>
            <Input
              id="custom-date"
              type="date"
              value={date}
              min={format(new Date(), "yyyy-MM-dd")}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                placeholder="e.g. 6:00 PM"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input
                id="end-time"
                placeholder="e.g. 8:00 PM"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Sport Type</Label>
            <Select value={sportType} onValueChange={(v) => v && setSportType(v)}>
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
            <Label htmlFor="players">Number of Players</Label>
            <Input
              id="players"
              type="number"
              min={1}
              value={playersCount}
              onChange={(e) => setPlayersCount(Number(e.target.value))}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Custom Request"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
