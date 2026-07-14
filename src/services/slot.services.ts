/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { getApiErrorMessage } from "@/lib/apiError";
import { revalidatePath } from "next/cache";

/**
 * Fetch all master slots defined by the system
 */
export const getAllMasterSlots = async () => {
  try {
    const response = await httpClient.get("/slots");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to fetch master slots",
      data: [],
    };
  }
};

/**
 * Fetch active turf slots for a specific venue
 */
export const getTurfSlotsByTurf = async (turfId: string) => {
  try {
    const response = await httpClient.get(`/turf-slots/${turfId}`);
    return response;
  } catch (error: any) {
    return { success: false, message: "Failed to fetch turf slots", data: [] };
  }
};

/**
 * Bulk create turf slots
 */
export const bulkCreateTurfSlots = async (payload: {
  turfId: string;
  slotIds: string[];
  price: number;
}) => {
  try {
    const response = await httpClient.post("/turf-slots/bulk", payload, {
      timeout: 30000,
    });
    revalidatePath("/turf-owner/dashboard/slots");
    return response;
  } catch (error: any) {
    const isTimeout =
      error?.code === "ECONNABORTED" ||
      error?.message?.toLowerCase?.().includes("timeout");
    return {
      success: false,
      message: isTimeout
        ? "Request timed out while activating slots"
        : "Failed to create turf slots",
      data: null,
    };
  }
};

export const deleteTurfSlot = async (id: string) => {
  try {
    const response = await httpClient.delete(`/turf-slots/${id}`);
    revalidatePath("/turf-owner/dashboard/slots");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to delete turf slot",
      data: null,
    };
  }
};

export const adminCreateMasterSlot = async (payload: {
  slotType: string;
  startTime: string;
  endTime: string;
  interval?: number;
}) => {
  try {
    const response = await httpClient.post("/slots", payload);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to create master slot",
      data: null,
    };
  }
};

export const adminUpdateMasterSlot = async (id: string, payload: any) => {
  try {
    const response = await httpClient.patch(`/slots/${id}`, payload);
    revalidatePath("/admin/dashboard/master-slots-management");
    revalidatePath("/turf-owner/dashboard/slots");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to update master slot",
      data: null,
    };
  }
};

/**
 * Admin: Delete a master slot template
 */
export const adminDeleteMasterSlot = async (id: string) => {
  try {
    const response = await httpClient.delete(`/slots/${id}`);
    revalidatePath("/admin/dashboard/master-slots-management");
    revalidatePath("/turf-owner/dashboard/slots");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to delete master slot",
      data: null,
    };
  }
};

export interface IAvailableTurfSlot {
  id: string;
  price: number | string;
  isBooking: boolean;
  turfId: string;
  slotId: string;
  isBooked: boolean;
  slot?: {
    startTime: string;
    endTime: string;
    duration?: number;
  };
}

/**
 * Get available turf slots for a specific date
 */
export const getAvailableSlots = async (turfId: string, date: string) => {
  try {
    const response = await httpClient.get<IAvailableTurfSlot[]>(
      `/turf-slots/${turfId}/availability`,
      { params: { date } },
    );
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "Failed to fetch available slots",
      data: [] as IAvailableTurfSlot[],
    };
  }
};

export const createCustomTurfSlot = async (payload: {
  startTime: string;
  endTime: string;
  date: string;
  sportType: string;
  playersCount: number;
  turfId: string;
}) => {
  try {
    const response = await httpClient.post("/turf-slots/custom", payload);
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: getApiErrorMessage(
        error,
        "Failed to create custom slot request",
      ),
      data: null,
    };
  }
};

export const getAllMyCustomSlots = async (queryString = "") => {
  try {
    const response = await httpClient.get(`/turf-slots/custom?${queryString}`);
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "Failed to fetch custom slots",
      data: [],
    };
  }
};

export const getMyCustomSlots = async (turfId: string, queryString = "") => {
  try {
    const response = await httpClient.get(
      `/turf-slots/custom/${turfId}?${queryString}`,
    );
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "Failed to fetch custom slots",
      data: [],
    };
  }
};

export const updateCustomTurfSlot = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  try {
    const response = await httpClient.patch(
      `/turf-slots/custom/${id}`,
      payload,
    );
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "Failed to update custom slot",
      data: null,
    };
  }
};

export const deleteCustomTurfSlot = async (id: string) => {
  try {
    const response = await httpClient.delete(`/turf-slots/custom/${id}`);
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "Failed to delete custom slot",
      data: null,
    };
  }
};
