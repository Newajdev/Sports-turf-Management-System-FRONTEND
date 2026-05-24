import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/button-variants";
import { ITurf } from "@/interface/turf.interface";
import { TurfStatus } from "@/interface/enum.interface";
import { ISportType } from "@/interface/sport-type.interface";
import { Badge } from "@/components/ui/badge";

export default function TurfCard({ turf }: { turf: ITurf }) {
  const isActive = turf.turfStatus === TurfStatus.ACTIVE;
  const rating =
    typeof turf.rating === "number"
      ? turf.rating.toFixed(1)
      : Number(turf.rating).toFixed(1);

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300",
        isActive
          ? "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          : "opacity-75",
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={turf.images?.[0] || "/images/turf-multi.png"}
          alt={turf.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5 max-w-[70%]">
            {turf.sportTypes?.slice(0, 2).map((sport: ISportType) => (
              <Badge
                key={sport.id}
                className="bg-black/50 text-white border-white/20 backdrop-blur-sm text-[10px] font-semibold uppercase"
              >
                {sport.title}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-black/50 backdrop-blur-sm px-2 py-1 border border-white/10">
            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-white">{rating}</span>
          </div>
        </div>

        {!isActive && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="destructive" className="text-[10px] uppercase">
              {turf.turfStatus === TurfStatus.MAINTENANCE
                ? "Maintenance"
                : "Unavailable"}
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 gap-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {turf.name}
          </h3>
          <div className="flex items-start gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary/70" />
            <span className="text-sm line-clamp-2">{turf.address}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>
              {turf.openingTime} – {turf.closingTime}
            </span>
            {turf.reviewCount > 0 && (
              <span className="ml-auto text-muted-foreground/80">
                {turf.reviewCount} review{turf.reviewCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-border/50">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
              From
            </p>
            <p className="text-2xl font-bold text-primary">
              ৳{turf.hourlyRate}
              <span className="text-sm font-normal text-muted-foreground">/hr</span>
            </p>
          </div>

          <Link
            href={`/book-a-turf/${turf.id}`}
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-xl gap-1.5 font-semibold",
              !isActive && "pointer-events-none opacity-50",
            )}
          >
            View & Book
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
