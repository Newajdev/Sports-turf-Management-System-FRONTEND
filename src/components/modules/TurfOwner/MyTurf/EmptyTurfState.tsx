"use client";

import { Button } from "@/components/ui/button";
import { Plus, Layout } from "lucide-react";

interface EmptyTurfStateProps {
    onCreateClick: () => void;
}

const EmptyTurfState = ({ onCreateClick }: EmptyTurfStateProps) => {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-muted-foreground/20 bg-muted/5 p-12 text-center transition-all hover:bg-muted/10">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Layout className="h-12 w-12" />
            </div>
            
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
                No Turf Found
            </h2>
            
            <p className="mb-8 max-w-md text-lg text-muted-foreground">
                You haven&apos;t registered your sports turf yet. Create one now to start receiving bookings and managing your venue.
            </p>
            
            <Button 
                onClick={onCreateClick}
                size="lg" 
                className="h-14 gap-2 rounded-2xl px-8 text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
                <Plus className="h-6 w-6" />
                Register My Turf
            </Button>
        </div>
    );
};

export default EmptyTurfState;
