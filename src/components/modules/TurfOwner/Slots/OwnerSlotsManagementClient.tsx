"use client";

import { useState } from "react";
import { Clock, Plus, Trash2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { deleteTurfSlot } from "@/services/slot.services";
import AddSlotsModal from "./AddSlotsModal";

interface OwnerSlotsManagementClientProps {
  turf: { id: string; name: string };
  masterSlots: {
    id: string;
    startTime?: string;
    endTime?: string;
    slotType?: string;
  }[];
  initialTurfSlots: {
    id: string;
    slotId: string;
    price: number;
    slot?: { startTime?: string; endTime?: string; slotType?: string };
  }[];
}

export default function OwnerSlotsManagementClient({
  turf,
  masterSlots,
  initialTurfSlots,
}: OwnerSlotsManagementClientProps) {
  const [turfSlots, setTurfSlots] = useState(initialTurfSlots);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Deactivate this slot? It will no longer be available for booking.",
      )
    ) {
      return;
    }

    setIsDeleting(id);
    const res = await deleteTurfSlot(id);
    if (res.success) {
      setTurfSlots((prev) => prev.filter((s) => s.id !== id));
      toast.success("Slot deactivated successfully");
    } else {
      toast.error(res.message || "Failed to deactivate slot");
    }
    setIsDeleting(null);
  };

  const handleAddSuccess = (newSlots: typeof initialTurfSlots) => {
    setTurfSlots((prev) => [...prev, ...newSlots]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-linear-to-r from-primary/10 to-transparent p-6 rounded-2xl border border-primary/20">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Slot availability
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Time blocks and pricing for {turf.name}
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add slots
        </Button>
      </div>

      <Card className="border-none shadow-xl overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Layers className="text-primary" size={20} />
              Active slots
            </CardTitle>
            <Badge
              variant="outline"
              className="bg-primary/5 text-primary border-primary/20"
            >
              {turfSlots.length} configured
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {turfSlots.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
              <Clock className="text-muted-foreground w-12 h-12 opacity-20 mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground">
                No slots configured yet
              </h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                Add time blocks from the master list to start accepting bookings.
              </p>
              <Button
                variant="link"
                className="mt-2"
                onClick={() => setIsModalOpen(true)}
              >
                Add your first slot
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10">
                  <TableHead className="w-[150px]">Type</TableHead>
                  <TableHead>Start time</TableHead>
                  <TableHead>End time</TableHead>
                  <TableHead>Price / slot</TableHead>
                  <TableHead className="text-right w-[120px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {turfSlots.map((turfSlot) => {
                  const masterInfo = masterSlots.find(
                    (m) => m.id === turfSlot.slotId,
                  );
                  const startTime =
                    turfSlot.slot?.startTime || masterInfo?.startTime;
                  const endTime =
                    turfSlot.slot?.endTime || masterInfo?.endTime;
                  const slotType =
                    turfSlot.slot?.slotType ||
                    masterInfo?.slotType ||
                    "Standard";

                  return (
                    <TableRow
                      key={turfSlot.id}
                      className="group transition-all hover:bg-primary/5"
                    >
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="px-3 capitalize font-bold bg-primary/10 text-primary hover:bg-primary/20 border-none"
                        >
                          {slotType}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono font-bold">
                        {startTime}
                      </TableCell>
                      <TableCell className="font-mono font-bold">
                        {endTime}
                      </TableCell>
                      <TableCell>
                        <span className="text-muted-foreground font-medium">
                          ৳{turfSlot.price}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isDeleting === turfSlot.id}
                          onClick={() => handleDelete(turfSlot.id)}
                          className="rounded-full hover:bg-red-50 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AddSlotsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        turfId={turf.id}
        masterSlots={masterSlots}
        existingSlotIds={turfSlots.map((ts) => ts.slotId)}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
}
