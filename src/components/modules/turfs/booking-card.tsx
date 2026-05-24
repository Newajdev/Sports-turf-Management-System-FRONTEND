"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, LogIn, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ITurf } from "@/interface/turf.interface";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createBooking } from "@/services/booking.services";
import { getAvailableSlots, IAvailableTurfSlot } from "@/services/slot.services";
import { createBookingSchema } from "@/zod/booking.validation";
import { queryKeys } from "@/lib/queryKeys";
import { toast } from "sonner";
import { TurfStatus } from "@/interface/enum.interface";

interface BookingCardProps {
  turf: ITurf;
  isLoggedIn?: boolean;
}

function formatSlotTime(slot: IAvailableTurfSlot) {
  const start = slot.slot?.startTime ?? "";
  const end = slot.slot?.endTime;
  if (end) return `${start} – ${end}`;
  return start;
}

export function BookingCard({ turf, isLoggedIn = false }: BookingCardProps) {
  const router = useRouter();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = React.useState<IAvailableTurfSlot | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const isBookable = turf.turfStatus === TurfStatus.ACTIVE;
  const dateString = date ? format(date, "yyyy-MM-dd") : "";

  const {
    data: availabilityResponse,
    isLoading: isLoadingSlots,
    isError: slotsError,
    refetch: refetchSlots,
  } = useQuery({
    queryKey: queryKeys.turfAvailability(turf.id, dateString),
    queryFn: () => getAvailableSlots(turf.id, dateString),
    enabled: !!dateString && isBookable,
  });

  const availableSlots = React.useMemo(() => {
    const slots = availabilityResponse?.data ?? [];
    return slots.filter((s) => !s.isBooked);
  }, [availabilityResponse?.data]);

  React.useEffect(() => {
    setSelectedSlot(null);
  }, [dateString]);

  const handleBooking = async () => {
    if (!isLoggedIn) {
      router.push(`/auth/login?redirect=/book-a-turf/${turf.id}`);
      return;
    }

    if (!date || !selectedSlot) return;

    const payload = {
      turfId: turf.id,
      turfSlotId: selectedSlot.id,
      date: dateString,
    };

    const parsed = createBookingSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid booking details");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createBooking(parsed.data);

      if (!response.success) {
        toast.error(response.message || "Failed to create booking");
        return;
      }

      const paymentUrl = (response.data as { paymentUrl?: string })?.paymentUrl;
      if (paymentUrl) {
        toast.success("Redirecting to secure payment...");
        window.location.href = paymentUrl;
        return;
      }

      toast.success("Booking created successfully");
      router.push("/dashboard/bookings");
    } catch {
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slotPrice = selectedSlot
    ? Number(selectedSlot.price) || Number(turf.hourlyRate)
    : null;

  return (
    <Card className="sticky top-24 w-full border-border/60 shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-primary/10 pb-5">
        <div className="flex items-baseline justify-between gap-2">
          <CardTitle className="text-2xl font-bold text-foreground">
            ৳{turf.hourlyRate}
          </CardTitle>
          <span className="text-sm text-muted-foreground">per hour</span>
        </div>
        <CardDescription>
          Select a date and time slot to reserve this venue
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6 space-y-5">
        {!isBookable && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This turf is not accepting bookings right now.
            </AlertDescription>
          </Alert>
        )}

        {!isLoggedIn && (
          <Alert>
            <LogIn className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between gap-2 flex-wrap">
              <span>Sign in to book this turf</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  router.push(`/auth/login?redirect=/book-a-turf/${turf.id}`)
                }
              >
                Log in
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Date</label>
          <Popover>
            <PopoverTrigger>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-11 rounded-xl",
                  !date && "text-muted-foreground",
                )}
                type="button"
                disabled={!isBookable}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {date ? format(date, "EEEE, MMM d, yyyy") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Separator />

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Available slots
          </label>

          {isLoadingSlots ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : slotsError || availabilityResponse?.success === false ? (
            <div className="text-center py-6 space-y-2">
              <p className="text-sm text-muted-foreground">
                Could not load slots. Please try again.
              </p>
              <Button variant="outline" size="sm" onClick={() => refetchSlots()}>
                Retry
              </Button>
            </div>
          ) : availableSlots.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
              {availableSlots.map((ts) => (
                <Button
                  key={ts.id}
                  variant={selectedSlot?.id === ts.id ? "default" : "outline"}
                  className={cn(
                    "h-auto py-3 px-3 flex flex-col items-start gap-0.5 rounded-xl text-left",
                    selectedSlot?.id === ts.id && "ring-2 ring-primary/30",
                  )}
                  onClick={() => setSelectedSlot(ts)}
                  type="button"
                  disabled={!isBookable}
                >
                  <span className="text-sm font-semibold">{formatSlotTime(ts)}</span>
                  <span className="text-xs opacity-80">
                    ৳{ts.price}
                    {ts.slot?.duration ? ` · ${ts.slot.duration} min` : ""}
                  </span>
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8 rounded-xl bg-muted/40">
              No slots available for this date. Try another day or request a custom time below.
            </p>
          )}
        </div>

        {selectedSlot && (
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Your selection</span>
              <Badge variant="secondary" className="text-primary">
                Ready
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {format(date!, "MMM d, yyyy")} · {formatSlotTime(selectedSlot)}
            </p>
            {slotPrice != null && (
              <p className="text-lg font-bold text-primary">Total: ৳{slotPrice}</p>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pb-6 pt-0 px-6 flex-col gap-2">
        <Button
          className="w-full h-12 text-base font-semibold rounded-xl"
          disabled={!isBookable || !date || !selectedSlot || isSubmitting}
          onClick={handleBooking}
          type="button"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : !isLoggedIn ? (
            "Log in to book"
          ) : selectedSlot ? (
            `Book now · ৳${slotPrice}`
          ) : (
            "Select a slot"
          )}
        </Button>
        <p className="text-[11px] text-center text-muted-foreground">
          Free cancellation up to 24 hours before your slot
        </p>
      </CardFooter>
    </Card>
  );
}
