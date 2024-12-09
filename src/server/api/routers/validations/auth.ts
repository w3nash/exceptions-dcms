import { z } from "zod";

export const loginValidation = z.object({
  username: z.string(),
  password: z.string(),
});

export const createSessionValidation = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
});
