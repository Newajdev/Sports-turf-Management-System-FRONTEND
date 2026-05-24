import { IBase, IPlayer, ITurfOwner } from "./user.interface";
import { TurfStatus, WeeklyOffDay } from "./enum.interface";
import type { ISportType } from "./sport-type.interface";
import type { ITurfSlot } from "./slot.interface";
import type { IBooking } from "./booking.interface";

export interface ITurf extends IBase {
  name: string;
  address: string;
  contactNumber: string[];
  emailAddress?: string | null;
  isVerifiedEmail: boolean;
  description?: string | null;
  images: string[];
  amenities?: string[];
  openingTime: string;
  closingTime: string;
  weeklyOffDays: WeeklyOffDay[];
  isAlwaysOpen: boolean;
  saveCount: number;
  turfStatus: TurfStatus;
  rating: string | number;
  reviewCount: number;
  hourlyRate: string;

  ownerId: string;
  owner?: ITurfOwner;
  savedBy?: IPlayer[];

  sportTypes?: ISportType[];
  turfSlots?: ITurfSlot[];
  bookings?: IBooking[];
  reviews?: IReview[];
}

export interface IReview extends IBase {
  rating: number;
  comment: string;
  playerId: string;
  player?: IPlayer;
  turfId: string;
  turf?: ITurf;
  bookingId?: string;
  booking?: IBooking;
}

export interface ITurfMaintenance extends IBase {
  title: string;
  description?: string | null;
  startDate: string;
  endDate: string;
  turfId: string;
  turf?: ITurf;
}