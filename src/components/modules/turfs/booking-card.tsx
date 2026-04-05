"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TurfItem, TurfSlot } from "@/interface/turf.interface"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface BookingCardProps {
  turf: TurfItem
}

export function BookingCard({ turf }: BookingCardProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = React.useState<TurfSlot | null>(null)

  const handleBooking = () => {
    if (!date || !selectedSlot) return
    console.log("Booking requested:", {
      turfId: turf.id,
      date: format(date, "yyyy-MM-dd"),
      slotId: selectedSlot.id,
    })
    // Implement booking logic here
  }

  return (
    <Card className="sticky top-24 w-full  border-border/50 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
      <CardHeader className=" border-b border-emerald-500/20 py-6">
        <div className="flex items-baseline justify-between">
          <CardTitle className="text-5xl font-bold text-foreground italic uppercase">৳ {turf.hourlyRate}</CardTitle>
          <span className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">/ Per Hour</span>
        </div>
        <CardDescription className="text-emerald-500 font-medium">Free cancellation up to 24h before</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        {/* Date Selection */}
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Select Date</label>
          <Popover>
            <PopoverTrigger>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-medium h-12 rounded-xl bg-secondary/30 border-border/50 hover:bg-secondary/50 transition-all",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-emerald-500" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-2xl border-border/50" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="bg-background"
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Separator className="bg-border/30" />

        {/* Slot Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Available Slots</label>
          <div className="grid grid-cols-2 gap-2">
            {turf.turfSlots?.map((ts) => (
              <Button
                key={ts.id}
                variant={selectedSlot?.id === ts.id ? "default" : "outline"}
                className={cn(
                  "h-auto py-3 px-4 flex flex-col items-center gap-1 rounded-xl transition-all border-border/50",
                  selectedSlot?.id === ts.id 
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20" 
                    : "bg-secondary/30 hover:bg-secondary/50"
                )}
                onClick={() => setSelectedSlot(ts)}
              >
                <span className="text-sm font-bold">{ts.slot.startTime}</span>
                <span className={cn(
                  "text-[10px] uppercase font-bold tracking-wider",
                  selectedSlot?.id === ts.id ? "text-emerald-100" : "text-muted-foreground"
                )}>
                  {ts.slot.duration} Min
                </span>
              </Button>
            ))}
          </div>
          {turf.turfSlots?.length === 0 && (
             <p className="text-sm text-muted-foreground text-center py-4 italic">No slots available for this date.</p>
          )}
        </div>

        {/* Pricing Summary (Optional) */}
        {selectedSlot && (
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
            <span className="text-sm font-medium text-emerald-500">Selected: {selectedSlot.slot.startTime}</span>
            <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/20 text-emerald-500 font-bold uppercase">Ready</Badge>
          </div>
        )}
      </CardContent>

      <CardFooter className="pb-8 pt-2 px-6">
        <Button 
          className="w-full h-14 text-white text-lg font-bold rounded-2xl bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98]"
          disabled={!date || !selectedSlot}
          onClick={handleBooking}
        >
          {selectedSlot ? `Book for ৳ ${selectedSlot.price}` : "Select a Slot"}
        </Button>
      </CardFooter>
    </Card>
  )
}
