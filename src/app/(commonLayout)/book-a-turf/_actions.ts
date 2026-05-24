"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { getApiErrorMessage } from "@/lib/apiError";
import { ITurf } from "@/interface/turf.interface";
import { ApiResponse } from "@/types/api.type";
import { ISportType } from "@/interface/sport-type.interface";

export const getTurfs = async (
  queryString = "turfStatus=ACTIVE&limit=12&page=1&sortBy=rating&sortOrder=desc",
): Promise<ApiResponse<ITurf[]>> => {
  try {
    const response = await httpClient.get<ITurf[]>(`/turf?${queryString}`);
    return response;
  } catch (error: unknown) {
    console.error("Error fetching turfs:", error);
    return {
      success: false,
      message: getApiErrorMessage(error, "Failed to load turfs"),
      data: [],
      meta: undefined,
    };
  }
};

export const getTurfByID = async (id: string): Promise<ApiResponse<ITurf>> => {
  try {
    const response = await httpClient.get<ITurf>(`/turf/${id}`);
    return response;
  } catch (error: unknown) {
    console.error("Error fetching turf:", error);
    return {
      success: false,
      message: getApiErrorMessage(error, "Failed to load turf details"),
      data: null as unknown as ITurf,
    };
  }
};

export const getSportTypes = async (): Promise<ApiResponse<ISportType[]>> => {
  try {
    const response = await httpClient.get<ISportType[]>("/sport-type");
    return response;
  } catch (error: unknown) {
    console.error("Error fetching sport types:", error);
    return {
      success: false,
      message: getApiErrorMessage(error, "Failed to load sport types"),
      data: [],
    };
  }
};
