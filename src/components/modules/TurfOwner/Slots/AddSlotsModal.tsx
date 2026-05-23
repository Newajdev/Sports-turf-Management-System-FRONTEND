/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarRange, Info, Check, Search } from "lucide-react";
import { bulkCreateTurfSlots } from "@/services/slot.services";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AddSlotsModalProps {
    isOpen: boolean;
    onClose: () => void;
    turfId: string;
    masterSlots: any[];
    existingSlotIds: string[];
    onSuccess: (newSlots: any[]) => void;
}

export default function AddSlotsModal({
    isOpen,
    onClose,
    turfId,
    masterSlots,
    existingSlotIds,
    onSuccess,
}: AddSlotsModalProps) {
    const [selectedSlotIds, setSelectedSlotIds] = useState<string[]>([]);
    const [price, setPrice] = useState<number>(1000);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const availableSlots = useMemo(() => {
        return masterSlots.filter(ms => !existingSlotIds.includes(ms.id));
    }, [masterSlots, existingSlotIds]);

    const filteredSlots = useMemo(() => {
        if (!searchTerm) return availableSlots;
        return availableSlots.filter(s => 
            s.startTime.toLowerCase().includes(searchTerm.toLowerCase()) || 
            s.endTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.slotType.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [availableSlots, searchTerm]);

    const toggleSlot = (id: string) => {
        setSelectedSlotIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedSlotIds.length === filteredSlots.length) {
            setSelectedSlotIds([]);
        } else {
            setSelectedSlotIds(filteredSlots.map(s => s.id));
        }
    };

    const handleSubmit = async () => {
        if (selectedSlotIds.length === 0) {
            toast.error("Please select at least one time slot");
            return;
        }

        if (price <= 0) {
            toast.error("Please set a valid price");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await bulkCreateTurfSlots({
                turfId,
                slotIds: selectedSlotIds,
                price,
            });

            if (res.success) {
                toast.success(`Successfully activated ${selectedSlotIds.length} slots`);
                onSuccess((res.data ?? []) as any[]);
                setSelectedSlotIds([]);
                onClose();
            } else {
                toast.error(res.message || "Failed to add slots");
            }
        } catch {
            toast.error(
                "Request timed out. If slots were created, refresh the page before retrying.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl rounded-[3rem] p-0 border-none bg-background shadow-3xl overflow-hidden">
                <div className="flex flex-col h-[85vh] max-h-[800px]">
                    {/* Header */}
                    <div className="p-8 pb-4 bg-gradient-to-b from-primary/10 to-transparent border-b border-border">
                        <DialogHeader>
                            <div className="flex items-center gap-4 mb-2">
                                <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                                    <CalendarRange className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <DialogTitle className="text-2xl font-black uppercase italic tracking-tight text-foreground">Configure Availability</DialogTitle>
                                    <DialogDescription className="text-muted-foreground font-medium">Activate time blocks from the master system and set your pricing.</DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>
                    </div>

                    <div className="flex-1 overflow-hidden p-8 space-y-8 flex flex-col overflow-y-scroll mb-3">
                        {/* Search and Price Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[0.65rem] font-black uppercase tracking-widest text-muted-foreground pl-2">Search Slots</Label>
                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                        placeholder="Filter by time or type..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="h-14 pl-12 bg-muted/50 border-border rounded-2xl font-bold tracking-widest focus-visible:ring-primary/20 text-foreground"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[0.65rem] font-black uppercase tracking-widest text-muted-foreground pl-2">Slot Price (৳)</Label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-black italic">৳</span>
                                    <Input 
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                        className="h-14 pl-10 bg-muted/50 border-border rounded-2xl font-black text-xl italic tracking-tighter text-primary focus-visible:ring-primary/20"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Slots Selection */}
                        <div className="flex-1 flex flex-col min-h-0">
                            <div className="flex items-center justify-between mb-4 px-2">
                                <Label className="text-[0.65rem] font-black uppercase tracking-widest text-muted-foreground">Select Time Blocks ({selectedSlotIds.length} chosen)</Label>
                                <button 
                                    onClick={handleSelectAll}
                                    className="text-[0.65rem] font-black uppercase tracking-widest text-primary hover:underline"
                                >
                                    {selectedSlotIds.length === filteredSlots.length ? "Deselect All" : "Select All Available"}
                                </button>
                            </div>

                            <ScrollArea className="flex-1 rounded-3xl border border-border bg-muted/30 p-4">
                                {filteredSlots.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <Info className="h-10 w-10 text-muted-foreground opacity-20 mb-4" />
                                        <p className="text-sm font-bold text-muted-foreground">No matching master slots found.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {filteredSlots.map((slot) => {
                                            const isSelected = selectedSlotIds.includes(slot.id);
                                            return (
                                                <button
                                                    key={slot.id}
                                                    onClick={() => toggleSlot(slot.id)}
                                                    className={cn(
                                                        "relative h-20 p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1 group",
                                                        isSelected 
                                                            ? "bg-primary border-primary shadow-lg shadow-primary/20" 
                                                            : "bg-background border-border hover:border-primary/50"
                                                    )}
                                                >
                                                    <span className={cn(
                                                        "text-xs font-black uppercase italic tracking-tighter transition-colors",
                                                        isSelected ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                                                    )}>
                                                        {slot.slotType}
                                                    </span>
                                                    <span className={cn(
                                                        "text-sm font-black italic tracking-widest transition-colors",
                                                        isSelected ? "text-primary-foreground" : "text-foreground"
                                                    )}>
                                                        {slot.startTime}
                                                    </span>
                                                    {isSelected && (
                                                        <div className="absolute top-2 right-2 h-4 w-4 bg-primary-foreground rounded-full flex items-center justify-center">
                                                            <Check className="h-2.5 w-2.5 text-primary" />
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </ScrollArea>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-8 border-t border-border bg-muted/30">
                        <div className="flex items-center gap-4">
                            <Button 
                                variant="outline" 
                                onClick={onClose}
                                className="h-14 flex-1 border-border bg-background text-foreground font-black uppercase italic tracking-widest rounded-2xl hover:bg-muted"
                            >
                                Cancel
                            </Button>
                            <Button 
                                onClick={handleSubmit}
                                disabled={isSubmitting || selectedSlotIds.length === 0}
                                className="h-14 flex-[2] bg-primary text-primary-foreground font-black uppercase italic tracking-widest rounded-2xl hover:scale-[1.02] shadow-xl shadow-primary/20 transition-all disabled:opacity-50 border-none"
                            >
                                {isSubmitting ? "Activating..." : "Activate Now"}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
