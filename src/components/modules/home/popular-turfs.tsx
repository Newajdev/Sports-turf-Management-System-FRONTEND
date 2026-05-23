import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/button-variants";
import TurfCard from "@/components/modules/turfs/turf-card";
import { POPULAR_TURFS } from "@/lib/popularTurfs";

export default function PopularTurfs() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
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
              Hand-picked top-rated venues with professional maintenance and
              cinematic lighting. Book your next match at these elite locations.
            </p>
          </div>
          <Link
            href="/book-a-turf"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 px-6 font-bold uppercase italic border-primary/20 hover:bg-primary/10 hover:text-primary transition-all group",
            )}
          >
            Explore All Turfs{" "}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POPULAR_TURFS.map((turf) => (
            <TurfCard key={turf.id} turf={turf} />
          ))}
        </div>
      </div>
    </section>
  );
}
