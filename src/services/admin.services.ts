/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";

export async function getAllUsers(queryString: string = "") {
  try {
    const response = await httpClient.get<any>(`/user?${queryString}`);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while fetching users.",
      data: [],
      meta: undefined,
    };
  }
}

export async function blockUser(id: string, status: "BLOCKED" | "ACTIVE") {
  try {
    const response = await httpClient.patch<any>(`/user/block-user/${id}`, {
      status,
    });
    return response;
  } catch (error: any) {
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
    return {
      success: false,
      message: error.message || "An error occurred while fetching turfs.",
      data: [],
      meta: undefined,
    };
  }
}

export async function getAllSportTypes() {
  try {
    const response = await httpClient.get<any>("/sport-type");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while fetching sport types.",
      data: [],
    };
  }
}

export async function createSportType(formData: FormData) {
  try {
    const response = await httpClient.post<any>("/sport-type", formData);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while creating sport type.",
      data: null,
    };
  }
}

export async function updateSportType(id: string, formData: FormData) {
  try {
    const response = await httpClient.patch<any>(`/sport-type/${id}`, formData);
    return response;
  } catch (error: any) {
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
    return {
      success: false,
      message: error.message || "An error occurred while fetching bookings.",
      data: [],
      meta: undefined,
    };
  }
}

export async function getAllReports(queryString: string = "") {
  try {
    const response = await httpClient.get<any>(`/report?${queryString}`);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while fetching reports.",
      data: [],
      meta: undefined,
    };
  }
}

export async function deleteReport(id: string) {
  try {
    const response = await httpClient.delete<any>(`/report/${id}`);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while deleting report.",
      data: null,
    };
  }
}

export async function createTurfOwner(payload: any) {
  try {
    const response = await httpClient.post<any>(
      "/auth/create-turf-owner",
      payload,
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while creating turf owner.",
      data: null,
    };
  }
}
