"use client";

import DateCell from "@/components/shared/cell/DateCell";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export interface ISportType {
  id: string;
  title: string;
  icon?: string;
  createdAt: string;
}

export const sportTypeColumns: ColumnDef<ISportType>[] = [
  {
    id: "title",
    header: "Sport Title",
    accessorKey: "title",
    cell: ({ row }) => {
        const { title, icon } = row.original;
        return (
            <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 overflow-hidden rounded-full border bg-muted p-1">
                    {icon ? (
                        <Image
                            src={icon}
                            alt={title}
                            fill
                            className="object-contain"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground uppercase font-bold">
                            N/A
                        </div>
                    )}
                </div>
                <span className="text-sm font-semibold">{title}</span>
            </div>
        )
    }
  },
  {
    id: "createdAt",
    header: "Created On",
    accessorKey: "createdAt",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
];
