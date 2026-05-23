"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, MapPin } from "lucide-react";

interface EmptyTurfStateProps {
  onCreateClick: () => void;
}

const EmptyTurfState = ({ onCreateClick }: EmptyTurfStateProps) => {
  return (
    <Card className="border-none shadow-xl">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MapPin className="h-7 w-7" />
        </div>
        <h2 className="mb-2 text-lg font-semibold">No turf registered</h2>
        <p className="mb-6 max-w-md text-sm text-muted-foreground">
          Register your sports venue to start managing bookings, slots, and
          availability.
        </p>
        <Button onClick={onCreateClick} className="gap-2">
          <Plus className="h-4 w-4" />
          Register my turf
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyTurfState;
