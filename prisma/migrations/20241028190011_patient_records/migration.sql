-- CreateTable
CREATE TABLE "Dentist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Dentist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MedicalHistory" (
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
    CONSTRAINT "MedicalHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Procedure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "procedureName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Treatment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "procedureId" TEXT NOT NULL,
    CONSTRAINT "Treatment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Treatment_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "Procedure" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "dentistId" TEXT NOT NULL,
    "appointmentDateTime" DATETIME NOT NULL,
    CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "Dentist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "age" INTEGER NOT NULL,
    "sex" TEXT,
    "address" TEXT NOT NULL,
    "contactNumber" TEXT,
    "email" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "refferedBy" TEXT NOT NULL,
    "dentistId" TEXT NOT NULL,
    CONSTRAINT "Patient_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "Dentist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicalHistory_patientId_key" ON "MedicalHistory"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");
