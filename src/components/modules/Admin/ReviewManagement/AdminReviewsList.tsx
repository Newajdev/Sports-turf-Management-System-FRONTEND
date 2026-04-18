"use client";

import { useQuery } from "@tanstack/react-query";
import { getTurfReviews } from "@/services/review.services";
import DataTable from "@/components/shared/table/DataTable";
import { adminReviewColumns } from "./adminReviewColumns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface AdminReviewsListProps {
  turfId: string;
}

const AdminReviewsList = ({ turfId }: AdminReviewsListProps) => {
  const { data: reviewsResponse, isLoading } = useQuery({
    queryKey: ["admin-reviews", turfId],
    queryFn: () => getTurfReviews(turfId),
    enabled: !!turfId,
  });

  if (!turfId) {
    return (
      <Alert className="bg-muted/40 border-dashed">
        <Info className="h-4 w-4" />
        <AlertTitle>Select a Turf</AlertTitle>
        <AlertDescription>
          Please select a turf from the list to see its platform reviews.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <DataTable
        columns={adminReviewColumns}
        data={reviewsResponse?.data || []}
        isLoading={isLoading}
        emptyMessage="No reviews found for this turf."
      />
      
      <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-2">
          <Info className="h-3 w-3" />
          Note: Admin review deletion is currently restricted. Monitoring only mode enabled.
      </p>
    </div>
  );
};

export default AdminReviewsList;
