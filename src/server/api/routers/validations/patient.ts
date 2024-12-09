import { z } from "zod";

export const createValidation = z.object({
  lastName: z.string(),
  firstName: z.string(),
  middleName: z.string().optional().nullable(),
  sex: z.string(),
  address: z.string(),
  contactNumber: z.string().optional().nullable(),
  email: z.string().email(),
  birthday: z.date(),
  nationality: z.string(),
  occupation: z.string(),
  referredBy: z.string().optional().nullable(),
});

export const updateValidation = z.object({
  id: z.string(),
  data: z.object({
    lastName: z.string(),
    firstName: z.string(),
    middleName: z.string().optional().nullable(),
    sex: z.string(),
    address: z.string(),
    contactNumber: z.string().optional().nullable(),
    email: z.string().email(),
    birthday: z.date(),
    nationality: z.string(),
    occupation: z.string(),
    referredBy: z.string().optional().nullable(),
  }),
});
