/*
  Warnings:

  - You are about to drop the column `schedule` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `date` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Made the column `sex` on table `UserDetails` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dentistId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("createdAt", "dentistId", "id", "patientId", "status", "type", "updatedAt") SELECT "createdAt", "dentistId", "id", "patientId", "status", "type", "updatedAt" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
CREATE TABLE "new_UserDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "birthday" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
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
