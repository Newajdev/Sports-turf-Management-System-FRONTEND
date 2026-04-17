import { getAllMasterSlots } from "@/services/slot.services";
import MasterSlotsManagementClient from "@/components/modules/Admin/MasterSlots/MasterSlotsManagementClient";

export const metadata = {
    title: "Master Slots Management | Admin Dashboard",
    description: "Manage system-wide time slot templates",
};

export default async function MasterSlotsManagementPage() {
    const response = await getAllMasterSlots();
    const masterSlots = response?.success ? response.data : [];

    return (
        <div className="container mx-auto py-8">
            <MasterSlotsManagementClient initialMasterSlots={masterSlots} />
        </div>
    );
}
