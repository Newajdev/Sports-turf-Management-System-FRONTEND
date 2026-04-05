"use server";
import { httpClient } from "@/lib/axios/httpClient";

export const getTurfs = async () => {
  const turfs = await httpClient.get("/turf");
  return turfs;
};

export const getTurfByID = async (id: string) => {
  const turf = await httpClient.get(`/turf/${id}`);
  return turf;
}
