"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ITurf } from "@/interface/turf.interface";
import TurfEditSections from "./TurfEditSections";
import {
  TURF_EDIT_SECTION_META,
  type TurfEditSectionId,
} from "./turfEditSectionMeta";

interface TurfSectionEditDialogProps {
  turf: ITurf;
  section: TurfEditSectionId | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
}

export default function TurfSectionEditDialog({
  turf,
  section,
  open,
  onOpenChange,
  onUpdated,
}: TurfSectionEditDialogProps) {
  if (!section) return null;

  const meta = TURF_EDIT_SECTION_META[section];

  const handleUpdated = () => {
    onUpdated();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>{meta.title}</DialogTitle>
          <DialogDescription>{meta.description}</DialogDescription>
        </DialogHeader>
        <TurfEditSections
          turf={turf}
          sections={[section]}
          hideSectionTitles
          onUpdated={handleUpdated}
        />
      </DialogContent>
    </Dialog>
  );
}
