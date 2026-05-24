"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CustomSlotActionsCell } from "./CustomSlotActionsCell";
import { CustomSlotStatus } from "@/interface/enum.interface";

export interface ICustomSlot {
  id: string;
  startTime: string;
  endTime: string;
  date: string;
  sportType: string;
  playersCount: number;
  price: number;
  status: CustomSlotStatus;
  isBooked: boolean;
  turfId: string;
  turf?: { name: string };
}

const statusVariant: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  ACCEPTED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  REJECTED: "bg-red-500/10 text-red-600 border-red-500/20",
  CANCELLED: "bg-muted text-muted-foreground",
  COMPLETED: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

export const playerCustomSlotsColumns: ColumnDef<ICustomSlot>[] = [
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
    id: "schedule",
    header: "Schedule",
    cell: ({ row }) => (
      <div className="text-sm">
        <p>{format(new Date(row.original.date), "MMM dd, yyyy")}</p>
        <p className="text-muted-foreground text-xs">
          {row.original.startTime} – {row.original.endTime}
        </p>
      </div>
    ),
  },
  {
    id: "sport",
    header: "Sport",
    cell: ({ row }) => (
      <span className="text-sm capitalize">{row.original.sportType}</span>
    ),
  },
  {
    id: "price",
    header: "Est. Price",
    cell: ({ row }) => (
      <span className="text-sm font-medium">৳{row.original.price}</span>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={statusVariant[row.original.status] ?? ""}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CustomSlotActionsCell slot={row.original} />,
  },
];
