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
import { deleteUser } from "~/app/lib/server-actions";

export type User = {
  id: string;
  email: string;
  username: string;
  role: number;
  lastName: string;
  firstName: string;
  middleName: string | null;
  position: string;
};

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "username",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Username
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("username") as string}</div>,
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
    accessorKey: "middleName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Middle Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("middleName") as string | null}</div>,
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Position
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("position") as string}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

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
              <Link className="w-full" href={`/staff/${user.id}`}>
                View staff
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-full" href={`/staff/${user.id}/edit`}>
                Edit staff
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete staff
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
