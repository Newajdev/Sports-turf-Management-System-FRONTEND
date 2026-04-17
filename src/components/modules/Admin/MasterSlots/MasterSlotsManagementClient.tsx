"use client";

import { useState } from "react";
import { 
    Plus, 
    Trash2, 
    Edit, 
    Clock, 
    Settings2,
    Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { adminDeleteMasterSlot } from "@/services/slot.services";
import MasterSlotModal from "./MasterSlotModal";

interface MasterSlotsManagementClientProps {
    initialMasterSlots: any[];
}

const getMinutes = (timeStr: string) => {
    if (!timeStr) return 0;
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
};

const sortSlots = (slots: any[]) => {
    return [...slots].sort((a, b) => getMinutes(a.startTime) - getMinutes(b.startTime));
};

export default function MasterSlotsManagementClient({ 
    initialMasterSlots 
}: MasterSlotsManagementClientProps) {
    const [masterSlots, setMasterSlots] = useState(sortSlots(initialMasterSlots));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSlot, setEditingSlot] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this slot template? This will not affect existing bookings but will prevent owners from adding it.")) return;
        
        setIsDeleting(id);
        const res = await adminDeleteMasterSlot(id);
        if (res.success) {
            setMasterSlots((prev) => prev.filter((s) => s.id !== id));
            toast.success("Master slot deleted successfully");
        } else {
            toast.error(res.message || "Failed to delete slot");
        }
        setIsDeleting(null);
    };

    const handleEdit = (slot: any) => {
        setEditingSlot(slot);
        setIsModalOpen(true);
    };

    const handleSuccess = (data: any, isUpdate: boolean) => {
        if (isUpdate) {
            setMasterSlots((prev) => {
                const updated = prev.map((s) => s.id === data.id ? data : s);
                return sortSlots(updated);
            });
        } else {
            const newSlots = Array.isArray(data) ? data : [data];
            setMasterSlots((prev) => sortSlots([...prev, ...newSlots]));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-2xl border border-primary/20">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Master Slots Configuration</h1>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1 italic">
                        <Settings2 className="w-4 h-4" /> Define time block templates for all turf owners
                    </p>
                </div>
                <Button 
                    onClick={() => { setEditingSlot(null); setIsModalOpen(true); }}
                    className="bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20"
                >
                    <Plus className="mr-2 h-4 w-4" /> Create New Template
                </Button>
            </div>

            <Card className="border-none shadow-xl overflow-hidden">
                <CardHeader className="bg-muted/30 border-b">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                             <Layers className="text-primary" size={20} />
                             System Templates
                        </CardTitle>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                            {masterSlots.length} Slots Defined
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {masterSlots.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                            <Clock className="text-muted-foreground w-12 h-12 opacity-20 mb-4" />
                            <h3 className="text-lg font-semibold text-muted-foreground">No slot templates defined yet</h3>
                            <Button variant="link" onClick={() => setIsModalOpen(true)}>Create the first template</Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/10">
                                    <TableHead className="w-[150px]">Type</TableHead>
                                    <TableHead>Start Time</TableHead>
                                    <TableHead>End Time</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead className="text-right w-[120px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {masterSlots.map((slot) => (
                                    <TableRow key={slot.id} className="group transition-all hover:bg-primary/5">
                                        <TableCell>
                                            <Badge variant="secondary" className="px-3 capitalize font-bold bg-primary/10 text-primary hover:bg-primary/20 border-none">
                                                {slot.slotType}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-mono font-bold text-lg">{slot.startTime}</TableCell>
                                        <TableCell className="font-mono font-bold text-lg">{slot.endTime}</TableCell>
                                        <TableCell>
                                            <span className="text-muted-foreground font-medium">{slot.duration} mins</span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon"
                                                    onClick={() => handleEdit(slot)}
                                                    className="rounded-full hover:bg-primary/10 text-primary transition-transform active:scale-90"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon"
                                                    disabled={isDeleting === slot.id}
                                                    onClick={() => handleDelete(slot.id)}
                                                    className="rounded-full hover:bg-red-50 text-red-500 transition-transform active:scale-90"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <MasterSlotModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editingSlot={editingSlot}
                onSuccess={handleSuccess}
            />
        </div>
    );
}
