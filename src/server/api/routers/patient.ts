import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { idValidation } from "./validations/generic";
import { TRPCError } from "@trpc/server";
import { createValidation, updateValidation } from "./validations/patient";

export const patientsRouter = createTRPCRouter({
  getAllPatients: protectedProcedure.query(async () => {
    return await db.patient.findMany({
      select: {
        id: true,
        lastName: true,
        firstName: true,
        sex: true,
        email: true,
        nationality: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [
        { lastName: "asc" },
        { firstName: "asc" },
        { middleName: "asc" },
      ],
    });
  }),
  getPatient: protectedProcedure
    .input(idValidation)
    .query(async ({ input }) => {
      return await db.patient.findUnique({
        where: { id: input.id },
      });
    }),
  createPatient: protectedProcedure
    .input(createValidation)
    .mutation(async ({ input }) => {
      try {
        return await db.patient.create({ data: input });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create patient",
        });
      }
    }),
  deletePatient: protectedProcedure
    .input(idValidation)
    .mutation(async ({ input }) => {
      try {
        return await db.patient.delete({ where: { id: input.id } });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete patient",
        });
      }
    }),
  updatePatient: protectedProcedure
    .input(updateValidation)
    .mutation(async ({ input }) => {
      console.log(input);
      try {
        return await db.patient.update({
          where: { id: input.id },
          data: input.data,
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update patient",
        });
      }
    }),
});
