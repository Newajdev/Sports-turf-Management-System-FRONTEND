/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Layers } from "lucide-react";

interface MasterSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  deletingSlot: any | null;
  onSuccess: (slot: any, isUpdate: boolean) => void;
}

export default function DeleteMasterSlotModal({
  isOpen,
  onClose,
  deletingSlot,
  onSuccess,
}: MasterSlotModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (deletingSlot: any) => {
    deletingSlot as string;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            {deletingSlot
              ? "Edit Slot"
              : "Are You Sure You want To Delate this Slot"}
          </DialogTitle>
          <DialogDescription>
            {"If you delate a slot it can be recovered"}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            type="submit"
            disabled={isSubmitting}
            className={"py-5"}
          >
            {isSubmitting ? "Deleting..." : "Delate Slot"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
