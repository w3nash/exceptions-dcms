import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { createSessionValidation, loginValidation } from "./validations/auth";
import bcrypt from "bcrypt";

export const authRouter = createTRPCRouter({
  loginUser: publicProcedure.input(loginValidation).query(async ({ input }) => {
    const user = await db.user.findFirst({
      where: {
        username: input.username,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to access this system",
      });
    }

    const valid = await bcrypt.compare(input.password, user.password);

    if (!valid) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You have entered an invalid password",
      });
    }

    return user;
  }),
  createSession: publicProcedure
    .input(createSessionValidation)
    .mutation(async ({ input }) => {
      try {
        const session = await db.session.create({
          data: {
            sessionToken: input.sessionToken,
            userId: input.userId,
            expires: input.expires,
          },
        });

        return session;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while creating the session",
        });
      }
    }),
});
