import { getMyTurf } from "@/services/turf.services";
import { ITurf } from "@/interface/turf.interface";
import { getAllMasterSlots, getTurfSlotsByTurf } from "@/services/slot.services";
import OwnerSlotsManagementClient from "@/components/modules/TurfOwner/Slots/OwnerSlotsManagementClient";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function OwnerSlotsPage() {
  const turfData = await getMyTurf();
  const turf = turfData as ITurf | null | undefined;

  if (!turf?.id) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Slot availability
          </h1>
          <p className="text-muted-foreground">
            Configure time blocks after you register your turf.
          </p>
        </div>
        <Card className="border-none shadow-xl">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-4">
            <p className="text-muted-foreground">
              Register your turf before managing availability.
            </p>
            <Link href="/turf-owner/dashboard/my-turf">
              <Button>Go to My Turf</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [masterSlotsRes, turfSlotsRes] = await Promise.all([
    getAllMasterSlots(),
    getTurfSlotsByTurf(turf.id),
  ]);

  const masterSlots = (masterSlotsRes.data ?? []) as never[];
  const turfSlots = (turfSlotsRes.data ?? []) as never[];

  return (
    <OwnerSlotsManagementClient
      turf={turf}
      masterSlots={masterSlots}
      initialTurfSlots={turfSlots}
    />
  );
}
