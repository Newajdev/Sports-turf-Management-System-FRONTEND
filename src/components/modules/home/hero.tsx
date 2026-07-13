import { Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PrimaryButton from "@/components/shared/primaryButton";
import { StadiumHeroBackground } from "@/components/shared/stadium-hero-background";
import HeroState from "./heroStats";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-32 lg:pt-32 lg:pb-48 overflow-hidden bg-background">
      <StadiumHeroBackground variant="home" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-[0.65rem] font-black text-primary uppercase tracking-[0.3em] animate-in fade-in slide-in-from-bottom-4 duration-700 backdrop-blur-md shadow-2xl shadow-primary/20 mb-4">
            <Star className="h-3.5 w-3.5 fill-current" /> Leading Turf
            Management Platform
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.85] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 uppercase italic drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            Score Your <br />
            <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,var(--primary),#10b981)] filter saturate-150 brightness-110 p-6">
              Next Match
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-white/80 font-medium leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 drop-shadow-md">
            Book top-tier sports turfs instantly. Whether it&apos;s a friendly
            kickabout or a competitive league,{" "}
            <span className="text-primary font-bold italic underline decoration-primary/30">
              Turfix
            </span>{" "}
            simplifies your scheduling and turf management.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <PrimaryButton
              href="/auth/register"
              size="lg"
              className="h-16 px-10 text-xl bg-primary hover:bg-primary/90 text-white border-none shadow-[0_20px_50px_rgba(var(--primary-rgb),0.4)] group"
            >
              Book a Pitch{" "}
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </PrimaryButton>
            <PrimaryButton
              href="/book-a-turf"
              variant="outline"
              size="lg"
              className="h-16 px-10 text-xl font-bold bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 text-white shadow-xl"
            >
              Explore Turfs
            </PrimaryButton>
          </div>

          <HeroState />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[linear-gradient(90deg,transparent,var(--primary),transparent)] opacity-20" />
    </section>
  );
}
