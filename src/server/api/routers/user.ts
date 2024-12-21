import { TRPCError } from "@trpc/server";
import {
  storeValidation,
  updatePasswordValidation,
  updateProfileValidation,
  updateValidation,
} from "./validations/users";
import { idValidation } from "./validations/generic";
import bcrypt from "bcrypt";

import { protectedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
  getAllUsers: protectedProcedure.query(async () => {
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        UserDetails: {
          select: {
            lastName: true,
            firstName: true,
            middleName: true,
            position: true,
          },
        },
      },
    });

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      lastName: user.UserDetails?.lastName || "",
      firstName: user.UserDetails?.firstName || "",
      middleName: user.UserDetails?.middleName || null,
      position: user.UserDetails?.position || "",
    }));
  }),
  getUser: protectedProcedure.input(idValidation).query(async ({ input }) => {
    const user = await db.user.findUnique({
      where: { id: input.id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        image: true,
        UserDetails: {
          select: {
            lastName: true,
            firstName: true,
            middleName: true,
            birthday: true,
            sex: true,
            address: true,
            contactNumber: true,
            position: true,
            monthlySalary: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const flattenedUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      image: user.image,
      lastName: user.UserDetails?.lastName || "",
      firstName: user.UserDetails?.firstName || "",
      middleName: user.UserDetails?.middleName || null,
      birthday: user.UserDetails?.birthday || null,
      sex: user.UserDetails?.sex || "",
      address: user.UserDetails?.address || null,
      contactNumber: user.UserDetails?.contactNumber || null,
      position: user.UserDetails?.position || "",
      monthlySalary: user.UserDetails?.monthlySalary || null,
    };

    return flattenedUser;
  }),
  createUser: protectedProcedure
    .input(storeValidation)
    .mutation(async ({ input }) => {
      try {
        input.user.password = await bcrypt
          .hash(input.user.password, 10)
          .then((hashed) => hashed);
        return await db.user.create({
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
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  updateUser: protectedProcedure
    .input(updateValidation)
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
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  deleteUser: protectedProcedure
    .input(idValidation)
    .mutation(async ({ input }) => {
      try {
        await db.user.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  getAllDentists: protectedProcedure.query(async () => {
    return await db.user.findMany({
      where: {
        UserDetails: {
          position: "Dentist",
        },
      },
      select: {
        id: true,
        email: true,
        image: true,
        username: true,
        role: true,
        UserDetails: {
          select: {
            id: true,
            lastName: true,
            firstName: true,
            middleName: true,
            birthday: true,
            sex: true,
            address: true,
            contactNumber: true,
            position: true,
            monthlySalary: true,
          },
        },
      },
    });
  }),
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        image: true,
        UserDetails: {
          select: {
            lastName: true,
            firstName: true,
            middleName: true,
            birthday: true,
            sex: true,
            address: true,
            contactNumber: true,
            position: true,
            monthlySalary: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const flattenedUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      image: user.image,
      lastName: user.UserDetails?.lastName || "",
      firstName: user.UserDetails?.firstName || "",
      middleName: user.UserDetails?.middleName || null,
      birthday: user.UserDetails?.birthday || null,
      sex: user.UserDetails?.sex || "",
      address: user.UserDetails?.address || null,
      contactNumber: user.UserDetails?.contactNumber || null,
      position: user.UserDetails?.position || "",
      monthlySalary: user.UserDetails?.monthlySalary || null,
    };

    return flattenedUser;
  }),
  updateCurrentUser: protectedProcedure
    .input(updateProfileValidation)
    .mutation(async ({ input, ctx }) => {
      try {
        const user = await db.user.update({
          where: { id: ctx.session.user.id },
          data: {
            UserDetails: {
              update: {
                ...input.details,
              },
            },
          },
          include: { UserDetails: true },
        });
        return user;
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  updateCurrentUserPassword: protectedProcedure
    .input(updatePasswordValidation)
    .mutation(async ({ input, ctx }) => {
      const { currentPassword, newPassword } = input;

      const user = await db.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      if (!isPasswordValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Your current password is incorrect.",
        });
      }

      try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.user.update({
          where: { id: ctx.session.user.id },
          data: {
            password: hashedPassword,
          },
        });
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
