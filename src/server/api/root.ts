import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { patientRouter } from "./routers/patient";
import { appointmentRouter } from "./routers/appointment";
import { treatmentRouter } from "./routers/treatment";
import { procedureRouter } from "./routers/procedure";
import { userRouter } from "./routers/user";
import { medicalHistoryRouter } from "./routers/medical_history";
import { dentistRouter } from "./routers/dentist";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  patientRouter,
  appointmentRouter,
  treatmentRouter,
  procedureRouter,
  medicalHistoryRouter,
  dentistRouter,
  userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
