/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";

import {
  adminCreateMasterSlot,
  adminUpdateMasterSlot,
} from "@/services/slot.services";

import { Clock, Layers, Timer } from "lucide-react";

import { cn } from "@/lib/utils";
import { toApiTimeValue, toTimeInputValue } from "@/lib/timeUtils";

type SlotType = "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT";

interface MasterSlot {
  id: string;
  slotType: SlotType;
  startTime: string;
  endTime: string;
}

interface FormData {
  slotType: SlotType;
  startTime: string;
  endTime: string;
  interval: string;
}

interface MasterSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingSlot: MasterSlot | null;
  onSuccess: (slot: MasterSlot, isUpdate: boolean) => void;
}

const INITIAL_FORM_DATA: FormData = {
  slotType: "MORNING",
  startTime: "",
  endTime: "",
  interval: "60",
};

const SLOT_TYPES: SlotType[] = ["MORNING", "AFTERNOON", "EVENING", "NIGHT"];

export default function MasterSlotModal({
  isOpen,
  onClose,
  editingSlot,
  onSuccess,
}: MasterSlotModalProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingSlot) {
      setFormData({
        slotType: editingSlot.slotType,
        startTime: toTimeInputValue(editingSlot.startTime),
        endTime: toTimeInputValue(editingSlot.endTime),
        interval: "",
      });

      return;
    }

    setFormData(INITIAL_FORM_DATA);
  }, [editingSlot, isOpen]);

  const updateField = <K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { startTime, endTime, interval, slotType } = formData;

    if (!startTime || !endTime) {
      toast.error("Please provide both start and end times");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = editingSlot
        ? await adminUpdateMasterSlot(editingSlot.id, {
            startTime: toApiTimeValue(startTime),
            endTime: toApiTimeValue(endTime),
          })
        : await adminCreateMasterSlot({
            slotType,
            startTime: toApiTimeValue(startTime),
            endTime: toApiTimeValue(endTime),
            interval: interval ? Number.parseInt(interval, 10) : undefined,
          });

      if (!response.success) {
        toast.error(response.message || "Something went wrong");
        return;
      }

      toast.success(
        editingSlot
          ? "Template updated successfully"
          : "Template created successfully",
      );

      onSuccess(response.data as any, Boolean(editingSlot));

      onClose();
    } catch (error) {
      console.error(error);

      toast.error("Failed to save slot");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />

              {editingSlot ? "Edit Slot" : "Create Slot Templates"}
            </DialogTitle>

            <DialogDescription>
              {editingSlot
                ? "Update the time range for this slot."
                : "Define a range and generate slots automatically."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {!editingSlot && (
              <div className="grid gap-2">
                <Label htmlFor="slotType">Slot Segment</Label>

                <div className="grid grid-cols-2 gap-2">
                  {SLOT_TYPES.map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant={
                        formData.slotType === type ? "default" : "outline"
                      }
                      onClick={() => updateField("slotType", type)}
                      className={cn(
                        "h-9 capitalize font-medium transition-all duration-200",
                        formData.slotType === type
                          ? "shadow-md"
                          : "hover:bg-primary/10 hover:text-primary",
                      )}
                    >
                      {type.toLowerCase()}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startTime" className="flex items-center gap-1">
                  <Clock size={12} />
                  Start Time
                </Label>

                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => updateField("startTime", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="endTime" className="flex items-center gap-1">
                  <Clock size={12} />
                  End Time
                </Label>

                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => updateField("endTime", e.target.value)}
                  required
                />
              </div>
            </div>

            {!editingSlot && (
              <div className="grid gap-2">
                <Label htmlFor="interval" className="flex items-center gap-1">
                  <Timer size={14} />
                  Interval (Minutes)
                </Label>

                <Input
                  id="interval"
                  type="number"
                  min={1}
                  placeholder="60"
                  value={formData.interval}
                  onChange={(e) => updateField("interval", e.target.value)}
                />

                <p className="text-[10px] italic text-muted-foreground">
                  Leave empty to create a single slot.
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} className="py-5">
              {isSubmitting
                ? "Saving..."
                : editingSlot
                  ? "Update Template"
                  : "Create Template"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
