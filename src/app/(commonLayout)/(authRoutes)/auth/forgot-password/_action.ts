/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiError } from "@/types/api.type";
import { forgetPasswordZodSchema } from "@/zod/auth.validation";

/**
 * Action to initiate forgot password process
 */
export const ForgotPasswordAction = async (payload: {
  email: string;
}): Promise<any | ApiError> => {
  const parsedPayload = forgetPasswordZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0].message,
    };
  }

  try {
    const response = await httpClient.post("/auth/forgot-password", payload);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send reset code. Please try again.",
    };
  }
};
