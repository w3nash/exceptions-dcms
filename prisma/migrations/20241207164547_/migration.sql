/*
  Warnings:

  - You are about to drop the `Dentist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `age` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `dentistId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `procedureName` on the `Procedure` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `UserDetails` table. All the data in the column will be lost.
  - Added the required column `type` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `Procedure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Procedure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dentistId` to the `Treatment` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Dentist";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "schedule" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dentistId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("createdAt", "dentistId", "id", "patientId", "schedule", "status", "updatedAt") SELECT "createdAt", "dentistId", "id", "patientId", "schedule", "status", "updatedAt" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
CREATE TABLE "new_Patient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "sex" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactNumber" TEXT,
    "email" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "refferedBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Patient" ("address", "birthday", "contactNumber", "createdAt", "email", "firstName", "id", "lastName", "middleName", "nationality", "occupation", "refferedBy", "sex", "updatedAt") SELECT "address", "birthday", "contactNumber", "createdAt", "email", "firstName", "id", "lastName", "middleName", "nationality", "occupation", "refferedBy", "sex", "updatedAt" FROM "Patient";
DROP TABLE "Patient";
ALTER TABLE "new_Patient" RENAME TO "Patient";
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");
CREATE TABLE "new_Procedure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Procedure" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Procedure";
DROP TABLE "Procedure";
ALTER TABLE "new_Procedure" RENAME TO "Procedure";
CREATE TABLE "new_Treatment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "procedureId" TEXT NOT NULL,
    "dentistId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "appointmentId" TEXT,
    CONSTRAINT "Treatment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Treatment_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "Procedure" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Treatment_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Treatment_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Treatment" ("createdAt", "id", "patientId", "procedureId", "updatedAt") SELECT "createdAt", "id", "patientId", "procedureId", "updatedAt" FROM "Treatment";
DROP TABLE "Treatment";
ALTER TABLE "new_Treatment" RENAME TO "Treatment";
CREATE TABLE "new_UserDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "birthday" TEXT NOT NULL,
    "sex" TEXT,
    "address" TEXT,
    "contactNumber" TEXT,
    "position" TEXT NOT NULL,
    "monthlySalary" TEXT,
    CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserDetails" ("address", "birthday", "contactNumber", "firstName", "id", "lastName", "middleName", "monthlySalary", "position", "sex", "userId") SELECT "address", "birthday", "contactNumber", "firstName", "id", "lastName", "middleName", "monthlySalary", "position", "sex", "userId" FROM "UserDetails";
DROP TABLE "UserDetails";
ALTER TABLE "new_UserDetails" RENAME TO "UserDetails";
CREATE UNIQUE INDEX "UserDetails_userId_key" ON "UserDetails"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
