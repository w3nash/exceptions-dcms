import { z } from "zod";

export const storeValidation = z.object({
  patientId: z.string(),
  dentistId: z.string(),
  schedule: z.string(),
  status: z.string(),
});

export const updateValidation = z.object({
  id: z.string(),
  data: z.object({
    patientId: z.string().optional(),
    dentistId: z.string().optional(),
    schedule: z.string().optional(),
    status: z.string().optional(),
  }),
});
