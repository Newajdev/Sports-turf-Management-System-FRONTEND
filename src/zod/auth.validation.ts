import { z } from "zod";

export const registerPlayerSchema = z.object({
  name: z.string("Name is required"),
  email: z.string("Email is required").email(),
  password: z.string("Password is required").min(6).max(15).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/, "Password must contain at least one letter and one number"),
  contactNumber: z.string().optional(),
  profilePhoto: z.string().optional(),
});

export type IRegistrationPayload = z.infer<typeof registerPlayerSchema>;

export const createTurfOwnerSchema = z.object({
  name: z.string("Name is required"),
  email: z.string("Email is required").email(),
  password: z.string("Password is required").min(6).max(15),
  contactNumber: z.string().optional(),
  profilePhoto: z.string().optional(),
});

export type ICreateTurfOwnerPayload = z.infer<typeof createTurfOwnerSchema>;

export const loginSchema = z.object({
  email: z.string("Email is required").email(),
  password: z.string("Password is required"),
});

export type ILoginPayload = z.infer<typeof loginSchema>;


export const changePasswordSchema = z.object({
  currentPassword: z.string("Current password is required"),
  newPassword: z.string("New password is required").min(6).max(15).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/, "New password must contain at least one letter and one number"),
});

export type IChangePasswordPayload = z.infer<typeof changePasswordSchema>;


export const forgetPasswordSchema = z.object({
  email: z.string("Email is required").email(),
});

export type IForgetPasswordPayload = z.infer<typeof forgetPasswordSchema>;


export const resetPasswordSchema = z.object({
  email: z.string("Email is required").email(),
  otp: z.string("OTP is required").length(6),
  password: z.string("Password is required").min(6).max(15).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/, "Password must contain at least one letter and one number")
});

export type IResetPasswordPayload = z.infer<typeof resetPasswordSchema>;


export const AuthValidations = {
  registerPlayerSchema,
  createTurfOwnerSchema,
  loginSchema,
  changePasswordSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
};
