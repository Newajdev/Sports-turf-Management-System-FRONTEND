"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IAdminAnalytics, IOwnerAnalytics } from "@/types/analytics.type";

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
    console.error("Error fetching owner analytics:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching owner analytics.",
      data: null,
    };
  }
}
