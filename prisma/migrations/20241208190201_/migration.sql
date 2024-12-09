/*
  Warnings:

  - You are about to drop the `Procedure` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Treatment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Procedure";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Treatment";
PRAGMA foreign_keys=on;
