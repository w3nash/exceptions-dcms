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
import Link from "next/link";
import { deletePatient } from "~/app/lib/server-actions";

export type Patient = {
  id: string;
  lastName: string;
  firstName: string;
  sex: string;
  email: string;
  nationality: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Patient>[] = [
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
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-semibold">{row.getValue("email") as string}</div>
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("lastName") as string}</div>,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        First Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("firstName") as string}</div>,
  },
  {
    accessorKey: "sex",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Sex
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sex") as string}</div>
    ),
  },
  {
    accessorKey: "nationality",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nationality
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("nationality") as string}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue("createdAt") as Date).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Updated At
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue("updatedAt") as Date).toLocaleString()}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const patient = row.original;

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
              <Link
                className="w-full"
                href={`/patient-records/patient/${patient.id}`}
              >
                View patient
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                className="w-full"
                href={`/patient-records/patient/${patient.id}/edit`}
              >
                Edit patient
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deletePatient(patient.id);
              }}
            >
              Delete patient
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
