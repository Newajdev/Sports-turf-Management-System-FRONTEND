"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { getApiErrorMessage } from "@/lib/apiError";
import { revalidatePath } from "next/cache";

export async function createReport(payload: {
  reason: string;
  description: string;
  turfId: string;
}) {
  try {
    const response = await httpClient.post("/report", payload);
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: getApiErrorMessage(error, "Failed to submit report."),
      data: null,
    };
  }
}

export async function getMyReports(queryString = "") {
  try {
    const response = await httpClient.get(`/report/my-reports?${queryString}`);
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: getApiErrorMessage(error, "Failed to fetch reports."),
      data: [],
    };
  }
}
