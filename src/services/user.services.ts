/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";

export async function getMyProfile() {
  try {
    const response = await httpClient.get<any>("/user/me");
    return response;
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching profile.",
      data: null,
    };
  }
}

export async function updateProfile(payload: { 
  name?: string; 
  profilePhoto?: string; 
  contactNumber?: string 
}) {
  try {
    const response = await httpClient.patch<any>("/user/update-profile", payload);
    return response;
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      message: error.message || "An error occurred while updating profile.",
      data: null,
    };
  }
}

export async function uploadProfileImage(formData: FormData) {
    try {
      // The "Turf Formula" uses the "images" key even for single uploads
      const response = await httpClient.post<any>("/user/upload-image", formData);
      return response;
    } catch (error: any) {
      console.error("Error uploading profile photo:", error);
      return {
        success: false,
        message: error.message || "An error occurred while uploading photo.",
        data: null,
      };
    }
  }

export async function getFavoriteTurfs() {
  try {
    const response = await httpClient.get("/user/favorites");
    return response;
  } catch (error: unknown) {
    console.error("Error fetching favorites:", error);
    return {
      success: false,
      message:
        (error as Error)?.message || "An error occurred while fetching favorites.",
      data: [],
    };
  }
}

export async function toggleFavoriteTurf(turfId: string) {
  try {
    const response = await httpClient.post(`/user/favorites/${turfId}`);
    return response;
  } catch (error: unknown) {
    console.error("Error toggling favorite:", error);
    return {
      success: false,
      message:
        (error as Error)?.message || "An error occurred while updating favorites.",
      data: null,
    };
  }
}

export async function deleteProfile() {
  try {
    const response = await httpClient.delete("/user/delete-profile");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while deleting your account.",
      data: null,
    };
  }
}
