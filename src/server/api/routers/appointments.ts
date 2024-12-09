import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { idValidation } from "./validations/generic";
import { TRPCError } from "@trpc/server";
import {
  createAppointmentValidation,
  updateAppointmentValidation,
} from "./validations/appointment";

export const appointmentsRouter = createTRPCRouter({
  getAllAppointments: protectedProcedure.query(async () => {
    const appointments = await db.appointment.findMany({
      include: {
        Patient: true,
        Dentist: {
          include: {
            UserDetails: true,
          },
        },
      },
      orderBy: {
        schedule: "desc",
      },
    });

    const flattenedAppointments = appointments.map((appointment) => ({
      id: appointment.id,
      type: appointment.type,
      status: appointment.status,
      patientName: `${appointment.Patient.firstName} ${appointment.Patient.lastName}`,
      dentistName: appointment.Dentist?.UserDetails
        ? `${appointment.Dentist.UserDetails.firstName} ${appointment.Dentist.UserDetails.lastName}`
        : null,
      patientId: appointment.patientId,
      schedule: appointment.schedule,
    }));

    return flattenedAppointments;
  }),
  getAppointment: protectedProcedure
    .input(idValidation)
    .query(async ({ input }) => {
      const appointment = await db.appointment.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          schedule: true,
          status: true,
          type: true,
          createdAt: true,
          updatedAt: true,
          Patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          Dentist: {
            select: {
              UserDetails: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      });

      return appointment;
    }),
  createAppointment: protectedProcedure
    .input(createAppointmentValidation)
    .mutation(async ({ input }) => {
      try {
        const appointment = await db.appointment.create({
          data: {
            patientId: input.patientId,
            dentistId: input.dentistId,
            schedule: input.schedule,
            type: input.type,
            status: input.status,
          },
        });
        return appointment;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while creating the appointment",
        });
      }
    }),
  deleteAppointment: protectedProcedure
    .input(idValidation)
    .mutation(async ({ input }) => {
      const appointment = await db.appointment.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!appointment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The appointment you are looking for does not exist",
        });
      }

      try {
        await db.appointment.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while deleting the appointment",
        });
      }
    }),
  updateAppointment: protectedProcedure
    .input(updateAppointmentValidation)
    .mutation(async ({ input }) => {
      const appointment = await db.appointment.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!appointment) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The appointment you are looking for does not exist",
        });
      }

      try {
        const updatedAppointment = await db.appointment.update({
          where: {
            id: input.id,
          },
          data: {
            schedule: input.data.schedule,
            type: input.data.type,
            status: input.data.status,
          },
        });

        return updatedAppointment;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while updating the appointment",
        });
      }
    }),
});
