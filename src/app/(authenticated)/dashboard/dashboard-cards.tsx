import { CalendarCheck, CalendarDays, UserCheck, UserPlus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/app/components/ui/card";

type CountsData = {
  bookedAppointments: number;
  successfullAppointments: number;
  registeredPatients: number;
  patientsTreatments: number;
};

export default async function DashboardCards({
  countsData,
}: {
  countsData: CountsData;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle className="truncate text-center text-2xl font-black text-green-600">
            Booked Appointments
          </CardTitle>
          <CardDescription className="text-center">
            The total number of booked appointments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center justify-center gap-8">
            <CalendarCheck className="h-16 w-16 flex-shrink-0 fill-green-500 stroke-green-700" />
            <div className="text-4xl font-black text-green-600">
              {countsData.bookedAppointments}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="truncate text-center text-2xl font-black text-blue-600">
            Succesful Appointments
          </CardTitle>
          <CardDescription className="text-center">
            The total number of successful appointments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center justify-center gap-8">
            <CalendarDays className="h-16 w-16 flex-shrink-0 fill-blue-500 stroke-blue-700" />
            <div className="text-4xl font-black text-blue-600">
              {countsData.successfullAppointments}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="truncate text-center text-2xl font-black text-purple-600">
            Registered Patients
          </CardTitle>
          <CardDescription className="text-center">
            The total number of registered patients.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center justify-center gap-8">
            <UserCheck className="h-16 w-16 flex-shrink-0 fill-purple-500 stroke-purple-700" />
            <div className="text-4xl font-black text-purple-600">
              {countsData.registeredPatients}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="truncate text-center text-2xl font-black text-rose-600">
            Patients Treatments
          </CardTitle>
          <CardDescription className="text-center">
            The total number of patients treatments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center justify-center gap-8">
            <UserPlus className="h-16 w-16 flex-shrink-0 fill-rose-500 stroke-rose-700" />
            <div className="text-4xl font-black text-rose-600">
              {countsData.patientsTreatments}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
