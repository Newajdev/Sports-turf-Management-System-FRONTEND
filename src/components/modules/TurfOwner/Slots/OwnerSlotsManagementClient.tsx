"use client";

import { useState } from "react";
import { 
    Clock, 
    Plus, 
    Trash2, 
    CalendarCheck, 
    IndianRupee,
    Info,
    LayoutGrid
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
import { deleteTurfSlot } from "@/services/slot.services";
import AddSlotsModal from "./AddSlotsModal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface OwnerSlotsManagementClientProps {
    turf: any;
    masterSlots: any[];
    initialTurfSlots: any[];
}

export default function OwnerSlotsManagementClient({ 
    turf, 
    masterSlots, 
    initialTurfSlots 
}: OwnerSlotsManagementClientProps) {
    const [turfSlots, setTurfSlots] = useState(initialTurfSlots);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to deactivate this slot? It will no longer be available for players to book.")) return;
        
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

    const handleAddSuccess = (newSlots: any[]) => {
        setTurfSlots((prev) => [...prev, ...newSlots]);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight flex items-center gap-4 text-foreground">
                        <Clock className="h-10 w-10 text-primary" />
                        Manage Availability
                    </h1>
                    <p className="text-muted-foreground font-medium mt-1">
                        Control your operational time blocks and set hourly pricing for <span className="text-foreground font-bold">{turf.name}</span>.
                    </p>
                </div>
                <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase italic tracking-widest rounded-2xl shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 border-none"
                >
                    <Plus className="mr-2 h-6 w-6" /> Add New Slots
                </Button>
            </div>

            <Alert className="bg-primary/5 border-primary/20 text-primary rounded-3xl p-6">
                <Info className="h-5 w-5" />
                <AlertTitle className="font-black uppercase italic tracking-wider mb-1">Operational Tip</AlertTitle>
                <AlertDescription className="text-sm font-medium opacity-90">
                    Maintain at least 8-10 active slots across peak hours (5 PM - 11 PM) to maximize your booking conversion rates.
                </AlertDescription>
            </Alert>

            {/* Slots Table */}
            <Card className="border border-border bg-card shadow-premium rounded-[3rem] overflow-hidden">
                <CardHeader className="p-8 pb-4 border-b border-border">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-black uppercase italic flex items-center gap-3 text-foreground">
                             <LayoutGrid className="text-primary" size={24} />
                             Active Slots Inventory
                        </CardTitle>
                        <Badge variant="outline" className="px-4 py-1.5 rounded-full bg-primary/10 text-primary border-primary/20 font-black italic">
                            {turfSlots.length} Active Intervals
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0 text-foreground">
                    {turfSlots.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 text-center px-4">
                            <CalendarCheck className="text-muted-foreground w-20 h-20 opacity-10 mb-8" />
                            <h3 className="text-2xl font-black text-foreground uppercase italic mb-4">No Slots Active</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto mb-10 leading-relaxed">
                                Your venue is currently showing as unavailable. Add some slots from the master list to start accepting bookings.
                            </p>
                            <Button 
                                variant="outline" 
                                onClick={() => setIsModalOpen(true)}
                                className="h-12 px-8 border-border bg-muted/50 text-foreground font-bold uppercase italic rounded-xl hover:bg-muted"
                            >
                                Configure Availability
                            </Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-border hover:bg-transparent px-8">
                                        <TableHead className="pl-8 text-[0.65rem] font-black uppercase tracking-[0.2em] text-muted-foreground py-6">Type</TableHead>
                                        <TableHead className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-muted-foreground py-6">Start Time</TableHead>
                                        <TableHead className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-muted-foreground py-6">End Time</TableHead>
                                        <TableHead className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-muted-foreground py-6">Price / Slot</TableHead>
                                        <TableHead className="pr-8 text-right text-[0.65rem] font-black uppercase tracking-[0.2em] text-muted-foreground py-6">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {turfSlots.map((turfSlot) => {
                                        // Robust lookup fallback in case relation isn't populated
                                        const masterInfo = masterSlots.find(m => m.id === turfSlot.slotId);
                                        const startTime = turfSlot.slot?.startTime || masterInfo?.startTime;
                                        const endTime = turfSlot.slot?.endTime || masterInfo?.endTime;
                                        const slotType = turfSlot.slot?.slotType || masterInfo?.slotType || "Standard";

                                        return (
                                            <TableRow key={turfSlot.id} className="group border-border transition-all hover:bg-muted/50">
                                                <TableCell className="pl-8 py-6">
                                                    <Badge variant="secondary" className="px-4 py-1 rounded-lg capitalize font-black text-[0.6rem] bg-primary/20 text-primary border-none tracking-widest italic">
                                                        {slotType}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="py-6 font-black text-xl italic text-foreground">{startTime}</TableCell>
                                                <TableCell className="py-6 font-black text-xl italic text-foreground">{endTime}</TableCell>
                                                <TableCell className="py-6">
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                                                        <span className="text-lg font-black italic">৳{turfSlot.price}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="pr-8 py-6 text-right">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon"
                                                        disabled={isDeleting === turfSlot.id}
                                                        onClick={() => handleDelete(turfSlot.id)}
                                                        className="h-12 w-12 rounded-2xl hover:bg-red-500/10 text-red-500 transition-all active:scale-90 border border-transparent hover:border-red-500/20"
                                                    >
                                                        <Trash2 className="h-6 w-6" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            <AddSlotsModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                turfId={turf.id}
                masterSlots={masterSlots}
                existingSlotIds={turfSlots.map(ts => ts.slotId)}
                onSuccess={handleAddSuccess}
            />
        </div>
    );
}
