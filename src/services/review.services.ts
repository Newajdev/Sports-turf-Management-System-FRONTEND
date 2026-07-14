"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { revalidatePath } from "next/cache";

/**
 * Fetch reviews for a specific turf
 */
export async function getTurfReviews(turfId: string, queryString: string = "") {
  try {
    const response = await httpClient.get<any>(
      `/review/turf/${turfId}?${queryString}`,
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while fetching reviews.",
      data: [],
      meta: undefined,
    };
  }
}

/**
 * Fetch reviews shared by the current authenticated player
 */
export async function getMyReviews(queryString: string = "") {
  try {
    const response = await httpClient.get<any>(
      `/review/my-reviews?${queryString}`,
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching your reviews.",
      data: [],
      meta: undefined,
    };
  }
}

/**
 * Player: Create a new review
 */
export async function createReview(payload: any) {
  try {
    const response = await httpClient.post<any>("/review", payload);
    revalidatePath("/dashboard/reviews");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while creating review.",
      data: null,
    };
  }
}

/**
 * Player: Update an existing review
 */
export async function updateReview(id: string, payload: any) {
  try {
    const response = await httpClient.patch<any>(`/review/${id}`, payload);
    revalidatePath("/dashboard/reviews");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while updating review.",
      data: null,
    };
  }
}

/**
 * Player: Delete a review
 */
export async function deleteReview(id: string) {
  try {
    const response = await httpClient.delete<any>(`/review/${id}`);
    revalidatePath("/dashboard/reviews");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while deleting review.",
      data: null,
    };
  }
}
