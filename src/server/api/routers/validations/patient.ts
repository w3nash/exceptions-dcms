import { z } from "zod";

export const storeValidation = z.object({
  lastName: z.string(),
  firstName: z.string(),
  middleName: z.string().optional(),
  age: z.number(),
  sex: z.string(),
  address: z.string(),
  contactNumber: z.string().optional(),
  email: z.string(),
  birthday: z.string(),
  nationality: z.string(),
  occupation: z.string(),
  refferedBy: z.string().optional(),
});

export const updateValidation = z.object({
  id: z.string(),
  data: z.object({
    lastName: z.string().optional(),
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    age: z.number().optional(),
    sex: z.string().optional(),
    address: z.string().optional(),
    contactNumber: z.string().optional(),
    email: z.string().optional(),
    birthday: z.string().optional(),
    nationality: z.string().optional(),
    occupation: z.string().optional(),
    refferedBy: z.string().optional(),
  }),
});
