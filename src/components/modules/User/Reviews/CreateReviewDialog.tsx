"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/services/review.services";
import { createReviewSchema } from "@/zod/review-report.validation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface CreateReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
  turfId: string;
  turfName?: string;
}

export function CreateReviewDialog({
  open,
  onOpenChange,
  bookingId,
  turfId,
  turfName,
}: CreateReviewDialogProps) {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = createReviewSchema.safeParse({
      bookingId,
      turfId,
      rating,
      comment: comment.trim() || undefined,
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid review");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createReview(parsed.data);
      if (response.success) {
        toast.success("Review submitted successfully");
        queryClient.invalidateQueries({ queryKey: ["player-reviews"] });
        queryClient.invalidateQueries({ queryKey: ["player-bookings"] });
        onOpenChange(false);
        setComment("");
        setRating(5);
      } else {
        toast.error(response.message || "Failed to submit review");
      }
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
          <DialogDescription>
            Share your experience{turfName ? ` at ${turfName}` : ""}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={rating === value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRating(value)}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comment (optional)</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others about your experience..."
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
