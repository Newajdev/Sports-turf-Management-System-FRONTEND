import { BookingStatus, PaymentStatus } from "./enum.interface";
import { IBase, IPlayer } from "./user.interface";
import type { ITurf, IReview } from "./turf.interface";
import type { ITurfSlot, ICustomTurfSlot } from "./slot.interface";

export interface IBooking extends IBase {
  date: string; // ISO string representing YYYY-MM-DD
  status: BookingStatus;

  playerId: string;
  player?: IPlayer;

  turfId: string;
  turf?: ITurf;

  turfSlotId?: string | null;
  turfSlot?: ITurfSlot | null;

  customSlotId?: string | null;
  customSlot?: ICustomTurfSlot | null;

  payment?: IPayment;
  review?: IReview;
}

export interface IPayment extends IBase {
  amount: string | number;
  currency: string;
  transactionId: string;
  status: PaymentStatus;

  bookingId: string;
  booking?: IBooking;
}
