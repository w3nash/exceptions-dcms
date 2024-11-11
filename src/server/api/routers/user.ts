import { TRPCError } from "@trpc/server";
import { storeValidation, updateValidation } from "./validations/users";
import { idValidation } from "./validations/generic";
import bcrypt from "bcrypt";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
  // Index: Retrieve all items
  index: protectedProcedure.query(async () => {
    return await db.user.findMany();
  }),
  // Show: Retrieve a single item by ID
  show: protectedProcedure.input(idValidation).query(async ({ input }) => {
    const user = await db.user.findUnique({
      where: { id: input.id },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return user;
  }),
  // Store: Create a new item
  store: protectedProcedure
    .input(storeValidation)
    .mutation(async ({ input }) => {
      try {
        input.user.password = await bcrypt
          .hash(input.user.password, 10)
          .then((hashed) => hashed);
        return await db.user.create({
          data: {
            ...input.user,
            UserDetails: {
              create: {
                ...input.details,
              },
            },
          },
          include: { UserDetails: true },
        });
      } catch (error) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
    }),
  // Update: Update an existing item by ID
  update: protectedProcedure
    .input(updateValidation)
    .mutation(async ({ input }) => {
      try {
        if (input.data.user?.password) {
          input.data.user.password = await bcrypt
            .hash(input.data.user.password, 10)
            .then((hashed) => hashed);
        }
        const user = await db.user.update({
          where: { id: input.id },
          data: {
            ...input.data.user,
            UserDetails: {
              update: {
                ...input.data.details,
              },
            },
          },
          include: { UserDetails: true },
        });
        return user;
      } catch (error) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
    }),
  // Destroy: Delete an item by ID
  destroy: protectedProcedure
    .input(idValidation)
    .mutation(async ({ input }) => {
      try {
        await db.user.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
    }),
});
