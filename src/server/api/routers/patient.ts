import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

import { db } from "~/server/db";

export const patientRouter = createTRPCRouter({
  // Index: Retrieve all items
  index: protectedProcedure.query(async () => {
    // TODO
  }),
  // Show: Retrieve a single item by ID
  show: protectedProcedure.input(z.string()).query(async ({ input }) => {
    // TODO
  }),
  // Store: Create a new item
  store: protectedProcedure
    .input(z.object({ name: z.string(), description: z.string().optional() }))
    .mutation(async ({ input }) => {
      // TODO
    }),
  // Update: Update an existing item by ID
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          name: z.string().optional(),
          description: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      // TODO
    }),
  // Destroy: Delete an item by ID
  destroy: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
    // TODO
  }),
});
