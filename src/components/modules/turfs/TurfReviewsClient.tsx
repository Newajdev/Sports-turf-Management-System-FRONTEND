"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTurfReviews } from "@/services/review.services";
import { queryKeys } from "@/lib/queryKeys";

const PAGE_SIZE = 5;

interface TurfReviewsClientProps {
  turfId: string;
}

export function TurfReviewsClient({ turfId }: TurfReviewsClientProps) {
  const [page, setPage] = useState(1);

  const queryString = `page=${page}&limit=${PAGE_SIZE}`;
  const { data: response, isLoading, isFetching } = useQuery({
    queryKey: queryKeys.turfReviews(turfId, queryString),
    queryFn: () => getTurfReviews(turfId, queryString),
  });

  const [reviews, setReviews] = useState<
    Array<{
      id: string;
      rating: number;
      comment?: string;
      player?: { user?: { name?: string }; name?: string };
    }>
  >([]);
  const meta = response?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const hasMore = page < totalPages;

  useEffect(() => {
    if (!response?.success) return;
    const pageReviews = (response.data ?? []) as typeof reviews;
    setReviews((prev) => {
      if (page === 1) return pageReviews;
      const ids = new Set(prev.map((r) => r.id));
      const added = pageReviews.filter((r) => !ids.has(r.id));
      return [...prev, ...added];
    });
  }, [response, page]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!reviews.length && page === 1) {
    return (
      <p className="text-muted-foreground text-sm italic">
        No reviews yet. Be the first to book and review!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="p-4 rounded-xl border border-border/50 bg-muted/20"
        >
          <div className="flex items-center justify-between mb-2 gap-2">
            <span className="font-medium text-sm text-foreground">
              {review.player?.user?.name ?? review.player?.name ?? "Player"}
            </span>
            <div className="flex items-center gap-1 text-amber-500 shrink-0">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-semibold text-sm">{review.rating}/5</span>
            </div>
          </div>
          {review.comment ? (
            <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
          ) : (
            <p className="text-sm text-muted-foreground/60 italic">No written comment</p>
          )}
        </div>
      ))}

      {(hasMore || page > 1) && (
        <div className="flex justify-center gap-2 pt-2">
          {page > 1 && (
            <Button
              variant="outline"
              size="sm"
              disabled={isFetching}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
          )}
          {hasMore && (
            <Button
              variant="outline"
              size="sm"
              disabled={isFetching}
              onClick={() => setPage((p) => p + 1)}
            >
              {isFetching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                `Load more (${page}/${totalPages})`
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
