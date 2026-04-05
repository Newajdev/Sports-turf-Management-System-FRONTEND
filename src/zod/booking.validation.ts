import { z } from "zod";
import { BookingStatus } from "../interface/enum.interface";

export const createBookingSchema = z
  .object({
    date: z.string("Date is required"),
    turfId: z.string("Turf ID is required"),
    turfSlotId: z.string().optional(),
    customSlotId: z.string().optional(),
  })
  .refine((data) => data.turfSlotId || data.customSlotId, {
    message: "Either turfSlotId or customSlotId must be provided",
    path: ["turfSlotId"],
  });

export const updateBookingStatusSchema = z.object({
  status: z.nativeEnum(BookingStatus),
});

export const BookingValidations = {
  createBookingSchema,
  updateBookingStatusSchema,
};
