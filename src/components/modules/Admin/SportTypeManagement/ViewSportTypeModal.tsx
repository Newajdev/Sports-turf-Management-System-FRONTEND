"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ISportType } from "./sportTypeColumns";

interface ViewSportTypeModalProps {
  sportType: ISportType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewSportTypeModal = ({
  sportType,
  open,
  onOpenChange,
}: ViewSportTypeModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle>Sport Type Details</DialogTitle>
          <DialogDescription>
            View the sport type icon and title.
          </DialogDescription>
        </DialogHeader>

        {sportType && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border bg-muted p-3">
              {sportType.icon ? (
                <Image
                  src={sportType.icon}
                  alt={sportType.title}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-bold text-muted-foreground">
                  N/A
                </div>
              )}
            </div>
            <p className="text-xl font-semibold">{sportType.title}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewSportTypeModal;
