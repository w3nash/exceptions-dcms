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
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete appointment. Please try again.",
    };
  }
}

export async function updatePatient(data: any) {
  try {
    await api.patientsRouter.updatePatient(data);
    revalidatePath("/patient-records");
    revalidatePath("/patient-records/patient/" + data.id);
    revalidatePath("/dashboard");
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to update patient. Please try again.",
    };
  }
}

export async function updateProfile(data: any) {
  try {
    await api.userRouter.updateCurrentUser(data);
    revalidatePath("/dashboard");
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to update profile. Please try again.",
    };
  }
}

export async function updatePassword(data: any) {
  try {
    await api.userRouter.updateCurrentUserPassword(data);
    revalidatePath("/dashboard");
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to update password. Please try again.",
    };
  }
}

export async function updateUser(data: any) {
  try {
    await api.userRouter.updateUser(data);
    revalidatePath("/staff");
    revalidatePath("/staff/" + data.id);
    revalidatePath("/dashboard");
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to update user. Please try again.",
    };
  }
}

export async function updateAppointment(data: any) {
  try {
    await api.appointmentsRouter.updateAppointment(data);
    revalidatePath("/appointments");
    revalidatePath("/appointments/" + data.id);
    revalidatePath("/dashboard");
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to update appointment. Please try again.",
    };
  }
}

export async function deletePatient(id: string) {
  try {
    await api.patientsRouter.deletePatient({ id });
    revalidatePath("/patient-records");
    revalidatePath("/dashboard");
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete patient. Please try again.",
    };
  }
}

export async function deleteUser(id: string) {
  try {
    await api.userRouter.deleteUser({ id });
    revalidatePath("/staff");
    revalidatePath("/dashboard");
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete user. Please try again.",
    };
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
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to create user. Please try again.",
    };
  }
};

export const createAppointment = async (data: any) => {
  try {
    await api.appointmentsRouter.createAppointment(data);
    revalidatePath("/appointments");
    revalidatePath("/dashboard");
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to create appointment. Please try again.",
    };
  }
};

export const createPatient = async (data: any) => {
  try {
    await api.patientsRouter.createPatient(data);
    revalidatePath("/patient-records");
    revalidatePath("/dashboard");
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to create patient. Please try again.",
    };
  }
};

export const getCurrentUser = cache(async () => {
  try {
    return await api.userRouter.getCurrentUser();
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch current user. Please try again.",
    };
  }
});

export const getUsers = cache(async () => {
  try {
    return await api.userRouter.getAllUsers();
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch users. Please try again.",
    };
  }
});

export const getUser = cache(async (id: string) => {
  try {
    return await api.userRouter.getUser({ id });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch user. Please try again.",
    };
  }
});

export const getAppointments = cache(async () => {
  try {
    return await api.appointmentsRouter.getAllAppointments();
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch appointments. Please try again.",
    };
  }
});

export const getAppointment = cache(async (id: string) => {
  try {
    return await api.appointmentsRouter.getAppointment({ id });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch appointment. Please try again.",
    };
  }
});

export const getDashboardCounts = cache(async () => {
  try {
    return await api.dashboardRouter.getCounts();
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch dashboard counts. Please try again.",
    };
  }
});

export const getDashboardChartData = cache(async () => {
  try {
    return await api.dashboardRouter.getChartData();
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch dashboard chart data. Please try again.",
    };
  }
});

export const getDashboardTodayAppointments = cache(async () => {
  try {
    return await api.dashboardRouter.getTodayAppointments();
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch today's appointments. Please try again.",
    };
  }
});

export const getDentists = cache(async () => {
  try {
    return await api.userRouter.getAllDentists();
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch dentists. Please try again.",
    };
  }
});

export const getPatients = cache(async () => {
  try {
    return await api.patientsRouter.getAllPatients();
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch patients. Please try again.",
    };
  }
});

export const getPatient = cache(async (id: string) => {
  try {
    return await api.patientsRouter.getPatient({ id });
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch patient. Please try again.",
    };
  }
});
