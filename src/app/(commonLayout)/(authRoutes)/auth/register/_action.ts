/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiError } from "@/types/api.type";
import { IRegistrationPayload, registerPlayerZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export interface IRegistrationResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const RegisterAction = async (
  payload: IRegistrationPayload,
): Promise<IRegistrationResponse | ApiError> => {
  const parsedPayload = registerPlayerZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const errorMessages =
      parsedPayload.error.issues[0].message || "Invalid input";
    return {
      success: false,
      message: errorMessages,
    };
  }

  try {
    const response = await httpClient.post<IRegistrationResponse>(
      "/auth/register-player",
      parsedPayload.data,
    );

    const { accessToken, refreshToken, betterAuthToken } = response.data?.data;
    console.log(response.data)
    
        await setTokenInCookies("accessToken", accessToken);
        await setTokenInCookies("refreshToken", refreshToken);
        await setTokenInCookies("better-auth.session_token", betterAuthToken);
    
        redirect("/dashboard")
  } catch (error: any) {
    if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return {
      success: false,
      message: `Registration failed: ${error.message}`,
    };
  }
};
