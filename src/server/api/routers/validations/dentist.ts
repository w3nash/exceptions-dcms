import { z } from "zod";

export const storeValidation = z.object({
  userId: z.string(),
});

