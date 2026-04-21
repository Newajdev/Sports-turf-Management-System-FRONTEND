"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { acceptBooking, rejectBooking, cancelBooking } from "@/services/booking.services";
import { toast } from "sonner";

export interface IBooking {
  id: string;
  date: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "REJECTED";
  playerId: string;
  turfId: string;
  player: {
    name: string;
    email: string;
  };
  turfSlot?: {
    price: number;
    slot: {
      startTime: string;
      endTime: string;
    }
  };
  customSlot?: {
    price: number;
    startTime: string;
    endTime: string;
  };
}

export const ownerBookingsColumns: ColumnDef<IBooking>[] = [
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
    id: "player",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{row.original.player?.name}</span>
        <span className="text-[10px] text-muted-foreground">{row.original.player?.email}</span>
      </div>
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
      const status = row.original.status;
      
      const variants: Record<string, string> = {
        PENDING: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
        CONFIRMED: "bg-green-500/10 text-green-600 border-green-500/20",
        CANCELLED: "bg-red-500/10 text-red-600 border-red-500/20",
        REJECTED: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      };

      return (
        <Badge variant="outline" className={cn("font-bold text-[10px] tracking-wider", variants[status])}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const booking = row.original;

      const handleAccept = async () => {
        const res = await acceptBooking(booking.id);
        if (res.success) toast.success("Booking accepted!");
        else toast.error(res.message);
      };

      const handleReject = async () => {
        const res = await rejectBooking(booking.id);
        if (res.success) toast.success("Booking rejected!");
        else toast.error(res.message);
      };

      const handleCancel = async () => {
        const res = await cancelBooking(booking.id);
        if (res.success) toast.success("Booking cancelled!");
        else toast.error(res.message);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {booking.status === "PENDING" && (
              <>
                <DropdownMenuItem onClick={handleAccept} className="text-green-600">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Accept Booking
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleReject} className="text-orange-600">
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Booking
                </DropdownMenuItem>
              </>
            )}
            {(booking.status === "CONFIRMED") && (
              <DropdownMenuItem onClick={handleCancel} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Cancel Booking
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
