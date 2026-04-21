import { getMyTurf } from "@/services/turf.services";
import { getAllMasterSlots, getTurfSlotsByTurf } from "@/services/slot.services";
import OwnerSlotsManagementClient from "@/components/modules/TurfOwner/Slots/OwnerSlotsManagementClient";
import EmptyTurfState from "@/components/modules/TurfOwner/MyTurf/EmptyTurfState";
import { Clock } from "lucide-react";

export default async function OwnerSlotsPage() {
    const turf = await getMyTurf();
    
    if (!turf) {
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
                <div className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-[3rem] p-12">
                   <EmptyTurfState hideCreate={false} />
                </div>
            </div>
        );
    }

    const [masterSlotsRes, turfSlotsRes] = await Promise.all([
        getAllMasterSlots(),
        getTurfSlotsByTurf(turf.id)
    ]);

    const masterSlots = masterSlotsRes.data || [];
    const turfSlots = turfSlotsRes.data || [];

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
