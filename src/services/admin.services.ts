/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.type";

export async function getAllUsers(queryString: string = "") {
  try {
    const response = await httpClient.get<any>(`/user?${queryString}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching users.",
      data: [],
    };
  }
}

export async function blockUser(id: string, isBlocked: boolean) {
  try {
    const response = await httpClient.patch<any>(`/user/block-user/${id}`, { isBlocked });
    return response;
  } catch (error: any) {
    console.error("Error blocking user:", error);
    return {
      success: false,
      message: error.message || "An error occurred while blocking user.",
      data: null,
    };
  }
}

export async function getAllTurfs(queryString: string = "") {
  try {
    const response = await httpClient.get<any>(`/turf?${queryString}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching turfs:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching turfs.",
      data: [],
    };
  }
}

export async function getAllSportTypes() {
  try {
    const response = await httpClient.get<any>("/sport-type");
    return response;
  } catch (error: any) {
    console.error("Error fetching sport types:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching sport types.",
      data: [],
    };
  }
}

export async function createSportType(formData: FormData) {
  try {
    const response = await httpClient.post<any>("/sport-type", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error: any) {
    console.error("Error creating sport type:", error);
    return {
      success: false,
      message: error.message || "An error occurred while creating sport type.",
      data: null,
    };
  }
}

export async function updateSportType(id: string, formData: FormData) {
  try {
    const response = await httpClient.patch<any>(`/sport-type/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error: any) {
    console.error("Error updating sport type:", error);
    return {
      success: false,
      message: error.message || "An error occurred while updating sport type.",
      data: null,
    };
  }
}

export async function deleteSportType(id: string) {
  try {
    const response = await httpClient.delete<any>(`/sport-type/${id}`);
    return response;
  } catch (error: any) {
    console.error("Error deleting sport type:", error);
    return {
      success: false,
      message: error.message || "An error occurred while deleting sport type.",
      data: null,
    };
  }
}

export async function getAllBookings(queryString: string = "") {
  try {
    const response = await httpClient.get<any>(`/booking?${queryString}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching bookings.",
      data: [],
    };
  }
}

export async function getAllReports(queryString: string = "") {
  try {
    const response = await httpClient.get<any>(`/report?${queryString}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching reports:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching reports.",
      data: [],
    };
  }
}

export async function deleteReport(id: string) {
  try {
    const response = await httpClient.delete<any>(`/report/${id}`);
    return response;
  } catch (error: any) {
    console.error("Error deleting report:", error);
    return {
      success: false,
      message: error.message || "An error occurred while deleting report.",
      data: null,
    };
  }
}

export async function createTurfOwner(payload: any) {
  try {
    const response = await httpClient.post<any>("/auth/create-turf-owner", payload);
    return response;
  } catch (error: any) {
    console.error("Error creating turf owner:", error);
    return {
      success: false,
      message: error.message || "An error occurred while creating turf owner.",
      data: null,
    };
  }
}
