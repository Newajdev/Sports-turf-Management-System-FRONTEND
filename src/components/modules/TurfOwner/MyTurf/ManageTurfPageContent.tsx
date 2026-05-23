"use client";

import { useEffect, useState } from "react";
import { getMyTurf } from "@/services/turf.services";
import EmptyTurfState from "@/components/modules/TurfOwner/MyTurf/EmptyTurfState";
import MyTurfProfile from "@/components/modules/TurfOwner/MyTurf/MyTurfProfile";
import TurfForm from "@/components/modules/TurfOwner/MyTurf/TurfForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ITurf } from "@/interface/turf.interface";

export function ManageTurfPageContent() {
  const [turf, setTurf] = useState<ITurf | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchTurf = async () => {
    setLoading(true);
    const data = await getMyTurf();
    setTurf((data as ITurf | null) ?? null);
    setLoading(false);
  };

  useEffect(() => {
    fetchTurf();
  }, []);

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    fetchTurf();
  };

  if (loading) {
    return (
      <div className="space-y-8 p-6">
        <Skeleton className="h-[300px] w-full rounded-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-80 w-full rounded-2xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-60 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <MapPin className="h-8 w-8 text-primary" />
            My Venue Management
          </h2>
          <p className="text-muted-foreground font-medium mt-1">
            Control your sports facility details, images, and operational status.
          </p>
        </div>
      </div>

      {turf ? (
        <MyTurfProfile turf={turf} onEditClick={() => setIsFormOpen(true)} />
      ) : (
        <EmptyTurfState onCreateClick={() => setIsFormOpen(true)} />
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-0 border-none shadow-2xl">
          <div className="p-8 space-y-8">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black tracking-tight">
                {turf ? "Update Venue Profile" : "Register New Sports Venue"}
              </DialogTitle>
              <Alert className="bg-primary/5 border-primary/20 text-primary mt-4">
                <Info className="h-4 w-4" />
                <AlertTitle className="font-bold">Pro Tip</AlertTitle>
                <AlertDescription className="text-xs opacity-90">
                  High-quality images and a detailed description help attract 40%
                  more bookings.
                </AlertDescription>
              </Alert>
            </DialogHeader>

            <TurfForm initialData={turf} onSuccess={handleFormSuccess} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
