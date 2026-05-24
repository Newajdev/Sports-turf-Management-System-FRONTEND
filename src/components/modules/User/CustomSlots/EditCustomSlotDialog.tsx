"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateCustomTurfSlot } from "@/services/slot.services";
import { queryKeys } from "@/lib/queryKeys";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { ICustomSlot } from "./playerCustomSlotsColumns";

interface EditCustomSlotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slot: ICustomSlot | null;
}

export function EditCustomSlotDialog({
  open,
  onOpenChange,
  slot,
}: EditCustomSlotDialogProps) {
  const queryClient = useQueryClient();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (slot) {
      setStartTime(slot.startTime);
      setEndTime(slot.endTime);
    }
  }, [slot]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot) return;

    if (!startTime || !endTime) {
      toast.error("Start and end times are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await updateCustomTurfSlot(slot.id, { startTime, endTime });
      if (res.success) {
        toast.success("Custom slot updated. Awaiting owner approval.");
        queryClient.invalidateQueries({ queryKey: ["player-custom-slots"] });
        onOpenChange(false);
      } else {
        toast.error(res.message || "Failed to update custom slot");
      }
    } catch {
      toast.error("Failed to update custom slot");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Custom Slot</DialogTitle>
          <DialogDescription>
            Update your requested time slot. Changes require owner re-approval.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Start time</Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">End time</Label>
            <Input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
