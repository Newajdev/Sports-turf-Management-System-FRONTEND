/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiError } from "@/types/api.type";
import { resetPasswordZodSchema } from "@/zod/auth.validation";

/**
 * Action to reset password with OTP
 */
export const ResetPasswordAction = async (payload: {
  email: string;
  otp: string;
  password: string;
}): Promise<any | ApiError> => {
  const parsedPayload = resetPasswordZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0].message,
    };
  }

  try {
    const response = await httpClient.post("/auth/reset-password", parsedPayload.data);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to reset password. Please try again.",
    };
  }
};
