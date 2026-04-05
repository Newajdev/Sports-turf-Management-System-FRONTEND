"use server";
import { httpClient } from "@/lib/axios/httpClient";
import { ITurf } from "@/interface/turf.interface";
import { ApiResponse } from "@/interface/api.interface"; // Assuming this exists, otherwise I'll define it or use T

export const getTurfs = async (): Promise<ApiResponse<ITurf[]>> => {
  const turfs = await httpClient.get("/turf");
  return turfs as ApiResponse<ITurf[]>;
};

export const getTurfByID = async (id: string): Promise<ApiResponse<ITurf>> => {
  const turf = await httpClient.get(`/turf/${id}`);
  return turf as ApiResponse<ITurf>;
}
