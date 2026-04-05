"use client";

import { Star, Flame, Trophy, Coins, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const SPORTS = ["Football", "Cricket", "Basketball", "Badminton", "Tennis", "Multi-sport"];
const AMENITIES = ["Parking", "Locker Room", "Canteen", "Lights", "Referees", "Dressing Room"];

export default function TurfFilters() {
  return (
    <aside className="w-full lg:w-80 space-y-10 lg:sticky lg:top-32 h-fit mb-12 lg:mb-0">
      {/* Search Header */}
      <div className="space-y-4">
        <h2 className="text-sm font-black uppercase italic tracking-[0.3em] text-primary">Advanced Filters</h2>
        <div className="h-px w-20 bg-primary/30" />
      </div>

      {/* Sport Category */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-foreground font-black uppercase italic text-xs tracking-widest">
           <Trophy className="h-4 w-4 text-primary" />
           <span>Sport Category</span>
        </div>
        <div className="flex flex-wrap lg:flex-col gap-3">
          {SPORTS.map((sport) => (
            <label key={sport} className="flex items-center gap-3 cursor-pointer group w-fit">
              <input type="checkbox" className="peer hidden" />
              <div className="h-5 w-5 rounded-md border border-border bg-muted flex items-center justify-center transition-all group-hover:border-primary/50 peer-checked:bg-primary peer-checked:border-primary">
                 <div className="h-2 w-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors peer-checked:text-primary italic">
                {sport}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-foreground font-black uppercase italic text-xs tracking-widest">
           <Coins className="h-4 w-4 text-primary" />
           <span>Budget (per hr)</span>
        </div>
        <div className="px-2">
           <div className="h-1.5 w-full bg-muted rounded-full relative overflow-hidden">
              <div className="absolute inset-x-0 h-full bg-primary/30" />
              <div className="absolute left-[20%] right-[30%] h-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.3)] animate-pulse" />
           </div>
           <div className="flex justify-between mt-4 text-[0.65rem] font-black text-muted-foreground uppercase italic tracking-widest">
              <span>৳500</span>
              <span className="text-primary tracking-tighter text-sm">৳1,500+</span>
           </div>
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-foreground font-black uppercase italic text-xs tracking-widest">
           <Star className="h-4 w-4 text-primary" />
           <span>Top Rated Vibe</span>
        </div>
        <div className="flex flex-col gap-3">
           {[5, 4, 3].map((rating) => (
             <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="rating" className="peer hidden" />
                <div className="h-5 w-5 rounded-full border border-border bg-muted flex items-center justify-center transition-all group-hover:border-primary/50 peer-checked:bg-primary peer-checked:border-primary">
                  <div className="h-2 w-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-1">
                   {[...Array(rating)].map((_, i) => (
                     <Star key={i} className="h-3 w-3 text-primary fill-current" />
                   ))}
                   <span className="text-xs font-bold text-muted-foreground ml-1">& up</span>
                </div>
             </label>
           ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-foreground font-black uppercase italic text-xs tracking-widest">
           <Flame className="h-4 w-4 text-primary" />
           <span>Elite Amenities</span>
        </div>
        <div className="flex flex-wrap lg:flex-col gap-3">
          {AMENITIES.map((item) => (
            <label key={item} className="flex items-center gap-3 cursor-pointer group w-fit">
              <input type="checkbox" className="peer hidden" />
              <div className="h-5 w-5 rounded-md border border-border bg-muted flex items-center justify-center transition-all group-hover:border-primary/50 peer-checked:bg-primary peer-checked:border-primary">
                 <div className="h-2 w-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors italic tracking-tight">
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters CTA */}
      <button className="w-full py-4 rounded-2xl bg-muted/50 border border-primary/10 text-xs font-black uppercase italic tracking-widest text-muted-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all active:scale-95">
         Reset Strategy
      </button>
    </aside>
  );
}
