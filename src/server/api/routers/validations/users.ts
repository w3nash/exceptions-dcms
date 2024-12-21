import { z } from "zod";

export const storeValidation = z.object({
  user: z.object({
    email: z.string(),
    image: z.string().nullable().optional(),
    username: z.string(),
    password: z.string(),
    role: z.number().default(1),
  }),
  details: z.object({
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string().nullable().optional(),
    birthday: z.date(),
    sex: z.string(),
    address: z.string().nullable().optional(),
    contactNumber: z.string().nullable().optional(),
    position: z.string(),
    monthlySalary: z.string().nullable().optional(),
  }),
});

export const updateValidation = z.object({
  id: z.string(),
  data: z.object({
    user: z.object({
      email: z.string(),
      username: z.string(),
      role: z.number(), // 0: admin, 1: user
    }),
    details: z.object({
      firstName: z.string(),
      lastName: z.string(),
      middleName: z.string().nullable().optional(),
      birthday: z.date(),
      sex: z.string(),
      address: z.string().nullable().optional(),
      contactNumber: z.string().nullable().optional(),
      position: z.string(),
      monthlySalary: z.string().nullable().optional(),
    }),
  }),
});

export const updatePasswordValidation = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});

export const updateProfileValidation = z.object({
  details: z.object({
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string().nullable().optional(),
    birthday: z.date(),
    sex: z.string(),
    address: z.string().nullable().optional(),
    contactNumber: z.string(),
  }),
});
