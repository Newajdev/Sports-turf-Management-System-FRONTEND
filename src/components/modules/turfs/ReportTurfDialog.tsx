"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Flag, Loader2 } from "lucide-react";
import { createReport } from "@/services/report.services";
import { createReportSchema } from "@/zod/review-report.validation";
import { ReportReason } from "@/interface/enum.interface";
import { toast } from "sonner";

interface ReportTurfDialogProps {
  turfId: string;
  turfName: string;
  isLoggedIn?: boolean;
}

export function ReportTurfDialog({ turfId, turfName, isLoggedIn = false }: ReportTurfDialogProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ReportReason>(ReportReason.OTHER);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error("Please log in to report a turf");
      return;
    }

    const parsed = createReportSchema.safeParse({
      turfId,
      reason,
      description,
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid report");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createReport(parsed.data);
      if (response.success) {
        toast.success("Report submitted. Our team will review it.");
        setOpen(false);
        setDescription("");
      } else {
        toast.error(response.message || "Failed to submit report");
      }
    } catch {
      toast.error("Failed to submit report");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Flag className="h-4 w-4" />
          Report Turf
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report {turfName}</DialogTitle>
          <DialogDescription>
            Tell us what went wrong. Reports are reviewed by administrators.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Reason</Label>
            <Select
              value={reason}
              onValueChange={(v) => v && setReason(v as ReportReason)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ReportReason).map((r) => (
                  <SelectItem key={r} value={r}>
                    {r.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="report-desc">Description</Label>
            <Textarea
              id="report-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue (min 10 characters)..."
              rows={4}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
