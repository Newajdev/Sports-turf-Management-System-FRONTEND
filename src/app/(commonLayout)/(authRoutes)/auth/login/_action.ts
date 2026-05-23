/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { defaultDashboardRoute, isValidRedirectForRole } from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiError } from "@/types/api.type";
import { ILoginResponse } from "@/types/auth.type";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const LoginAction = async (
  payload: ILoginPayload,
  redirectPath?: string
): Promise<ILoginResponse | ApiError> => {
  const parsedPayload = loginZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const errorMessages =
      parsedPayload.error.issues[0].message;
    return {
      success: false,
      message: errorMessages,
    };
  }
  
  try {
    const response = await httpClient.post<ILoginResponse>(
      "/auth/login",
      parsedPayload.data,
    );

    const { accessToken, refreshToken, betterAuthToken, user } = response.data;
    const { role, emailVerified, needPasswordChange, email } = user;

    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("better-auth.session_token", betterAuthToken);

    if (!emailVerified) {
      redirect(`/auth/verify-email?email=${email}`);
    } else if (needPasswordChange) {
      redirect(`/auth/change-password?email=${email}`);
    } else {
      const targetPath = redirectPath && isValidRedirectForRole(redirectPath, role)
        ? redirectPath
        : defaultDashboardRoute(role);
      redirect(targetPath);
    }

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

    if (error && error.response && error.response.data.message === "Email not verified") {
      redirect(`/auth/verify-email?email=${payload.email}`);
    }
    let errorMessage = `Login failed: ${error.message}`;
    if (error?.response?.status === 500) {
      errorMessage = "Invalid email or password. Please try again.";
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

