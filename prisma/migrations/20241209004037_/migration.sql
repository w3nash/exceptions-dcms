/*
  Warnings:

  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "VerificationToken_identifier_token_key";

-- DropIndex
DROP INDEX "VerificationToken_token_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VerificationToken";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "birthday" DATETIME NOT NULL,
    "sex" TEXT NOT NULL,
    "address" TEXT,
    "contactNumber" TEXT,
    "position" TEXT NOT NULL,
    "monthlySalary" TEXT,
    CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserDetails" ("address", "birthday", "contactNumber", "firstName", "id", "lastName", "middleName", "monthlySalary", "position", "sex", "userId") SELECT "address", "birthday", "contactNumber", "firstName", "id", "lastName", "middleName", "monthlySalary", "position", "sex", "userId" FROM "UserDetails";
DROP TABLE "UserDetails";
ALTER TABLE "new_UserDetails" RENAME TO "UserDetails";
CREATE UNIQUE INDEX "UserDetails_userId_key" ON "UserDetails"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
