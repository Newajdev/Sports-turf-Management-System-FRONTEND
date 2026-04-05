import { z } from "zod";
import { UserStatus } from "../interface/enum.interface";

export const updateUserSchema = z.object({
  name: z.string().optional(),
  profilePhoto: z.string().optional(),
  contactNumber: z.string().optional(),
});

export const blockUserSchema = z.object({
  status: z.nativeEnum(UserStatus),
});

export const sportTypeValidationSchema = z.object({
  title: z.string("Title is required"),
});

export const updateSportTypeValidationSchema = z.object({
  title: z.string().optional(),
});

export const SystemValidations = {
  updateUserSchema,
  blockUserSchema,
  sportTypeValidationSchema,
  updateSportTypeValidationSchema,
};
