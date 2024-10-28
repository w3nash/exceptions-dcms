-- CreateTable
CREATE TABLE "UserDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "age" INTEGER NOT NULL,
    "sex" TEXT,
    "address" TEXT,
    "contactNumber" TEXT,
    "position" TEXT NOT NULL,
    "monthlySalary" TEXT,
    CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_userId_key" ON "UserDetails"("userId");
