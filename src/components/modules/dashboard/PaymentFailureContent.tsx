"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle, Calendar, ArrowRight, RefreshCw } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PaymentFailureContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 rounded-full bg-destructive/10 p-4">
        <XCircle className="h-16 w-16 text-destructive" />
      </div>

      <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
        Payment Failed
      </h1>
      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        Your payment could not be processed. No charges were completed. You can
        retry payment from your bookings if the slot is still available.
      </p>

      {bookingId && (
        <p className="mb-6 text-sm text-muted-foreground">
          Booking reference: <span className="font-mono">{bookingId}</span>
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/dashboard/bookings"
          className={cn(
            buttonVariants({ size: "lg" }),
            "px-8 shadow-lg shadow-primary/20",
          )}
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Retry from My Bookings
        </Link>
        <Link
          href="/dashboard/bookings"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "px-8",
          )}
        >
          <Calendar className="mr-2 h-5 w-5" />
          View My Bookings
        </Link>
        <Link
          href="/book-a-turf"
          className={cn(
            buttonVariants({ variant: "ghost", size: "lg" }),
            "px-8",
          )}
        >
          Browse Turfs
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
