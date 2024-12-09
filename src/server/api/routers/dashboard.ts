import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const dashboardRouter = createTRPCRouter({
  getCounts: protectedProcedure.query(async () => {
    const bookedAppointments = await db.appointment.count();
    const successfullAppointments = await db.appointment.count({
      where: { status: "done" },
    });
    const registeredPatients = await db.patient.count();
    const patientsTreatments = await db.appointment.count({
      where: { type: "Treatment" },
    });
    return {
      bookedAppointments,
      successfullAppointments,
      registeredPatients,
      patientsTreatments,
    };
  }),
  getChartData: protectedProcedure.query(async () => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 3);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const appointments = await db.appointment.findMany({
      where: {
        schedule: {
          gte: startDate,
          lte: endDate,
        },
        status: "done",
      },
      include: {
        Patient: true,
      },
      orderBy: { schedule: "asc" },
    });

    const chartData: { [key: string]: { male: number; female: number } } = {};

    appointments.forEach((appointment) => {
      const date = appointment.schedule.toISOString().split("T")[0];
      const sex = appointment.Patient.sex.toLowerCase();

      if (!chartData[date]) {
        chartData[date] = { male: 0, female: 0 };
      }

      if (sex === "male") {
        chartData[date].male += 1;
      } else if (sex === "female") {
        chartData[date].female += 1;
      }
    });

    return Object.keys(chartData).map((date) => ({
      date,
      male: chartData[date].male,
      female: chartData[date].female,
    }));
  }),
  getTodayAppointments: protectedProcedure.query(async () => {
    const startDate = new Date();
    startDate.setHours(9, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(16, 0, 0, 0);

    const appointments = await db.appointment.findMany({
      where: {
        schedule: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        Patient: true,
        Dentist: {
          include: {
            UserDetails: true,
          },
        },
      },
      orderBy: { schedule: "asc" },
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
});
