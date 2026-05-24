"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Pencil } from "lucide-react";
import { deleteReview } from "@/services/review.services";
import { toast } from "sonner";
import { EditReviewDialog } from "./EditReviewDialog";
import type { IReview } from "./playerReviewsColumns";

interface ReviewActionsCellProps {
  review: IReview;
}

export function ReviewActionsCell({ review }: ReviewActionsCellProps) {
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteReview(review.id);
    if (res.success) {
      toast.success("Review deleted!");
      queryClient.invalidateQueries({ queryKey: ["player-reviews"] });
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
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
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Review
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Review
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditReviewDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        review={review}
      />
    </>
  );
}
