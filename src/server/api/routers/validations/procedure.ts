import { z } from "zod";

export const storeValidation = z.object({
  procedureName: z.string(),
});

export const updateValidation = z.object({
  id: z.string(),
  data: z.object({
    procedureName: z.string().optional(),
  }),
});
