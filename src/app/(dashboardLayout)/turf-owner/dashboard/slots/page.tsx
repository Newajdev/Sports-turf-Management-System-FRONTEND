import { getMyTurf } from "@/services/turf.services";
import { ITurf } from "@/interface/turf.interface";
import { getAllMasterSlots, getTurfSlotsByTurf } from "@/services/slot.services";
import OwnerSlotsManagementClient from "@/components/modules/TurfOwner/Slots/OwnerSlotsManagementClient";
import { Clock, Layout } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function OwnerSlotsPage() {
    const turfData = await getMyTurf();
    const turf = turfData as ITurf | null | undefined;
    
    if (!turf?.id) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-10">
                    <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                        <Clock className="h-8 w-8 text-primary" />
                        Availability Management
                    </h2>
                    <p className="text-muted-foreground font-medium mt-1">
                        Define your operational hours and pricing once your venue is registered.
                    </p>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center gap-4 py-16">
                   <Layout className="h-12 w-12 text-primary" />
                   <p className="text-muted-foreground">Register your turf before managing availability.</p>
                   <Link href="/turf-owner/dashboard/my-turf">
                     <Button>Create My Turf</Button>
                   </Link>
                </div>
            </div>
        );
    }

    const [masterSlotsRes, turfSlotsRes] = await Promise.all([
        getAllMasterSlots(),
        getTurfSlotsByTurf(turf.id)
    ]);

    const masterSlots = (masterSlotsRes.data ?? []) as never[];
    const turfSlots = (turfSlotsRes.data ?? []) as never[];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <OwnerSlotsManagementClient 
                turf={turf}
                masterSlots={masterSlots}
                initialTurfSlots={turfSlots}
            />
        </div>
    );
}
