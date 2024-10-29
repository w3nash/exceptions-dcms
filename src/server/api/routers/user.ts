import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
  // Index: Retrieve all items
  index: protectedProcedure.query(async () => {
    const users = await db.user.findMany();
    return users;
  }),
  // Show: Retrieve a single item by ID
  show: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const user = await db.user.findUnique({ where: { id: input.id } });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return user;
    }),
  // Store: Create a new item
  store: protectedProcedure
    .input(
      z.object({
        user: z.object({
          email: z.string(),
          image: z.string().optional(),
          username: z.string(),
          password: z.string(),
          role: z.number().optional().default(1), // 0: admin, 1: user
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
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const user = await db.user.create({
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
        return user;
      } catch (e) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
    }),
  // Update: Update an existing item by ID
  update: protectedProcedure
    .input(
      z.object({
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
      }),
    )
    .mutation(async ({ input }) => {
      try {
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
      } catch (e) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
    }),
  // Destroy: Delete an item by ID
  destroy: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await db.user.delete({
          where: {
            id: input.id,
          },
        });
      } catch (e) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
    }),
});
