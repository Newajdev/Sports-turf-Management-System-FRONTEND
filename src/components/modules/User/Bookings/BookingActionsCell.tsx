"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  XCircle,
  CreditCard,
  MessageSquare,
  Clock,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  cancelBooking,
  makePaymentForCustomSlot,
} from "@/services/booking.services";
import { CreateReviewDialog } from "@/components/modules/User/Reviews/CreateReviewDialog";
import {
  canLeaveReview,
  canPayForBooking,
  canPlayerCancelBooking,
  hasBookingActions,
  isCustomAwaitingApproval,
} from "@/lib/bookingActions";
import type { IBooking } from "./playerBookingsColumns";

interface BookingActionsCellProps {
  booking: IBooking;
}

export function BookingActionsCell({ booking }: BookingActionsCellProps) {
  const queryClient = useQueryClient();
  const [reviewOpen, setReviewOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const awaitingApproval = isCustomAwaitingApproval(booking);
  const showPay = canPayForBooking(booking);
  const showCancel = canPlayerCancelBooking(booking);
  const showReview = canLeaveReview(booking);

  const invalidateBookings = () => {
    queryClient.invalidateQueries({ queryKey: ["player-bookings"] });
    queryClient.invalidateQueries({ queryKey: ["player-analytics"] });
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      const response = await cancelBooking(booking.id);
      if (response.success) {
        toast.success("Booking cancelled successfully.");
        invalidateBookings();
        setCancelOpen(false);
      } else {
        toast.error(response.message || "Failed to cancel booking.");
      }
    } finally {
      setIsCancelling(false);
    }
  };

  const handlePay = async () => {
    setIsPaying(true);
    try {
      const response = await makePaymentForCustomSlot(booking.id);
      if (response.success && response.data?.paymentUrl) {
        toast.success("Redirecting to payment...");
        window.location.href = response.data.paymentUrl;
      } else {
        toast.error(response.message || "Failed to start payment.");
      }
    } finally {
      setIsPaying(false);
    }
  };

  if (!hasBookingActions(booking)) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {awaitingApproval && (
            <DropdownMenuItem disabled className="text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              Awaiting owner approval
            </DropdownMenuItem>
          )}

          {showPay && (
            <DropdownMenuItem
              onClick={handlePay}
              disabled={isPaying}
            >
              {isPaying ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="mr-2 h-4 w-4" />
              )}
              Pay Now
            </DropdownMenuItem>
          )}

          {showReview && (
            <DropdownMenuItem onClick={() => setReviewOpen(true)}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Leave Review
            </DropdownMenuItem>
          )}

          {showCancel && (
            <DropdownMenuItem
              onClick={() => setCancelOpen(true)}
              className="text-destructive"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Booking
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel your booking for {booking.turf?.name}. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isCancelling}>Keep booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleCancel();
              }}
              disabled={isCancelling}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isCancelling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Yes, cancel booking"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CreateReviewDialog
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        bookingId={booking.id}
        turfId={booking.turfId}
        turfName={booking.turf?.name}
      />
    </>
  );
}
