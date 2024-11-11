import { TRPCError } from "@trpc/server";
import { storeValidation, updateValidation } from "./validations/treatment";
import { idValidation } from "./validations/generic";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const treatmentRouter = createTRPCRouter({
  // Index: Retrieve all items
  index: protectedProcedure.query(async () => {
    return await db.user.findMany();
  }),
  // Show: Retrieve a single item by ID
  show: protectedProcedure.input(idValidation).query(async ({ input }) => {
    const treatment = await db.treatment.findUnique({
      where: { id: input.id },
    });

    if (!treatment) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return treatment;
  }),
  // Store: Create a new item
  store: protectedProcedure
    .input(storeValidation)
    .mutation(async ({ input }) => {
      try {
        return await db.treatment.create({
          data: input,
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
        return await db.treatment.update({
          where: { id: input.id },
          data: input.data,
        });
      } catch (error) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
    }),
  // Destroy: Delete an item by ID
  destroy: protectedProcedure
    .input(idValidation)
    .mutation(async ({ input }) => {
      try {
        await db.treatment.delete({
          where: { id: input.id },
        });
      } catch (error) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
    }),
});
