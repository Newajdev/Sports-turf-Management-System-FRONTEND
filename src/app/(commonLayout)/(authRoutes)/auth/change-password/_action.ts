/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { defaultDashboardRoute } from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiError } from "@/types/api.type";
import { IChangePasswordPayload, changePasswordZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const ChangePasswordAction = async (
  payload: IChangePasswordPayload
): Promise<{ success: boolean; message: string } | ApiError> => {
  const parsedPayload = changePasswordZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const errorMessages = parsedPayload.error.issues[0].message;
    return {
      success: false,
      message: errorMessages,
    };
  }

  try {
    const response = await httpClient.post<any>(
      "/auth/change-password",
      parsedPayload.data,
    );

    const { accessToken, refreshToken, token, user } = response.data;

    if (accessToken) {
      await setTokenInCookies("accessToken", accessToken);
    }
    if (refreshToken) {
      await setTokenInCookies("refreshToken", refreshToken);
    }
    if (token) {
      await setTokenInCookies("better-auth.session_token", token);
    }

    // Redirect to dashboard based on role
    // The user object might be nested or direct depending on the backend response structure
    const role = user?.role || response.data?.role; 
    const targetPath = defaultDashboardRoute(role);
    
    redirect(targetPath);

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

    let errorMessage = `Failed to change password: ${error.message}`;
    if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};
