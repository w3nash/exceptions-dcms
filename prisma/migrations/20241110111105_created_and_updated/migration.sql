/*
  Warnings:

  - You are about to drop the column `appointmentDateTime` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `schedule` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `MedicalHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Made the column `sex` on table `Patient` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Procedure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Treatment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "dentistId" TEXT NOT NULL,
    "schedule" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "Dentist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("dentistId", "id", "patientId") SELECT "dentistId", "id", "patientId" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
CREATE TABLE "new_MedicalHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "hospitalization" TEXT,
    "medications" TEXT,
    "diseases" TEXT,
    "allergies" TEXT,
    "xray" TEXT,
    "facialMarks" TEXT,
    "tobaccoConsumption" TEXT,
    "alcoholConsumption" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MedicalHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MedicalHistory" ("alcoholConsumption", "allergies", "diseases", "facialMarks", "hospitalization", "id", "medications", "patientId", "tobaccoConsumption", "xray") SELECT "alcoholConsumption", "allergies", "diseases", "facialMarks", "hospitalization", "id", "medications", "patientId", "tobaccoConsumption", "xray" FROM "MedicalHistory";
DROP TABLE "MedicalHistory";
ALTER TABLE "new_MedicalHistory" RENAME TO "MedicalHistory";
CREATE UNIQUE INDEX "MedicalHistory_patientId_key" ON "MedicalHistory"("patientId");
CREATE TABLE "new_Patient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactNumber" TEXT,
    "email" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "refferedBy" TEXT,
    "dentistId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Patient_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "Dentist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Patient" ("address", "age", "birthday", "contactNumber", "dentistId", "email", "firstName", "id", "lastName", "middleName", "nationality", "occupation", "refferedBy", "sex") SELECT "address", "age", "birthday", "contactNumber", "dentistId", "email", "firstName", "id", "lastName", "middleName", "nationality", "occupation", "refferedBy", "sex" FROM "Patient";
DROP TABLE "Patient";
ALTER TABLE "new_Patient" RENAME TO "Patient";
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");
CREATE TABLE "new_Procedure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "procedureName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Procedure" ("id", "procedureName") SELECT "id", "procedureName" FROM "Procedure";
DROP TABLE "Procedure";
ALTER TABLE "new_Procedure" RENAME TO "Procedure";
CREATE TABLE "new_Treatment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "procedureId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Treatment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Treatment_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "Procedure" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Treatment" ("id", "patientId", "procedureId") SELECT "id", "patientId", "procedureId" FROM "Treatment";
DROP TABLE "Treatment";
ALTER TABLE "new_Treatment" RENAME TO "Treatment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
