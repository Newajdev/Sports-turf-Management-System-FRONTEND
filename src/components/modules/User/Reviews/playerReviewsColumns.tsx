"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Star } from "lucide-react";
import { deleteReview } from "@/services/review.services";
import { toast } from "sonner";

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
    cell: ({ row }) => {
      const review = row.original;

      const handleDelete = async () => {
        const res = await deleteReview(review.id);
        if (res.success) toast.success("Review deleted!");
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
            <DropdownMenuItem onClick={handleDelete} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Review
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
