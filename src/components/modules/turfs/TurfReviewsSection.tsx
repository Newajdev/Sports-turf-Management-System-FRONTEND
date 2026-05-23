import { Star } from "lucide-react";
import { getTurfReviews } from "@/services/review.services";

interface TurfReviewsSectionProps {
  turfId: string;
}

export async function TurfReviewsSection({ turfId }: TurfReviewsSectionProps) {
  const response = await getTurfReviews(turfId, "limit=5");
  const reviews = response?.data ?? [];

  if (!reviews.length) {
    return (
      <div className="space-y-4 pt-6 border-t border-border/50">
        <h3 className="text-2xl font-bold uppercase italic tracking-tighter">Reviews</h3>
        <p className="text-muted-foreground text-sm italic">No reviews yet. Be the first to book and review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-6 border-t border-border/50">
      <h3 className="text-2xl font-bold uppercase italic tracking-tighter">Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review: {
          id: string;
          rating: number;
          comment?: string;
          player?: { user?: { name?: string } };
        }) => (
          <div
            key={review.id}
            className="p-4 rounded-xl bg-secondary/30 border border-border/50"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">
                {review.player?.user?.name ?? "Player"}
              </span>
              <div className="flex items-center gap-1 text-emerald-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold text-sm">{review.rating}</span>
              </div>
            </div>
            {review.comment && (
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
