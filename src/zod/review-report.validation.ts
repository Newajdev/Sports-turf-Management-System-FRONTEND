import { z } from "zod";
import { ReportReason } from "../interface/enum.interface";

export const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  bookingId: z.string("Booking ID is required"),
  turfId: z.string("Turf ID is required"),
});

export const updateReviewSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  comment: z.string().optional(),
});

export const createReportSchema = z.object({
  reason: z.nativeEnum(ReportReason),
  description: z.string("Description is required").min(10, "Description must be at least 10 characters long"),
  turfId: z.string("Turf ID is required"),
});

export const ReviewReportValidations = {
  createReviewSchema,
  updateReviewSchema,
  createReportSchema,
};
