/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `UserDetails` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `UserDetails` table. All the data in the column will be lost.
  - You are about to drop the column `middle_name` on the `UserDetails` table. All the data in the column will be lost.
  - Added the required column `birthday` to the `UserDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `UserDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `UserDetails` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_User" ("email", "emailVerified", "id", "image", "password", "role", "username") SELECT "email", "emailVerified", "id", "image", "password", "role", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE TABLE "new_UserDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "birthday" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" TEXT,
    "address" TEXT,
    "contactNumber" TEXT,
    "position" TEXT NOT NULL,
    "monthlySalary" TEXT,
    CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserDetails" ("address", "age", "contactNumber", "id", "monthlySalary", "position", "sex", "userId") SELECT "address", "age", "contactNumber", "id", "monthlySalary", "position", "sex", "userId" FROM "UserDetails";
DROP TABLE "UserDetails";
ALTER TABLE "new_UserDetails" RENAME TO "UserDetails";
CREATE UNIQUE INDEX "UserDetails_userId_key" ON "UserDetails"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
