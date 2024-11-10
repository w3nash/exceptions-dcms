import { z } from "zod";

export const storeValidation = z.object({
  patientId: z.string(),
  proceduteId: z.string(),
});

export const updateValidation = z.object({
  id: z.string(),
  data: z.object({
    patientId: z.string().optional(),
    proceduteId: z.string().optional(),
  }),
});
