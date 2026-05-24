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
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { deleteCustomTurfSlot } from "@/services/slot.services";
import { CustomSlotStatus } from "@/interface/enum.interface";
import { toast } from "sonner";
import { EditCustomSlotDialog } from "./EditCustomSlotDialog";
import type { ICustomSlot } from "./playerCustomSlotsColumns";

interface CustomSlotActionsCellProps {
  slot: ICustomSlot;
}

export function CustomSlotActionsCell({ slot }: CustomSlotActionsCellProps) {
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);

  const canModify =
    !slot.isBooked &&
    slot.status !== CustomSlotStatus.ACCEPTED &&
    slot.status !== CustomSlotStatus.COMPLETED;

  const handleDelete = async () => {
    const res = await deleteCustomTurfSlot(slot.id);
    if (res.success) {
      toast.success("Custom slot request removed");
      queryClient.invalidateQueries({ queryKey: ["player-custom-slots"] });
    } else {
      toast.error(res.message || "Failed to delete custom slot");
    }
  };

  if (!canModify) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }

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
            Edit Times
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Cancel Request
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditCustomSlotDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        slot={slot}
      />
    </>
  );
}
