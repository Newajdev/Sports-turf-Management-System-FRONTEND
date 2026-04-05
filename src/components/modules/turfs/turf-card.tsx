"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export interface TurfItem {
  id: string;
  name: string;
  image: string;
  sport: string;
  rating: number;
  location: string;
  price: number;
  amenities: string[];
  isAvailable: boolean;
}

export default function TurfCard({ turf }: { turf: TurfItem }) {
  return (
    <article
      className={cn(
        "group relative bg-card rounded-[2rem] overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 flex flex-col h-full",
        turf.isAvailable ? "hover:shadow-[0_20px_50px_rgba(34,197,94,0.1)]" : "opacity-90 grayscale-[0.2]"
      )}
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={turf.image}
          alt={turf.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* badges */}
        <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
          <span className="px-3 py-1.5 rounded-xl bg-primary text-[0.65rem] font-black text-white uppercase tracking-widest italic shadow-lg shadow-primary/20">
            {turf.sport}
          </span>
          
          {turf.isAvailable ? (
             <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[0.6rem] font-bold text-emerald-400 uppercase tracking-wider">
               <CheckCircle2 className="h-3 w-3" />
               Available
             </div>
          ) : (
            <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[0.6rem] font-bold text-red-400 uppercase tracking-wider">
               <XCircle className="h-3 w-3" />
               Fully Booked
            </div>
          )}
        </div>

        {/* Rating Overlay */}
        <div className="absolute bottom-5 right-5 bg-background/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 text-primary fill-current" />
          <span className="text-xs font-black text-white">{turf.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-black italic uppercase tracking-tight text-foreground group-hover:text-primary transition-colors leading-none">
              {turf.name}
            </h3>
            <div className="flex items-center gap-1.5 text-muted-foreground mt-3">
              <MapPin className="h-4 w-4 text-primary/60" />
              <span className="text-sm font-bold tracking-tight">{turf.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {turf.amenities.map((amenity) => (
              <span key={amenity} className="px-2.5 py-1 rounded-lg bg-muted text-[0.6rem] font-bold text-muted-foreground uppercase tracking-wider">
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-[0.6rem] text-muted-foreground uppercase font-black tracking-widest">Pricing</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black italic text-primary">৳{turf.price}</span>
              <span className="text-xs text-muted-foreground font-medium lowercase">/hr</span>
            </div>
          </div>

          <Link
            href={`/book-a-turf/${turf.id}`}
            className={cn(
              buttonVariants(),
              "h-14 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase italic tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20",
              !turf.isAvailable && "opacity-50 pointer-events-none grayscale"
            )}
          >
            {turf.isAvailable ? "Reserve Pitch" : "Book Later"}
          </Link>
        </div>
      </div>
    </article>
  );
}
