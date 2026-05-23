import { z } from "zod";
import { SlotType, CustomSlotStatus } from "../interface/enum.interface";

export const createMasterSlotSchema = z.object({
  slotType: z.nativeEnum(SlotType),
  startTime: z.string("Start time is required"),
  endTime: z.string("End time is required"),
  duration: z.number().optional(),
  interval: z.number().optional(),
});

export const updateMasterSlotSchema = z.object({
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

export const createTurfSlotSchema = z.object({
  price: z.number().min(0, "Price must be a positive number"),
  isBooking: z.boolean().optional(),
  turfId: z.string("Turf ID is required"),
  slotId: z.string("Master Slot ID is required"),
});

export const createCustomTurfSlotSchema = z.object({
  startTime: z.string("Start time is required"),
  endTime: z.string("End time is required"),
  date: z.string("Date is required"),
  sportType: z.string("Sport type is required"),
  playersCount: z.number().min(1, "At least 1 player is required"),
  turfId: z.string("Turf ID is required"),
});

export const updateTurfSlotSchema = z.object({
  price: z.number().min(0).optional(),
  isBooking: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const SlotValidations = {
  createMasterSlotSchema,
  updateMasterSlotSchema,
  createTurfSlotSchema,
  createCustomTurfSlotSchema,
  updateTurfSlotSchema,
};
