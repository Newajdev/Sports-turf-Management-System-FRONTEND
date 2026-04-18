"use server";

import { httpClient } from "@/lib/axios/httpClient";

export async function getMyNotifications(queryString: string = "") {
  try {
    const response = await httpClient.get<any>(`/notification?${queryString}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching notifications.",
      data: [],
    };
  }
}

export async function markAsRead(id: string) {
  try {
    const response = await httpClient.patch<any>(`/notification/mark-read/${id}`);
    return response;
  } catch (error: any) {
    console.error("Error marking notification as read:", error);
    return {
      success: false,
      message: error.message || "An error occurred while updating notification.",
      data: null,
    };
  }
}

export async function markAllAsRead() {
  try {
    const response = await httpClient.patch<any>(`/notification/mark-all-read`);
    return response;
  } catch (error: any) {
    console.error("Error marking all notifications as read:", error);
    return {
      success: false,
      message: error.message || "An error occurred while updating notifications.",
      data: null,
    };
  }
}

export async function deleteNotification(id: string) {
  try {
    const response = await httpClient.delete<any>(`/notification/${id}`);
    return response;
  } catch (error: any) {
    console.error("Error deleting notification:", error);
    return {
      success: false,
      message: error.message || "An error occurred while deleting notification.",
      data: null,
    };
  }
}
