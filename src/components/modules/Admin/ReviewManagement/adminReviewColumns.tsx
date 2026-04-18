"use client";

import DateCell from "@/components/shared/cell/DateCell";
import { Star } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

export interface IReviewListItem {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  player: {
    name: string;
    user: {
      image?: string;
    };
  };
}

export const adminReviewColumns: ColumnDef<IReviewListItem>[] = [
  {
    id: "rating",
    header: "Rating",
    accessorKey: "rating",
    cell: ({ row }) => {
        const rating = row.original.rating;
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                        key={star} 
                        className={cn(
                            "h-3 w-3", 
                            star <= rating ? "fill-amber-400 text-amber-400" : "text-muted/30"
                        )} 
                    />
                ))}
            </div>
        )
    }
  },
  {
    id: "comment",
    header: "Comment",
    accessorKey: "comment",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground line-clamp-2 max-w-[300px]">
        {row.original.comment || "No comment provided."}
      </span>
    ),
  },
  {
    id: "player",
    header: "Player",
    accessorKey: "player.name",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.player?.name}</span>
    ),
  },
  {
    id: "createdAt",
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
];
