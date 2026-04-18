"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllTurfs } from "@/services/admin.services";
import { useState } from "react";
import AdminReviewsList from "@/components/modules/Admin/ReviewManagement/AdminReviewsList";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function ReviewsManagementPage() {
  const [selectedTurfId, setSelectedTurfId] = useState<string>("");

  const { data: turfsResponse, isLoading: isLoadingTurfs } = useQuery({
    queryKey: ["admin-turfs-list"],
    queryFn: () => getAllTurfs("limit=100"),
  });

  const turfs = turfsResponse?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Review Moderation</h1>
          <p className="text-muted-foreground">
            Monitor and manage reviews submitted by players across all registered turfs.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Sidebar/Selector */}
        <Card className="md:col-span-1 shadow-premium-subtle border-none h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Select Turf
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedTurfId} value={selectedTurfId}>
                <SelectTrigger className="w-full bg-muted/40 border-none focus:ring-primary/20">
                    <SelectValue placeholder={isLoadingTurfs ? "Loading..." : "Choose a turf"} />
                </SelectTrigger>
                <SelectContent>
                    {turfs.map((turf: any) => (
                        <SelectItem key={turf.id} value={turf.id}>
                            {turf.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <p className="mt-4 text-[10px] text-muted-foreground italic leading-relaxed">
                Currently, you can monitor reviews by selecting a specific turf.
            </p>
          </CardContent>
        </Card>

        {/* Review List Display */}
        <div className="md:col-span-3">
          <AdminReviewsList turfId={selectedTurfId} />
        </div>
      </div>
    </div>
  );
}
