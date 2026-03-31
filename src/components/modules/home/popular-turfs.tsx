"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const POPULAR_TURFS = [
  {
    id: "1",
    name: "Emerald Arena North",
    image: "/images/turf-football.png",
    sport: "Football",
    rating: 4.9,
    location: "Dhaka, BD",
    price: 1200,
  },
  {
    id: "2",
    name: "Elite Indoor Arena",
    image: "/images/turf-multi.png",
    sport: "Multi-sport",
    rating: 4.8,
    location: "Chittagong, BD",
    price: 1500,
  },
  {
    id: "3",
    name: "Stadium Lights Cricket",
    image: "/images/turf-cricket.png",
    sport: "Cricket",
    rating: 4.9,
    location: "Sylhet, BD",
    price: 1100,
  },
];

export default function PopularTurfs() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-foreground">
              Popular <span className="text-primary">Turfs</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Hand-picked top-rated venues with professional maintenance and cinematic lighting. Book your next match at these elite locations.
            </p>
          </div>
          <Link
            href="/browse"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 px-6 font-bold uppercase italic border-primary/20 hover:bg-primary/10 hover:text-primary transition-all group"
            )}
          >
            Explore All Turfs <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POPULAR_TURFS.map((turf) => (
            <div
              key={turf.id}
              className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(34,197,94,0.1)]"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={turf.image}
                  alt={turf.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Sport Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-[0.6rem] font-black text-primary uppercase tracking-widest italic">
                    {turf.sport}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-background/50 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                  <Star className="h-3 w-3 text-primary fill-current" />
                  <span className="text-xs font-bold text-white">{turf.rating}</span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors mb-2 italic uppercase">
                    {turf.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary/70" />
                    <span className="text-sm font-medium">{turf.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex flex-col">
                    <span className="text-[0.6rem] text-muted-foreground uppercase font-black tracking-widest">Starts from</span>
                    <span className="text-2xl font-black italic text-primary">
                      ৳{turf.price}<span className="text-xs text-muted-foreground font-medium lowercase">/hr</span>
                    </span>
                  </div>
                  <Link
                    href={`/turf/${turf.id}`}
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-5 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                    )}
                  >
                    Check & Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
