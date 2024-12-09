/*
  Warnings:

  - You are about to drop the column `refferedBy` on the `Patient` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "sex" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactNumber" TEXT,
    "email" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "nationality" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "referredBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Patient" ("address", "birthday", "contactNumber", "createdAt", "email", "firstName", "id", "lastName", "middleName", "nationality", "occupation", "sex", "updatedAt") SELECT "address", "birthday", "contactNumber", "createdAt", "email", "firstName", "id", "lastName", "middleName", "nationality", "occupation", "sex", "updatedAt" FROM "Patient";
DROP TABLE "Patient";
ALTER TABLE "new_Patient" RENAME TO "Patient";
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
