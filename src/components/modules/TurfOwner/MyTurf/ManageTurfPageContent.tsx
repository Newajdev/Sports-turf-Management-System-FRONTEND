"use client";

import { useEffect, useState } from "react";
import { getMyTurf } from "@/services/turf.services";
import EmptyTurfState from "@/components/modules/TurfOwner/MyTurf/EmptyTurfState";
import MyTurfProfile from "@/components/modules/TurfOwner/MyTurf/MyTurfProfile";
import TurfForm from "@/components/modules/TurfOwner/MyTurf/TurfForm";
import TurfSectionEditDialog from "@/components/modules/TurfOwner/MyTurf/TurfSectionEditDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ITurf } from "@/interface/turf.interface";
import type { TurfEditSectionId } from "./turfEditSectionMeta";

export function ManageTurfPageContent() {
  const [turf, setTurf] = useState<ITurf | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editSection, setEditSection] = useState<TurfEditSectionId | null>(null);

  const fetchTurf = async () => {
    setLoading(true);
    const data = await getMyTurf();
    setTurf((data as ITurf | null) ?? null);
    setLoading(false);
  };

  useEffect(() => {
    void fetchTurf();
  }, []);

  const handleCreateSuccess = () => {
    setIsCreateOpen(false);
    void fetchTurf();
  };

  const handleEditSuccess = () => {
    void fetchTurf();
  };

  const openSectionEdit = (section: TurfEditSectionId) => {
    setEditSection(section);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-48 w-full rounded-lg" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Skeleton className="h-40 w-full rounded-lg lg:col-span-2" />
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Turf</h1>
        <p className="text-muted-foreground">
          View and update your venue details, availability, and gallery.
        </p>
      </div>

      {turf ? (
        <MyTurfProfile turf={turf} onEditSection={openSectionEdit} />
      ) : (
        <EmptyTurfState onCreateClick={() => setIsCreateOpen(true)} />
      )}

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle>Register New Turf</DialogTitle>
            <DialogDescription>
              Name, address, operating hours, and hourly rate are enough to
              register. You can add images and other details later.
            </DialogDescription>
          </DialogHeader>
          <TurfForm onSuccess={handleCreateSuccess} />
        </DialogContent>
      </Dialog>

      {turf && (
        <TurfSectionEditDialog
          turf={turf}
          section={editSection}
          open={editSection !== null}
          onOpenChange={(open) => {
            if (!open) setEditSection(null);
          }}
          onUpdated={handleEditSuccess}
        />
      )}
    </div>
  );
}
