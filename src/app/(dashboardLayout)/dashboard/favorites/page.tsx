import React from "react";
import { Heart, MapPin, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Mock data
const FAVORITE_TURFS = [
  {
    id: "1",
    name: "Emerald Arena North",
    image: "/images/turf-football.png",
    sport: "Football",
    rating: 4.9,
    location: "Dhaka, BD",
    price: 1200,
  },
];

export default function FavoritesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Favorite Venues</h2>
        <p className="text-muted-foreground">The pitches you love the most, all in one place.</p>
      </div>

      {FAVORITE_TURFS.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FAVORITE_TURFS.map((turf) => (
            <div
              key={turf.id}
              className="group relative bg-card rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-xl"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={turf.image}
                  alt={turf.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                   <button className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                      <Heart className="h-5 w-5 fill-current" />
                   </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[0.6rem] font-black text-white uppercase tracking-widest italic">
                    {turf.sport}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white italic uppercase">{turf.name}</h3>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{turf.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                   <div className="flex flex-col">
                      <span className="text-[0.6rem] text-muted-foreground uppercase font-black">Rating</span>
                      <div className="flex items-center gap-1">
                         <Star className="h-3 w-3 text-primary fill-current" />
                         <span className="text-sm font-bold text-white">{turf.rating}</span>
                      </div>
                   </div>
                   <Link href={`/book-a-turf/${turf.id}`}>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20">
                         Book Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                   </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-card/30 rounded-[3rem] border border-dashed border-white/10">
           <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center">
              <Heart className="h-10 w-10 text-white/20" />
           </div>
           <div className="space-y-2">
              <h3 className="text-xl font-black text-white uppercase italic">No Favorites Yet</h3>
              <p className="text-muted-foreground max-w-xs mx-auto text-sm">Start exploring the pitch and save your favorite venues for quick access here.</p>
           </div>
           <Link href="/book-a-turf">
              <Button variant="outline" className="h-12 px-8 border-white/10 bg-white/5 text-white font-bold uppercase italic rounded-xl hover:bg-white/10">
                 Explore Venues
              </Button>
           </Link>
        </div>
      )}
    </div>
  );
}
