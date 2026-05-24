"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export interface IPlayerReport {
  id: string;
  reason: string;
  description: string;
  turfId: string;
  createdAt: string;
  turf?: {
    name: string;
  };
}

export const playerReportsColumns: ColumnDef<IPlayerReport>[] = [
  {
    id: "turf",
    header: "Turf",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">{row.original.turf?.name ?? "—"}</span>
        <Link
          href={`/book-a-turf/${row.original.turfId}`}
          className="text-[10px] text-primary hover:underline"
        >
          View turf
        </Link>
      </div>
    ),
  },
  {
    id: "reason",
    header: "Reason",
    cell: ({ row }) => {
      const reason = row.original.reason.replace(/_/g, " ");
      return (
        <Badge
          variant="outline"
          className="bg-amber-500/10 text-amber-600 border-amber-500/20 capitalize text-[10px]"
        >
          {reason.toLowerCase()}
        </Badge>
      );
    },
  },
  {
    id: "description",
    header: "Description",
    cell: ({ row }) => (
      <p className="text-sm text-muted-foreground truncate max-w-[240px]">
        {row.original.description}
      </p>
    ),
  },
  {
    id: "date",
    header: "Submitted",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
      </span>
    ),
  },
];
