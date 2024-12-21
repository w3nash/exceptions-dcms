"use server";

import { api } from "~/trpc/server";
import { cache } from "react";
import { revalidatePath } from "next/cache";

export async function deleteAppointment(id: string) {
  try {
    await api.appointmentsRouter.deleteAppointment({ id });
    revalidatePath("/appointments");
    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
}

export async function updatePatient(data: any) {
  try {
    await api.patientsRouter.updatePatient(data);
    revalidatePath("/patient-records");
    revalidatePath("/patient-records/patient/" + data.id);
    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
}

export async function updateProfile(data: any) {
  try {
    await api.userRouter.updateCurrentUser(data);
    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
}

export async function updatePassword(data: any) {
  try {
    await api.userRouter.updateCurrentUserPassword(data);
    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
}

export async function updateUser(data: any) {
  try {
    await api.userRouter.updateUser(data);
    revalidatePath("/staff");
    revalidatePath("/staff/" + data.id);
    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
}

export async function updateAppointment(data: any) {
  try {
    await api.appointmentsRouter.updateAppointment(data);
    revalidatePath("/appointments");
    revalidatePath("/appointments/" + data.id);
    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
}

export async function deletePatient(id: string) {
  try {
    await api.patientsRouter.deletePatient({ id });
    revalidatePath("/patient-records");
    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id: string) {
  try {
    await api.userRouter.deleteUser({ id });
    revalidatePath("/staff");
    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
}

export const createUser = async (data: any) => {
  const newData = {
    user: {
      email: data.email,
      username: `${data.lastName.toLowerCase()}${data.firstName.toLowerCase()}`,
      password: `${data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1)}${data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1)}`,
      role: parseInt(data.role),
    },
    details: {
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName,
      birthday: data.birthday,
      sex: data.sex,
      address: data.address,
      contactNumber: data.contactNumber,
      position: data.position,
      monthlySalary: data.monthlySalary,
    },
  };
  try {
    await api.userRouter.createUser(newData);
    revalidatePath("/staff");
    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
};

export const createAppointment = async (data: any) => {
  try {
    await api.appointmentsRouter.createAppointment(data);
    revalidatePath("/appointments");
    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
};

export const createPatient = async (data: any) => {
  try {
    await api.patientsRouter.createPatient(data);
    revalidatePath("/patient-records");
    revalidatePath("/dashboard");
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = cache(async () => {
  return await api.userRouter.getCurrentUser();
});

export const getUsers = cache(async () => {
  return await api.userRouter.getAllUsers();
});

export const getUser = cache(async (id: string) => {
  return await api.userRouter.getUser({ id });
});

export const getAppointments = cache(async () => {
  return await api.appointmentsRouter.getAllAppointments();
});

export const getAppointment = cache(async (id: string) => {
  return await api.appointmentsRouter.getAppointment({ id });
});

export const getDashboardCounts = cache(async () => {
  return await api.dashboardRouter.getCounts();
});

export const getDashboardChartData = cache(async () => {
  return await api.dashboardRouter.getChartData();
});

export const getDashboardTodayAppointments = cache(async () => {
  return await api.dashboardRouter.getTodayAppointments();
});

export const getDentists = cache(async () => {
  return await api.userRouter.getAllDentists();
});

export const getPatients = cache(async () => {
  return await api.patientsRouter.getAllPatients();
});

export const getPatient = cache(async (id: string) => {
  return await api.patientsRouter.getPatient({ id });
});
