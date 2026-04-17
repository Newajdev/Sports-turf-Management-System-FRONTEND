"use client";

import DateCell from "@/components/shared/cell/DateCell";
import StatusBadgeCell from "@/components/shared/cell/StatusBadgeCell";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export interface IUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "PLAYER" | "TURF_OWNER" | "SYSTEM_ADMIN";
  userStatus: "ACTIVE" | "BLOCKED" | "INACTIVE" | "DELETED";
  createdAt: string;
}

export const userColumns: ColumnDef<IUser>[] = [
  {
    id: "user",
    header: "User",
    accessorKey: "name",
    cell: ({ row }) => (
      <UserInfoCell
        name={row.original.name}
        email={row.original.email}
        profilePhoto={row.original.image}
      />
    ),
  },
  {
    id: "role",
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <Badge variant={role === "SYSTEM_ADMIN" ? "default" : "secondary"}>
          {role.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    id: "userStatus",
    header: "Status",
    accessorKey: "userStatus",
    cell: ({ row }) => <StatusBadgeCell status={row.original.userStatus} />,
  },
  {
    id: "createdAt",
    header: "Joined On",
    accessorKey: "createdAt",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
];
