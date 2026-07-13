"use server";

import { TContactForm } from "@/zod/contact.validation";
import { httpClient } from "@/lib/axios/httpClient";

export const submitContactForm = async (data: TContactForm) => {
  const response = await httpClient.post("/contact", data);
  return response.data;
};
