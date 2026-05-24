/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  IAdminAnalytics,
  IOwnerAnalytics,
  IPlayerAnalytics,
} from "@/types/analytics.type";

export async function getAdminAnalytics() {
  try {
    const response = await httpClient.get<IAdminAnalytics>("/analytics/admin");
    return response;
  } catch (error: any) {
    console.error("Error fetching admin analytics:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching admin analytics.",
      data: null,
    };
  }
}

export async function getOwnerAnalytics() {
  try {
    const response = await httpClient.get<IOwnerAnalytics>("/analytics/owner");
    return response;
  } catch (error: any) {
    const apiMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred while fetching owner analytics.";

    console.error("Error fetching owner analytics:", apiMessage);

    return {
      success: false,
      message: apiMessage,
      data: null,
    };
  }
}

export async function getPlayerAnalytics() {
  try {
    const response = await httpClient.get<IPlayerAnalytics>("/analytics/player");
    return response;
  } catch (error: unknown) {
    const apiMessage =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ||
      (error as Error)?.message ||
      "An error occurred while fetching player analytics.";

    console.error("Error fetching player analytics:", apiMessage);

    return {
      success: false,
      message: apiMessage,
      data: null,
    };
  }
}
