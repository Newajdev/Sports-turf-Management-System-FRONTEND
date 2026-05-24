"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Star } from "lucide-react";
import { ReviewActionsCell } from "./ReviewActionsCell";

export interface IReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  turf: {
    name: string;
  };
}

export const playerReviewsColumns: ColumnDef<IReview>[] = [
  {
    id: "turf",
    header: "Turf",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.turf?.name}</span>
    ),
  },
  {
    id: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <span className="text-sm font-bold">{row.original.rating}</span>
        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
      </div>
    ),
  },
  {
    id: "comment",
    header: "Comment",
    cell: ({ row }) => (
      <p className="text-sm text-muted-foreground truncate max-w-[200px]">
        {row.original.comment}
      </p>
    ),
  },
  {
    id: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ReviewActionsCell review={row.original} />,
  },
];
