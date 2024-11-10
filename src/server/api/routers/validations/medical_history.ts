import { z } from "zod";

export const storeValidation = z.object({
  patientId: z.string(),
  hospitalization: z.string().optional(),
  medications: z.string().optional(),
  diseases: z.string().optional(),
  xray: z.string().optional(),
  facialMarls: z.string().optional(),
  tobaccoConsumption: z.string().optional(),
  alcoholConsumption: z.string().optional(),
});

export const updateValidation = z.object({
  id: z.string(),
  data: z.object({
    hospitalization: z.string().optional(),
    medications: z.string().optional(),
    diseases: z.string().optional(),
    xray: z.string().optional(),
    facialMarls: z.string().optional(),
    tobaccoConsumption: z.string().optional(),
    alcoholConsumption: z.string().optional(),
  }),
});
