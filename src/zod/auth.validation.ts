import { z } from "zod";

export const registerPlayerZodSchema = z.object({
  name: z.string("Name is required"),
  email: z.string("Email is required").email(),
  password: z.string("Password is required").min(6).max(15).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/, "Password must contain at least one letter and one number"),
  contactNumber: z.string().optional(),
  profilePhoto: z.string().optional(),
});

export type IRegistrationPayload = z.infer<typeof registerPlayerZodSchema>;

export const createTurfOwnerZodSchema = z.object({
  name: z.string("Name is required"),
  email: z.string("Email is required").email(),
  password: z.string("Password is required").min(6).max(15),
  contactNumber: z.string().optional(),
  profilePhoto: z.string().optional(),
});

export type ICreateTurfOwnerPayload = z.infer<typeof createTurfOwnerZodSchema>;

export const loginZodSchema = z.object({
  email: z.string("Email is required").email(),
  password: z.string("Password is required"),
});

export type ILoginPayload = z.infer<typeof loginZodSchema>;


export const changePasswordZodSchema = z.object({
  currentPassword: z.string("Current password is required"),
  newPassword: z.string("New password is required").min(6).max(15).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/, "New password must contain at least one letter and one number"),
});

export type IChangePasswordPayload = z.infer<typeof changePasswordZodSchema>;


export const forgetPasswordZodSchema = z.object({
  email: z.string("Email is required").email(),
});

export type IForgetPasswordPayload = z.infer<typeof forgetPasswordZodSchema>;


export const resetPasswordZodSchema = z.object({
  email: z.string("Email is required").email(),
  otp: z.string("OTP is required").length(6),
  password: z.string("Password is required").min(6).max(15).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/, "Password must contain at least one letter and one number")
});

export type IResetPasswordPayload = z.infer<typeof resetPasswordZodSchema>;


export const AuthValidations = {
  registerPlayerZodSchema,
  createTurfOwnerZodSchema,
  loginZodSchema,
  changePasswordZodSchema,
  forgetPasswordZodSchema,
  resetPasswordZodSchema,
};
