import { SlotType, CustomSlotStatus } from "./enum.interface";
import { IBase, IPlayer } from "./user.interface";
import { ITurf } from "./turf.interface";
import type { IBooking } from "./booking.interface";

export interface IMasterSlot extends IBase {
  slotType: SlotType;
  startTime: string; // HH:mm AM/PM
  endTime: string;   // HH:mm AM/PM
  duration: number;  // In minutes

  turfSlots?: ITurfSlot[];
}

export interface ITurfSlot extends IBase {
  price: string | number;
  isBooking: boolean;

  turfId: string;
  turf?: ITurf;

  slotId: string;
  slot?: IMasterSlot;

  bookings?: IBooking[];
}

export interface ICustomTurfSlot extends IBase {
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  price: string | number;
  status: CustomSlotStatus;

  playerId: string;
  player?: IPlayer;

  turfId: string;
  turf?: ITurf;

  bookings?: IBooking[];
}
