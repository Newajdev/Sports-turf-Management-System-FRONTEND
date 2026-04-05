/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiError } from "@/types/api.type";
import { ILoginResponse } from "@/types/auth.type";
import { ILoginPayload, loginZodSchema,  } from "@/zod/auth.validation";
import { redirect } from "next/navigation";


export const LoginAction = async (
  payload: ILoginPayload,
): Promise<ILoginResponse | ApiError> => {
  const parsedPayload = loginZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const errorMessages =
      parsedPayload.error.issues[0].message || "Invalid input";
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
      const { accessToken, refreshToken, token } = response.data;

      await setTokenInCookies("accessToken", accessToken);
      await setTokenInCookies("refreshToken", refreshToken);
      await setTokenInCookies("better-auth.session_token", token);
      
    redirect("/dashboard");
  } catch (error: any) {
    return {
      success: false,
      message: `Login failed: ${error.message}`,
    };
  }
};