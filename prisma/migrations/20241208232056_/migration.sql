/*
  Warnings:

  - You are about to drop the `MedicalHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "MedicalHistory_patientId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MedicalHistory";
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
    CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Appointment_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("createdAt", "dentistId", "id", "patientId", "schedule", "status", "type", "updatedAt") SELECT "createdAt", "dentistId", "id", "patientId", "schedule", "status", "type", "updatedAt" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
