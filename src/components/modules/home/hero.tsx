"use client";

import { Star, Users, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-32 lg:pt-32 lg:pb-48 overflow-hidden bg-background">
      {/* Cinematic Turf Background with Deep Night Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />
        {/* Multilayered Deep Overlay for extreme readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background" />
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Stadium Light Glow Effects */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-primary/10 blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/10 blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-[0.65rem] font-black text-primary uppercase tracking-[0.3em] animate-in fade-in slide-in-from-bottom-4 duration-700 backdrop-blur-md shadow-2xl shadow-primary/20 mb-4">
            <Star className="h-3.5 w-3.5 fill-current" /> Leading Turf Management Platform
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.85] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 uppercase italic drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            Score Your <br />
            <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,var(--primary),#10b981)] filter saturate-150 brightness-110">
              Next Match
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-white/80 font-medium leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 drop-shadow-md">
            {"Book top-tier sports turfs instantly. Whether it's a friendly kickabout or a competitive league,"} <span className="text-primary font-bold italic underline decoration-primary/30">TurfFlow</span> simplifies your scheduling and property management.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-16 px-10 text-xl font-black bg-primary hover:bg-primary/90 text-white border-none shadow-[0_20px_50px_rgba(var(--primary-rgb),0.4)] group uppercase italic"
              )}
            >
              Book a Pitch <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href="/book-a-turf"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-16 px-10 text-xl font-bold bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 text-white shadow-xl italic"
              )}
            >
              Explore Turfs
            </Link>
          </div>

          {/* Social Proof / Stats Tags - Elevated Contrast */}
          <div className="pt-20 grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-white/20 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <div className="flex flex-col items-center gap-2 group">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                <span className="text-3xl font-black italic text-white drop-shadow-md">50K+</span>
              </div>
              <span className="text-[0.7rem] font-bold text-white/50 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Active Players</span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                <span className="text-3xl font-black italic text-white drop-shadow-md">200+</span>
              </div>
              <span className="text-[0.7rem] font-bold text-white/50 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Verified Turfs</span>
            </div>
            <div className="hidden md:flex flex-col items-center gap-2 group">
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-primary drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                <span className="text-3xl font-black italic text-white drop-shadow-md">4.9/5</span>
              </div>
              <span className="text-[0.7rem] font-bold text-white/50 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">User Happiness</span>
            </div>
          </div>
        </div>
      </div>


      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[linear-gradient(90deg,transparent,var(--primary),transparent)] opacity-20" />
    </section>
  );
}
