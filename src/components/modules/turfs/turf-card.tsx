"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SportType, TurfItem } from "@/interface/turf.interface";
import { Card } from "@/components/ui/card";



export default function TurfCard({ turf }: { turf: TurfItem }) {

  return (
    <Card
      className={cn(
        "group overflow-hidden hover:border-primary/30 duration-500 space-y-0 flex p-0 rounded-2xl",
        turf.turfStatus
          ? "hover:shadow-[0_20px_50px_rgba(34,197,94,0.1)]"
          : "opacity-90 grayscale-[0.2]",
      )}
    >
      <div
        className={cn(
          "group overflow-hidden hover:border-primary/30 duration-500 flex rounded-2xl",
          turf.turfStatus
            ? "hover:shadow-[0_20px_50px_rgba(34,197,94,0.1)]"
            : "opacity-90 grayscale-[0.2]",
        )}
      >
        {/* Image Container */}
        <div className="relative h-64  w-full overflow-hidden">
          <Image
            src={turf.image?.[0] || "/images/turf-multi.png"}
            alt={turf.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

          {/* badges */}
          <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
            <div className="flex space-x-1 border border-white/50 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md">
              <Star className="h-3.5 w-3.5 text-primary fill-current" />
              <span className="text-xs font-black text-white">
                {turf.rating}
              </span>
            </div>

            {turf.turfStatus ? (
              <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[0.6rem] font-bold text-emerald-400 uppercase tracking-wider">
                <CheckCircle2 className="h-3 w-3" />
                Available
              </div>
            ) : (
              <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[0.6rem] font-bold text-red-400 uppercase tracking-wider">
                <XCircle className="h-3 w-3" />
                Booked
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black italic uppercase tracking-tight text-foreground group-hover:text-primary transition-colors leading-none mt-4">
              {turf.name}
            </h3>
            <div className="flex items-center gap-1.5 text-muted-foreground ">
              <MapPin className="h-4 w-4 text-primary/60" />
              <span className="text-sm font-bold tracking-tight">
                {turf.address}
              </span>
            </div>
          </div>
          <div className="border-l pl-3 py-1 mt-3 flex flex-col items-end gap-1">
            <p className="text-muted-foreground uppercase font-black tracking-widest">
              Opening: <span>{turf.openingTime}</span> 
            </p>
            <p className="text-muted-foreground uppercase font-black tracking-widest">
              Closing: <span>{turf.closingTime}</span> 
            </p>
          </div>
        </div>

        <div>
          <span className="text-[0.6rem] text-muted-foreground uppercase font-black tracking-widest">
            Sports
          </span>
          <div className="flex items-center gap-2 mt-1">
            {turf.sportTypes?.map((sports: SportType, index: number) => (
              <span
                key={index}
                className="px-2 py-0.5 rounded-full bg-primary/20 text-[0.65rem] font-bold text-primary uppercase tracking-widest italic shadow-sm shadow-primary/20"
              >
                {sports.title}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-[0.6rem] text-muted-foreground uppercase font-black tracking-widest">
              Pricing
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black italic text-primary">
                ৳{turf.hourlyRate}
              </span>
              <span className="text-xs text-muted-foreground font-medium lowercase">
                /hr
              </span>
            </div>
          </div>

          <Link
            href={`/book-a-turf/${turf.id}`}
            className={cn(
              buttonVariants(),
              "h-14 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase italic tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20",
              !turf.turfStatus && "opacity-50 pointer-events-none grayscale",
            )}
          >
            {turf.turfStatus ? "Reserve Pitch" : "Book Later"}
          </Link>
        </div>
      </div>
    </Card>
    // <article
    //   className={cn(
    //     "group relative bg-card rounded-[2rem] overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 flex flex-col h-full",
    //     turf.turfStatus ? "hover:shadow-[0_20px_50px_rgba(34,197,94,0.1)]" : "opacity-90 grayscale-[0.2]"
    //   )}
    // >
    //   {/* Image Container */}
    //   <div className="relative h-64 w-full overflow-hidden">
    //     <Image
    //       src={turf.image?.[0] || "/images/turf-multi.png"}
    //       alt={turf.name}
    //       fill
    //       className="object-cover transition-transform duration-700 group-hover:scale-110"
    //     />
    //     <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

    //     {/* badges */}
    //     <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
    //       <span className="px-3 py-1.5 rounded-xl bg-primary text-[0.65rem] font-black text-white uppercase tracking-widest italic shadow-lg shadow-primary/20 flex flex-wrap gap-2">
    //         {turf.sportTypes?.map((sports: any, index: number) => (
    //           <span key={index}>{sports.title}</span>
    //         ))}
    //       </span>

    //       {turf.turfStatus ? (
    //          <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[0.6rem] font-bold text-emerald-400 uppercase tracking-wider">
    //            <CheckCircle2 className="h-3 w-3" />
    //            Available
    //          </div>
    //       ) : (
    //         <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[0.6rem] font-bold text-red-400 uppercase tracking-wider">
    //            <XCircle className="h-3 w-3" />
    //            Fully Booked
    //         </div>
    //       )}
    //     </div>

    //     {/* Rating Overlay */}
    //     <div className="absolute bottom-5 right-5 bg-background/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
    //       <Star className="h-3.5 w-3.5 text-primary fill-current" />
    //       <span className="text-xs font-black text-white">{turf.rating}</span>
    //     </div>
    //   </div>

    //   {/* Content */}
    //   <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
    //     <div className="space-y-4">
    //       <div>
    //         <h3 className="text-2xl font-black italic uppercase tracking-tight text-foreground group-hover:text-primary transition-colors leading-none">
    //           {turf.name}
    //         </h3>
    //         <div className="flex items-center gap-1.5 text-muted-foreground mt-3">
    //           <MapPin className="h-4 w-4 text-primary/60" />
    //           <span className="text-sm font-bold tracking-tight">{turf.address}</span>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="flex items-center justify-between pt-6 border-t border-border/50">
    //       <div className="flex flex-col">
    //         <span className="text-[0.6rem] text-muted-foreground uppercase font-black tracking-widest">Pricing</span>
    //         <div className="flex items-baseline gap-1">
    //           <span className="text-3xl font-black italic text-primary">৳{turf.hourlyRate}</span>
    //           <span className="text-xs text-muted-foreground font-medium lowercase">/hr</span>
    //         </div>
    //       </div>

    //       <Link
    //         href={`/book-a-turf/${turf.id}`}
    //         className={cn(
    //           buttonVariants(),
    //           "h-14 px-8 bg-primary hover:bg-primary/90 text-white font-black uppercase italic tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20",
    //           !turf.turfStatus && "opacity-50 pointer-events-none grayscale"
    //         )}
    //       >
    //         {turf.turfStatus ? "Reserve Pitch" : "Book Later"}
    //       </Link>
    //     </div>
    //   </div>
    // </article>
  );
}
