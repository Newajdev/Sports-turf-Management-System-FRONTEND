/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { revalidatePath } from "next/cache";

const BASE_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

export const getMyTurf = async () => {
    try {
        const response = await httpClient.get("/turf/my-turf");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching my turf:", error);
        return null;
    }
};

export const createTurf = async (payload: any) => {
    try {
        const response = await httpClient.post("/turf", payload);
        revalidatePath("/turf-owner/dashboard/my-turf");
        return response;
    } catch (error: any) {
        return error.response?.data || { success: false, message: "Failed to create turf", data: null };
    }
};

export const updateTurf = async (id: string, payload: any) => {
    try {
        const response = await httpClient.patch(`/turf/${id}`, payload);
        revalidatePath("/turf-owner/dashboard/my-turf");
        return response;
    } catch (error: any) {
        return error.response?.data || { success: false, message: "Failed to update turf", data: null };
    }
};

export const uploadTurfImages = async (formData: FormData) => {
    try {
        const response = await httpClient.post("/turf/upload-images", formData)
        return response;
    } catch (error: any) {
        console.error("Error uploading images:", error);
        return { success: false, message: "Failed to upload images", data: null };
    }
};

export const deleteTurfImage = async (turfId: string, imageUrl: string) => {
    try {
        const response = await httpClient.delete("/turf/delete-image", {
            id: turfId,
            imageUrl,
        });
        revalidatePath("/turf-owner/dashboard/my-turf");
        return response;
    } catch (error: any) {
        console.error("Error deleting turf image:", error);
        return { success: false, message: "Failed to delete image", data: null };
    }
};
