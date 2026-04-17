"use client";

import DateCell from "@/components/shared/cell/DateCell";
import StatusBadgeCell from "@/components/shared/cell/StatusBadgeCell";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { MapPin, DollarSign } from "lucide-react";
import Image from "next/image";

export interface ITurfListItem {
  id: string;
  name: string;
  address: string;
  images: string[];
  hourlyRate: number;
  turfStatus: "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "DELETED";
  createdAt: string;
  owner: {
    name: string;
    userId: string;
  };
}

export const turfColumns: ColumnDef<ITurfListItem>[] = [
  {
    id: "turf",
    header: "Turf",
    accessorKey: "name",
    cell: ({ row }) => {
        const { name, images, address } = row.original;
        return (
            <div className="flex items-center gap-3">
                <div className="relative h-10 w-16 overflow-hidden rounded-md border bg-muted">
                    {images?.[0] ? (
                        <Image
                            src={images[0]}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground uppercase font-bold">
                            No Img
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold">{name}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate max-w-[150px]">{address}</span>
                    </div>
                </div>
            </div>
        )
    }
  },
  {
    id: "owner",
    header: "Owner",
    accessorKey: "owner.name",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.owner?.name || "N/A"}</span>
    ),
  },
  {
    id: "hourlyRate",
    header: "Hourly Rate",
    accessorKey: "hourlyRate",
    cell: ({ row }) => {
        const rate = row.original.hourlyRate;
        return (
            <div className="flex items-center gap-1 font-semibold text-emerald-600">
                <DollarSign className="h-4 w-4" />
                <span>{rate.toFixed(2)}</span>
            </div>
        )
    }
  },
  {
    id: "turfStatus",
    header: "Status",
    accessorKey: "turfStatus",
    cell: ({ row }) => <StatusBadgeCell status={row.original.turfStatus} />,
  },
  {
    id: "createdAt",
    header: "Registered On",
    accessorKey: "createdAt",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
];
