/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiError } from "@/types/api.type";
import { OtpVerificationResponse } from "@/types/auth.type";
import { redirect } from "next/navigation";
import { setTokenInCookies } from "@/lib/tokenUtils";

interface IOtpVerify {
  email: string;
  otp: string;
}


export const VerifyEmailAction = async (payload: IOtpVerify): Promise<OtpVerificationResponse | ApiError> => {
  try {
    const response = await httpClient.post<any>("/auth/verify-email", payload);

    if (response.success === true) {
      const { accessToken, refreshToken } = response.data;
      
      if (accessToken) {
        await setTokenInCookies("accessToken", accessToken);
      }
      if (refreshToken) {
        await setTokenInCookies("refreshToken", refreshToken);
      }

      // Success - Redirect to dashboard.
      redirect("/dashboard");
    }

    return response;
  } catch (error: any) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Verification failed. Please try again.",
    };
  }
};

/**
 * Action to resend verification OTP
 */
export const ResendOTPAction = async (payload: {
  email: string;
}): Promise<any | ApiError> => {
  try {
    const response = await httpClient.post("/auth/resend-verification-otp", payload);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to resend OTP.",
    };
  }
};
