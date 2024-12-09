import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "~/app/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "~/app/components/ui/button";
import { Badge } from "~/app/components/ui/badge";
import Link from "next/link";
import { deleteAppointment } from "~/app/lib/server-actions";

export type Appointment = {
  id: string;
  type: string;
  status: string;
  patientName: string;
  dentistName: string | null;
  patientId: string;
  schedule: Date;
};

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="ml-4">{row.getValue("id") as string}</div>
    ),
  },
  {
    accessorKey: "patientName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Patient Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-semibold">
        {row.getValue("patientName") as string}
      </div>
    ),
  },
  {
    accessorKey: "dentistName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Dentist Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("dentistName") as string}</div>,
  },
  {
    accessorKey: "schedule",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Schedule
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue("schedule") as Date).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "type",
    header: () => <div>Type</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("type") as string}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        <Badge variant={row.getValue("status")}>
          {row.getValue("status") as string}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link className="w-full" href={`/appointments/${appointment.id}`}>
                View appointment
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                className="w-full"
                href={`/appointments/${appointment.id}/edit`}
              >
                Edit appointment
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteAppointment(appointment.id);
              }}
            >
              Delete appointment
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                className="w-full"
                href={`/patient-records/patient/${appointment.patientId}`}
              >
                View patient
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
