"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { revalidatePath } from "next/cache";

/**
 * Fetch all master slots defined by the system
 */
export const getAllMasterSlots = async () => {
    try {
        const response = await httpClient.get("/slots");
        return response;
    } catch (error: any) {
        console.error("Error fetching master slots:", error);
        return { success: false, message: "Failed to fetch master slots" };
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
        console.error("Error fetching turf slots:", error);
        return { success: false, message: "Failed to fetch turf slots" };
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
        const response = await httpClient.post("/turf-slots/bulk", payload);
        revalidatePath("/turf-owner/dashboard/slots");
        return response;
    } catch (error: any) {
        console.error("Error creating turf slots:", error);
        return { success: false, message: "Failed to create turf slots" };
    }
};

/**
 * Delete a specific turf slot
 */
export const deleteTurfSlot = async (id: string) => {
    try {
        const response = await httpClient.delete(`/turf-slots/${id}`);
        revalidatePath("/turf-owner/dashboard/slots");
        return response;
    } catch (error: any) {
        console.error("Error deleting turf slot:", error);
        return { success: false, message: "Failed to delete turf slot" };
    }
};

/**
 * Admin: Create a new master slot template
 */
export const adminCreateMasterSlot = async (payload: {
    slotType: string;
    startTime: string;
    endTime: string;
    interval?: number;
}) => {
    try {
        const response = await httpClient.post("/slots", payload);
        revalidatePath("/admin/dashboard/master-slots-management");
        revalidatePath("/turf-owner/dashboard/slots");
        return response;
    } catch (error: any) {
        console.error("Error creating master slot:", error);
        return { success: false, message: "Failed to create master slot" };
    }
};

/**
 * Admin: Update an existing master slot template
 */
export const adminUpdateMasterSlot = async (id: string, payload: any) => {
    try {
        const response = await httpClient.patch(`/slots/${id}`, payload);
        revalidatePath("/admin/dashboard/master-slots-management");
        revalidatePath("/turf-owner/dashboard/slots");
        return response;
    } catch (error: any) {
        console.error("Error updating master slot:", error);
        return { success: false, message: "Failed to update master slot" };
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
        console.error("Error deleting master slot:", error);
        return { success: false, message: "Failed to delete master slot" };
    }
};
