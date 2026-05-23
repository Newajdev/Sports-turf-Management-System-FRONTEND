"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getBookingById } from "@/services/booking.services";
import { IBooking } from "@/interface/booking.interface";
import { format } from "date-fns";

export function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["player-bookings"] });
  }, [queryClient]);

  const { data: bookingResponse, isLoading } = useQuery({
    queryKey: ["booking-receipt", bookingId],
    queryFn: () => getBookingById(bookingId!),
    enabled: !!bookingId,
  });

  const booking = bookingResponse?.data as IBooking | null | undefined;
  const fetchFailed =
    !!bookingId && !isLoading && bookingResponse && !bookingResponse.success;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 rounded-full bg-green-500/10 p-4 animate-bounce">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>

      <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
        Payment Successful!
      </h1>
      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        Your booking has been confirmed and your payment was processed
        successfully. Get ready to hit the pitch!
      </p>

      {!bookingId && (
        <p className="mb-6 text-sm text-muted-foreground">
          Your payment was received. View your bookings for full details.
        </p>
      )}

      {bookingId && isLoading && (
        <div className="mb-6 flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading booking details...
        </div>
      )}

      {fetchFailed && (
        <p className="mb-6 text-sm text-amber-600">
          Payment succeeded, but we could not load booking details yet. Check My
          Bookings in a moment.
        </p>
      )}

      {booking && (
        <div className="mb-8 w-full max-w-md rounded-2xl border border-border/50 bg-card/50 p-6 text-left">
          <h2 className="mb-4 text-lg font-bold">Booking Summary</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Turf</dt>
              <dd className="font-medium">{booking.turf?.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Date</dt>
              <dd className="font-medium">
                {format(new Date(booking.date), "MMM dd, yyyy")}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Status</dt>
              <dd className="font-medium">{booking.status}</dd>
            </div>
          </dl>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/dashboard/bookings"
          className={cn(
            buttonVariants({ size: "lg" }),
            "px-8 shadow-lg shadow-primary/20",
          )}
        >
          <Calendar className="mr-2 h-5 w-5" />
          View My Bookings
        </Link>
        <Link
          href="/book-a-turf"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "px-8",
          )}
        >
          Book Another Turf
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
