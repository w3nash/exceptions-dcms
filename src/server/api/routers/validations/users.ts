import { z } from "zod";

export const storeValidation = z.object({
  user: z.object({
    email: z.string(),
    image: z.string().optional(),
    username: z.string(),
    password: z.string(),
    role: z.number().optional().default(1),
  }),
  details: z.object({
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string().optional(),
    birthday: z.string(),
    age: z.number(),
    sex: z.string().optional(),
    address: z.string().optional(),
    contactNumber: z.string(),
    position: z.string(),
    monthlySalary: z.string(),
  }),
});

export const updateValidation = z.object({
  id: z.string(),
  data: z.object({
    user: z.object({
      email: z.string().optional(),
      image: z.string().optional(),
      username: z.string().optional(),
      password: z.string().optional(),
      role: z.number().optional(), // 0: admin, 1: user
    }),
    details: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      middleName: z.string().optional(),
      birthday: z.string().optional(),
      age: z.number().optional(),
      sex: z.string().optional(),
      address: z.string().optional(),
      contactNumber: z.string().optional(),
      position: z.string().optional(),
      monthlySalary: z.string().optional(),
    }),
  }),
});
