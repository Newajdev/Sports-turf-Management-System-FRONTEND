/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiError, ApiResponse } from "@/types/api.type";
import { IRegistrationPayload, registerPlayerZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export interface IRegistrationResponse {
  accessToken: string;
  refreshToken: string;
  betterAuthToken: string;
  user: any;
}

export const RegisterAction = async (
  payload: IRegistrationPayload,
): Promise<ApiResponse<IRegistrationResponse> | ApiError> => {
  const parsedPayload = registerPlayerZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const errorMessages =
      parsedPayload.error.issues[0].message;
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
   
    if (response.success) {


      if (!response.data.user.emailVerified) {
        redirect(`/auth/verify-email?email=${payload.email}`);
      } else {

        const { accessToken, refreshToken, betterAuthToken } = response.data;
        
        await setTokenInCookies("accessToken", accessToken);
        await setTokenInCookies("refreshToken", refreshToken);
        await setTokenInCookies("better-auth.session_token", betterAuthToken);
      }

       
    }

    return response;

  } catch (error: any) {
    if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return {
      success: false,
      message: error.response?.data?.message || (error.message === "Request failed with status code 409" ? "Email already exists" : "Registration failed"),
    };
  }
};
