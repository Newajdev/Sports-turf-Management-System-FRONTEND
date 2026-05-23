"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BookingActionsCell } from "./BookingActionsCell";
import { CustomSlotStatus } from "@/interface/enum.interface";

export interface IBooking {
  id: string;
  date: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "REJECTED" | "COMPLETED";
  paymentStatus?: "UNPAID" | "PAID" | "REFUNDED" | "FAILED";
  playerId: string;
  turfId: string;
  customSlotId?: string;
  turfSlotId?: string;
  turf: {
    name: string;
  };
  turfSlot?: {
    price: number;
    slot: {
      startTime: string;
      endTime: string;
    };
  };
  customSlot?: {
    price: number;
    startTime: string;
    endTime: string;
    status?: CustomSlotStatus;
  };
}

export const playerBookingsColumns: ColumnDef<IBooking>[] = [
  {
    id: "id",
    header: "Booking ID",
    accessorKey: "id",
    cell: ({ row }) => (
      <span className="text-[10px] font-mono font-medium text-muted-foreground">
        #{row.original.id.slice(0, 8)}
      </span>
    ),
  },
  {
    id: "turf",
    header: "Turf",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.turf?.name}</span>
    ),
  },
  {
    id: "schedule",
    header: "Schedule",
    cell: ({ row }) => {
      const { date, turfSlot, customSlot } = row.original;
      const startTime = turfSlot?.slot.startTime || customSlot?.startTime;
      const endTime = turfSlot?.slot.endTime || customSlot?.endTime;

      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{format(new Date(date), "MMM dd, yyyy")}</span>
          <span className="text-[10px] text-muted-foreground">
            {startTime} - {endTime}
          </span>
        </div>
      );
    },
  },
  {
    id: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.turfSlot?.price || row.original.customSlot?.price || 0;
      return (
        <span className="text-sm font-bold text-primary">৳{amount}</span>
      );
    },
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const { status, customSlotId, customSlot, paymentStatus } = row.original;

      let label = status;
      if (
        status === "PENDING" &&
        customSlotId &&
        customSlot?.status === CustomSlotStatus.PENDING
      ) {
        label = "PENDING" as typeof status;
      }

      const variants: Record<string, string> = {
        PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
        CONFIRMED: "bg-green-500/10 text-green-600 border-green-500/20",
        CANCELLED: "bg-red-500/10 text-red-600 border-red-500/20",
        REJECTED: "bg-gray-500/10 text-gray-600 border-gray-500/20",
        COMPLETED: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      };

      const displayLabel =
        status === "PENDING" &&
        customSlotId &&
        customSlot?.status === CustomSlotStatus.PENDING
          ? "AWAITING APPROVAL"
          : status === "PENDING" &&
              customSlotId &&
              customSlot?.status === CustomSlotStatus.ACCEPTED &&
              paymentStatus === "UNPAID"
            ? "READY TO PAY"
            : label;

      return (
        <Badge
          variant="outline"
          className={cn("font-bold text-[10px] tracking-wider", variants[status])}
        >
          {displayLabel}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <BookingActionsCell booking={row.original} />,
  },
];
