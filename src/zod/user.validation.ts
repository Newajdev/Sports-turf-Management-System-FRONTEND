import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").optional(),
  profilePhoto: z.string().url("Invalid image URL").optional(),
  contactNumber: z.string().min(10, "Contact number must be at least 10 digits").optional(),
});
