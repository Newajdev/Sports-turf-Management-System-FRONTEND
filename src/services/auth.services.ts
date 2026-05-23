"use server";

import { setTokenInCookies } from "@/lib/tokenUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { cookies } from "next/headers";

const BASE_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getNewTokensWithRefreshToken(
  refreshToken: string,
): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    const cookieHeader = [
      `refreshToken=${refreshToken}`,
      sessionToken ? `better-auth.session_token=${sessionToken}` : null,
    ]
      .filter(Boolean)
      .join("; ");

    const result = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });

    if (!result.ok) {
      return false;
    }

    const { data } = await result.json();

    const { accessToken, refreshToken: newRefreshToken, sessionToken: newSessionToken } =
      data;

    if (accessToken) {
      await setTokenInCookies("accessToken", accessToken);
    }

    if (newRefreshToken) {
      await setTokenInCookies("refreshToken", newRefreshToken);
    }

    if (newSessionToken) {
      await setTokenInCookies(
        "better-auth.session_token",
        newSessionToken,
        24 * 60 * 60,
      );
    }

    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

export async function getUserInfo() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!accessToken) {
      return null;
    }

    const result = await fetch(`${BASE_API_URL}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; better-auth.session_token=${sessionToken}`,
      },
    });

    if (!result.ok) {
      console.error("Failed to fetch user info:", result.status, result.statusText);
      return null;
    }

    const { data } = await result.json();

    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}

export async function logoutUser() {
  try {
    await httpClient.post("/auth/logout", {});
  } catch (error) {
    console.error("Error calling logout API:", error);
  }

  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("better-auth.session_token");
}
