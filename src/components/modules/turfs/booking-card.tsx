"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ITurf } from "@/interface/turf.interface"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { createBooking } from "@/services/booking.services"
import { getAvailableSlots, IAvailableTurfSlot } from "@/services/slot.services"
import { createBookingSchema } from "@/zod/booking.validation"
import { queryKeys } from "@/lib/queryKeys"
import { toast } from "sonner"

interface BookingCardProps {
  turf: ITurf
  isLoggedIn?: boolean
}

export function BookingCard({ turf, isLoggedIn = false }: BookingCardProps) {
  const router = useRouter()
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = React.useState<IAvailableTurfSlot | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const dateString = date ? format(date, "yyyy-MM-dd") : ""

  const { data: availabilityResponse, isLoading: isLoadingSlots } = useQuery({
    queryKey: queryKeys.turfAvailability(turf.id, dateString),
    queryFn: () => getAvailableSlots(turf.id, dateString),
    enabled: !!dateString,
  })

  const availableSlots = React.useMemo(() => {
    const slots = availabilityResponse?.data ?? []
    return slots.filter((s) => !s.isBooked)
  }, [availabilityResponse?.data])

  React.useEffect(() => {
    setSelectedSlot(null)
  }, [dateString])

  const handleBooking = async () => {
    if (!isLoggedIn) {
      router.push(`/auth/login?redirect=/book-a-turf/${turf.id}`)
      return
    }

    if (!date || !selectedSlot) return

    const payload = {
      turfId: turf.id,
      turfSlotId: selectedSlot.id,
      date: dateString,
    }

    const parsed = createBookingSchema.safeParse(payload)
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid booking details")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await createBooking(parsed.data)

      if (!response.success) {
        toast.error(response.message || "Failed to create booking")
        return
      }

      const paymentUrl = response.data?.paymentUrl
      if (paymentUrl) {
        toast.success("Redirecting to payment...")
        window.location.href = paymentUrl
        return
      }

      toast.success("Booking created successfully")
      router.push("/dashboard/bookings")
    } catch {
      toast.error("Failed to create booking. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="sticky top-24 w-full bg-zinc-950/40 border-border/50 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
      <CardHeader className="bg-emerald-500/10 border-b border-emerald-500/20 pb-6">
        <div className="flex items-baseline justify-between">
          <CardTitle className="text-3xl font-bold text-foreground italic uppercase">৳ {turf.hourlyRate}</CardTitle>
          <span className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">/ Per Hour</span>
        </div>
        <CardDescription className="text-emerald-500 font-medium font-bold uppercase tracking-widest text-[10px]">Free cancellation up to 24h before</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Select Date</label>
          <Popover>
            <PopoverTrigger>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-medium h-12 rounded-xl bg-secondary/30 border-border/50 hover:bg-secondary/50 transition-all",
                  !date && "text-muted-foreground"
                )}
                type="button"
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
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Separator className="bg-border/30" />

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Available Slots</label>
          {isLoadingSlots ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 md:grid-cols-2">
              {availableSlots.map((ts) => (
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
                  type="button"
                >
                  <span className="text-sm font-bold">{ts.slot?.startTime}</span>
                  <span className={cn(
                    "text-[10px] uppercase font-bold tracking-wider",
                    selectedSlot?.id === ts.id ? "text-emerald-100" : "text-muted-foreground"
                  )}>
                    {ts.slot?.duration ?? 60} Min
                  </span>
                </Button>
              ))}
            </div>
          )}
          {!isLoadingSlots && availableSlots.length === 0 && (
             <p className="text-sm text-muted-foreground text-center py-4 italic">No slots available for this date.</p>
          )}
        </div>

        {selectedSlot && (
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
            <span className="text-sm font-medium text-emerald-500">Selected: {selectedSlot.slot?.startTime}</span>
            <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/20 text-emerald-500 font-bold uppercase text-[10px]">Ready</Badge>
          </div>
        )}
      </CardContent>

      <CardFooter className="pb-8 pt-2 px-6">
        <Button 
          className="w-full h-14 text-white text-lg font-bold rounded-2xl bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98]"
          disabled={!date || !selectedSlot || isSubmitting}
          onClick={handleBooking}
          type="button"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : selectedSlot ? (
            `Book for ৳ ${selectedSlot.price}`
          ) : (
            "Select a Slot"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
