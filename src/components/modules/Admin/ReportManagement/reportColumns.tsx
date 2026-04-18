"use client";

import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";

export interface IReportListItem {
  id: string;
  reason: string;
  description: string;
  playerId: string;
  turfId: string;
  createdAt: string;
  player: {
    name: string;
    userId: string;
  };
  turf: {
    name: string;
    id: string;
  };
}

interface ReportColumnProps {
  onDelete: (id: string) => void;
}

export const getReportColumns = ({ onDelete }: ReportColumnProps): ColumnDef<IReportListItem>[] => [
  {
    id: "target",
    header: "Target Turf",
    accessorKey: "turf.name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{row.original.turf?.name}</span>
        <Link 
            href={`/turfs/${row.original.turfId}`} 
            target="_blank"
            className="flex items-center gap-1 text-[10px] text-primary hover:underline"
        >
            View Turf <ExternalLink className="h-2.5 w-2.5" />
        </Link>
      </div>
    ),
  },
  {
    id: "reason",
    header: "Reason",
    accessorKey: "reason",
    cell: ({ row }) => {
        const reason = row.original.reason.replace(/_/g, " ");
        return (
            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 capitalize text-[10px]">
                {reason.toLowerCase()}
            </Badge>
        )
    }
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground line-clamp-2 max-w-[250px]">
        {row.original.description}
      </span>
    ),
  },
  {
    id: "reporter",
    header: "Reporter",
    accessorKey: "player.name",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.player?.name || "Unknown"}</span>
    ),
  },
  {
    id: "createdAt",
    header: "Reported At",
    accessorKey: "createdAt",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(row.original.id)}
          title="Resolve Report"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
