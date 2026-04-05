"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PageHeroSectionProps {
  title: string;
  description: string;
  badge?: string;
}

export default function PageHeroSection({
  title,
  description,
  badge,
}: PageHeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden bg-black flex items-center justify-center">
      {/* Cinematic Stadium Background - Shared with Home Hero */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />
        {/* Multilayered Deep Overlay for extreme readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/60" />
        
        {/* Stadium Light Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center space-y-6">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="text-[0.65rem] font-black text-primary uppercase tracking-[0.3em] italic">
              {badge}
            </span>
          </div>
        )}
        
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase italic animate-in fade-in slide-in-from-bottom-8 duration-700">
          {title.split(" ").map((word, i) => (
            <React.Fragment key={i}>
              {i === title.split(" ").length - 1 ? (
                <span className="text-primary italic">{word}</span>
              ) : (
                word + " "
              )}
            </React.Fragment>
          ))}
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
          {description}
        </p>
      </div>
      
      {/* Subtle Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
