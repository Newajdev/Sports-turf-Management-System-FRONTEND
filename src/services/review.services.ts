"use server";

import { httpClient } from "@/lib/axios/httpClient";

/**
 * Fetch reviews for a specific turf
 */
export async function getTurfReviews(turfId: string, queryString: string = "") {
  try {
    const response = await httpClient.get<any>(`/review/turf/${turfId}?${queryString}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching turf reviews:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching reviews.",
      data: [],
    };
  }
}

/**
 * Fetch reviews shared by the current authenticated player
 */
export async function getMyReviews(queryString: string = "") {
  try {
    const response = await httpClient.get<any>(`/review/my-reviews?${queryString}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching my reviews:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching your reviews.",
      data: [],
    };
  }
}
