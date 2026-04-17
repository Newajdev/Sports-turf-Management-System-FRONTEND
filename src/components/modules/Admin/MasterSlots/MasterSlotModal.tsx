"use client";

import { useEffect, useState } from "react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { adminCreateMasterSlot, adminUpdateMasterSlot } from "@/services/slot.services";
import { Clock, Timer, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface MasterSlotModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingSlot: any | null;
    onSuccess: (slot: any, isUpdate: boolean) => void;
}

export default function MasterSlotModal({ 
    isOpen, 
    onClose, 
    editingSlot, 
    onSuccess 
}: MasterSlotModalProps) {
    const [formData, setFormData] = useState({
        slotType: "MORNING",
        startTime: "",
        endTime: "",
        duration: "60"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editingSlot) {
            setFormData({
                slotType: editingSlot.slotType,
                startTime: editingSlot.startTime,
                endTime: editingSlot.endTime,
                interval: "" // Interval is only for creation
            });
        } else {
            setFormData({
                slotType: "MORNING",
                startTime: "",
                endTime: "",
                interval: "60"
            });
        }
    }, [editingSlot, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.startTime || !formData.endTime) {
            toast.error("Please provide both start and end times");
            return;
        }

        setIsSubmitting(true);
        
        // Prepare payload based on whether we are creating or updating
        let res;
        if (editingSlot) {
            const payload = {
                startTime: formData.startTime,
                endTime: formData.endTime
            };
            res = await adminUpdateMasterSlot(editingSlot.id, payload);
        } else {
            const payload = {
                slotType: formData.slotType,
                startTime: formData.startTime,
                endTime: formData.endTime,
                interval: formData.interval ? parseInt(formData.interval) : undefined
            };
            res = await adminCreateMasterSlot(payload);
        }

        if (res.success) {
            toast.success(editingSlot ? "Template updated" : "Template created");
            // If it created multiple slots, we'll need a full refresh which revalidatePath already handles
            onSuccess(res.data, !!editingSlot);
            onClose();
        } else {
            toast.error(res.message || "Something went wrong");
        }
        setIsSubmitting(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Layers className="h-5 w-5 text-primary" />
                            {editingSlot ? "Edit Slot" : "Create Slot Templates"}
                        </DialogTitle>
                        <DialogDescription>
                            {editingSlot 
                                ? "Update the time range for this specific slot." 
                                : "Define a range. Use Interval to auto-generate multiple slots."}
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                        {!editingSlot && (
                            <div className="grid gap-2">
                                <Label htmlFor="slotType">Slot Segment</Label>
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                    {["MORNING", "AFTERNOON", "EVENING", "NIGHT"].map((type) => (
                                        <Button
                                            key={type}
                                            type="button"
                                            variant={formData.slotType === type ? "default" : "outline"}
                                            onClick={() => setFormData({...formData, slotType: type})}
                                            className={cn(
                                                "capitalize h-9 font-medium transition-all duration-200",
                                                formData.slotType === type 
                                                    ? "bg-primary text-white shadow-md" 
                                                    : "hover:bg-primary/10 hover:text-primary"
                                            )}
                                        >
                                            {type.toLowerCase()}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="startTime" className="flex items-center gap-1">
                                    <Clock size={12} /> Start Time
                                </Label>
                                <Input 
                                    id="startTime"
                                    type="time"
                                    value={formData.startTime}
                                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                                    required
                                    className="cursor-pointer"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="endTime" className="flex items-center gap-1">
                                    <Clock size={12} /> End Time
                                </Label>
                                <Input 
                                    id="endTime"
                                    type="time"
                                    value={formData.endTime}
                                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                                    required
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>

                        {!editingSlot && (
                            <div className="grid gap-2">
                                <Label htmlFor="interval" className="flex items-center gap-1">
                                    <Timer size={14} /> Interval (Minutes) - Optional
                                </Label>
                                <Input 
                                    id="interval"
                                    type="number"
                                    placeholder="e.g. 60 (Empty for single slot)"
                                    value={formData.interval}
                                    onChange={(e) => setFormData({...formData, interval: e.target.value})}
                                />
                                <p className="text-[10px] text-muted-foreground italic">
                                    Leave empty if you want to create just one single slot for the full range.
                                </p>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : editingSlot ? "Update Template" : "Create Template"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
