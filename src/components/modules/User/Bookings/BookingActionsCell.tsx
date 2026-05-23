"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, XCircle, CreditCard, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import {
  cancelBooking,
  makePaymentForCustomSlot,
} from "@/services/booking.services";
import { CustomSlotStatus } from "@/interface/enum.interface";
import { CreateReviewDialog } from "@/components/modules/User/Reviews/CreateReviewDialog";
import type { IBooking } from "./playerBookingsColumns";

interface BookingActionsCellProps {
  booking: IBooking;
}

export function BookingActionsCell({ booking }: BookingActionsCellProps) {
  const queryClient = useQueryClient();
  const [reviewOpen, setReviewOpen] = useState(false);

  const canCancel =
    booking.status === "PENDING" || booking.status === "CONFIRMED";

  const isCustomPendingApproval =
    booking.customSlotId &&
    booking.status === "PENDING" &&
    booking.customSlot?.status === CustomSlotStatus.PENDING;

  const canPayCustom =
    booking.customSlotId &&
    booking.status === "PENDING" &&
    booking.customSlot?.status === CustomSlotStatus.ACCEPTED &&
    booking.paymentStatus !== "PAID";

  const canReview = booking.status === "COMPLETED";

  const invalidateBookings = () => {
    queryClient.invalidateQueries({ queryKey: ["player-bookings"] });
  };

  const handleCancel = async () => {
    const response = await cancelBooking(booking.id);
    if (response.success) {
      toast.success("Booking cancelled successfully.");
      invalidateBookings();
    } else {
      toast.error(response.message || "Failed to cancel booking.");
    }
  };

  const handlePay = async () => {
    const response = await makePaymentForCustomSlot(booking.id);
    if (response.success && response.data?.paymentUrl) {
      toast.success("Redirecting to payment...");
      window.location.href = response.data.paymentUrl;
    } else {
      toast.error(response.message || "Failed to start payment.");
    }
  };

  const hasActions = canCancel || canPayCustom || canReview;

  if (!hasActions && !isCustomPendingApproval) {
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
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {isCustomPendingApproval && (
            <DropdownMenuItem disabled className="text-muted-foreground">
              Awaiting owner approval
            </DropdownMenuItem>
          )}
          {canPayCustom && (
            <DropdownMenuItem onClick={handlePay}>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay Now
            </DropdownMenuItem>
          )}
          {canReview && (
            <DropdownMenuItem onClick={() => setReviewOpen(true)}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Leave Review
            </DropdownMenuItem>
          )}
          {canCancel && (
            <DropdownMenuItem onClick={handleCancel} className="text-destructive">
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Booking
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

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
