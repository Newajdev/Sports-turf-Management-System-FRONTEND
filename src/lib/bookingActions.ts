import { CustomSlotStatus, PaymentStatus } from "@/interface/enum.interface";
import type { IBooking } from "@/components/modules/User/Bookings/playerBookingsColumns";

export function resolvePaymentStatus(
  booking: IBooking & { payment?: { status?: string } },
): string | undefined {
  return booking.paymentStatus ?? booking.payment?.status;
}

export function isBookingPaid(booking: IBooking & { payment?: { status?: string } }) {
  return resolvePaymentStatus(booking) === PaymentStatus.PAID;
}

export function isBookingUnpaid(booking: IBooking & { payment?: { status?: string } }) {
  const status = resolvePaymentStatus(booking);
  return !status || status === PaymentStatus.UNPAID || status === PaymentStatus.FAILED;
}

/** Matches backend cancel rule: booking date must be at least 24 hours away. */
export function canPlayerCancelBooking(booking: IBooking): boolean {
  if (booking.status !== "PENDING" && booking.status !== "CONFIRMED") {
    return false;
  }

  const bookingDate = new Date(booking.date);
  const hoursUntil =
    (bookingDate.getTime() - Date.now()) / (1000 * 60 * 60);

  return hoursUntil >= 24;
}

export function isCustomAwaitingApproval(booking: IBooking): boolean {
  return Boolean(
    booking.customSlotId &&
      booking.status === "PENDING" &&
      booking.customSlot?.status === CustomSlotStatus.PENDING,
  );
}

export function canPayForBooking(booking: IBooking & { payment?: { status?: string } }) {
  if (booking.status !== "PENDING" || !isBookingUnpaid(booking)) {
    return false;
  }

  if (booking.customSlotId) {
    return booking.customSlot?.status === CustomSlotStatus.ACCEPTED;
  }

  return Boolean(booking.turfSlotId);
}

export function canLeaveReview(booking: IBooking & { review?: { id?: string } }) {
  return (
    booking.status === "COMPLETED" &&
    isBookingPaid(booking) &&
    !booking.review?.id
  );
}

export function hasBookingActions(booking: IBooking & { review?: { id?: string } }) {
  return (
    isCustomAwaitingApproval(booking) ||
    canPayForBooking(booking) ||
    canPlayerCancelBooking(booking) ||
    canLeaveReview(booking)
  );
}
