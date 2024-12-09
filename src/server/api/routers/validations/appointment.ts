import { z } from "zod";

export const createAppointmentValidation = z.object({
  patientId: z.string({ required_error: "Please enter a patient." }),
  dentistId: z.string({ required_error: "Please enter a dentist." }),
  schedule: z.date({ required_error: "Please enter a schedule." }),
  type: z.enum(["Consultation", "Treatment"], {
    required_error: "Please enter a type.",
  }),
  status: z.enum(["pending", "processing", "done", "cancelled"], {
    required_error: "Please enter a status.",
  }),
});

export const updateAppointmentValidation = z.object({
  id: z.string({ required_error: "Please enter an id." }),
  data: z.object({
    schedule: z.date({ required_error: "Please enter a schedule." }),
    type: z.enum(["Consultation", "Treatment"], {
      required_error: "Please enter a type.",
    }),
    status: z.enum(["pending", "processing", "done", "cancelled"], {
      required_error: "Please enter a status.",
    }),
  }),
});
