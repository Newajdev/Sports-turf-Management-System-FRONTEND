/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";

export async function getHeroState() {
  try {
    const response = await httpClient.get("/analytics/public-state");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching admin analytics.",
      data: null,
    };
  }
}
