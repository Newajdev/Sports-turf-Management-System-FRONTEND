"use client";

import React, { useState } from "react";
import PageHeroSection from "@/components/shared/page-hero-section";
import { 
  Search, 
  CreditCard, 
  Trophy, 
  PlusCircle, 
  BarChart3, 
  Zap, 
  Users, 
  Clock, 
  ShieldCheck,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const PLAYER_STEPS = [
  {
    number: "01",
    title: "Discover Nearby Turfs",
    description: "Search by your sport, location, and preferred time slice with our lightning-fast marketplace.",
    icon: <Search className="h-7 w-7" />,
  },
  {
    number: "02",
    title: "Choose & Instant Pay",
    description: "Secure your booking with our integrated, multi-platform payment gateway in under 20 seconds.",
    icon: <CreditCard className="h-7 w-7" />,
  },
  {
    number: "03",
    title: "Check-in & Kick-off",
    description: "Show your digital token at the facility and dive straight into the game with zero friction.",
    icon: <Trophy className="h-7 w-7" />,
  },
];

const OWNER_STEPS = [
  {
    number: "01",
    title: "List Your Facility",
    description: "Onboard your turf in minutes with high-res photos, amenities, and dynamic pricing rules.",
    icon: <PlusCircle className="h-7 w-7" />,
  },
  {
    number: "02",
    title: "Automate Bookings",
    description: "Let our AI-powered engine handle scheduling, slot management, and double-booking prevention.",
    icon: <Zap className="h-7 w-7" />,
  },
  {
    number: "03",
    title: "Scale Your Revenue",
    description: "Track performance with deep analytics and receive guaranteed payouts directly to your bank.",
    icon: <BarChart3 className="h-7 w-7" />,
  },
];

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<"player" | "owner">("player");

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#050505]">
      <PageHeroSection 
        badge="Platform Manual"
        title="Engineered For Success"
        description="Experience the most seamless sports booking journey ever built. Choose your side and let's get you on the field."
      />

      {/* The Journey Section - Cinematic Redesign */}
      <section className="py-32 relative overflow-hidden">
        {/* Subtle Background Field Markings */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 0 50 L 100 50 M 50 0 L 50 100" stroke="white" strokeWidth="0.1" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="white" strokeWidth="0.1" />
           </svg>
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center mb-24 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="flex p-2 bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl relative">
                <button 
                   onClick={() => setActiveTab("player")}
                   className={cn(
                     "relative z-10 px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase italic tracking-widest transition-all duration-500",
                     activeTab === "player" ? "text-white" : "text-white/40 hover:text-white/60"
                   )}
                >
                   Elite Athlete
                </button>
                <button 
                   onClick={() => setActiveTab("owner")}
                   className={cn(
                     "relative z-10 px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase italic tracking-widest transition-all duration-500",
                     activeTab === "owner" ? "text-white" : "text-white/40 hover:text-white/60"
                   )}
                >
                   Facility Owner
                </button>
                {/* Switcher Indicator */}
                <div 
                   className={cn(
                     "absolute top-2 bottom-2 left-2 w-[calc(50%-8px)] bg-primary rounded-[1.5rem] shadow-lg shadow-primary/20 transition-all duration-500",
                     activeTab === "owner" ? "translate-x-full" : "translate-x-0"
                   )}
                />
             </div>
             <p className="text-muted-foreground text-center max-w-xl text-lg font-medium">
                {activeTab === "player" 
                  ? "Looking for your next pitch? Here is how to dominate your booking journey."
                  : "Ready to scale your facility? Learn how our AI-powered OS works for you."
                }
             </p>
          </div>

          <div className="max-w-6xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Strategy Connector Line (Desktop) */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden md:block" />
                
                {(activeTab === "player" ? PLAYER_STEPS : OWNER_STEPS).map((step, i) => (
                   <div 
                      key={step.number} 
                      className="group relative animate-in fade-in zoom-in-95 duration-700" 
                      style={{ animationDelay: `${i * 150}ms` }}
                   >
                       <div className="relative z-10 flex flex-col items-center p-12 rounded-[3.5rem] bg-white/[0.03] backdrop-blur-3xl border border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 text-center">
                          {/* Strategic Step Indicator */}
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-24 bg-[#0A0A0A] border border-white/10 rounded-full flex items-center justify-center shadow-2xl">
                             <span className="text-primary font-black uppercase italic text-xs tracking-widest">{step.number}</span>
                          </div>

                          <div className={cn(
                             "h-20 w-20 rounded-[1.5rem] flex items-center justify-center mb-8 transition-all duration-500",
                             activeTab === "player" ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white" : "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white"
                          )}>
                             {step.icon}
                          </div>
                          
                          <h3 className="text-2xl font-black uppercase italic text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                             {step.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                             {step.description}
                          </p>

                          <div className="mt-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                             <div className="h-1 w-12 bg-primary/30 rounded-full mx-auto" />
                          </div>
                       </div>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Feature Deep-Dive Section - Dark Aesthetic */}
      <section className="py-32 relative bg-[#080808] border-y border-white/5">
         <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-24">
               <div className="flex-1 space-y-12">
                  <div className="space-y-6">
                     <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-[0.6rem] font-black text-primary uppercase tracking-[0.2em] italic">
                        Elite Technology
                     </div>
                     <h2 className="text-4xl md:text-6xl font-black uppercase italic text-foreground leading-[0.85]">
                        The Ultimate <br />
                        <span className="text-primary italic">TurfFlow OS</span>
                     </h2>
                     <p className="text-muted-foreground text-xl leading-relaxed max-w-xl">
                        We did not just build a booking app. We built a high-performance operating system for the field.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 gap-12">
                     {[
                       { t: "Instant Split-Payments", d: "Stop chasing money. Everyone pays their share during booking.", i: <Users className="h-6 w-6" /> },
                       { t: "Dynamic AI Scheduling", d: "Maximize utility with predictive slot management and pricing.", i: <Clock className="h-6 w-6" /> },
                       { t: "Verified Ground Quality", d: "Physically verified facilities to ensure professional play.", i: <ShieldCheck className="h-6 w-6" /> }
                     ].map((f, i) => (
                        <div key={i} className="flex gap-8 group">
                           <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xl">
                              {f.i}
                           </div>
                           <div className="space-y-2">
                              <h4 className="text-xl font-black uppercase italic text-white group-hover:text-primary transition-colors">{f.t}</h4>
                              <p className="text-muted-foreground leading-relaxed">{f.d}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex-1 relative">
                  <div className="relative aspect-square rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                     <img 
                        src="/athlete_focus_1775056527581_1775054152502.png" 
                        alt="Elite Athlete Technology" 
                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 scale-105 hover:scale-100"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  </div>
                  {/* Cinematic Light Accents */}
                  <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
                  <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
               </div>
            </div>
         </div>
      </section>

      {/* Elite FAQ Section - Redesigned */}
      <section className="py-32 relative">
         <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-24 space-y-4">
               <h2 className="text-4xl font-black uppercase italic text-white tracking-widest">
                  Strategic <span className="text-primary italic">Intelligence</span>
               </h2>
               <p className="text-muted-foreground font-medium uppercase italic text-xs tracking-[0.3em]">Common Questions & Playbook Rules</p>
            </div>

            <div className="space-y-6">
               {[
                 { q: "Is there a service fee for bookings?", a: "Transparent pricing. Players pay a minimal platform fee of 2-3% to maintain elite security and performance." },
                 { q: "How fast do facility owners get paid?", a: "Payouts are automated. Once a match kicks off, funds are released to your bank within 24-48 business hours." },
                 { q: "Can I manage multiple turfs?", a: "Our enterprise dashboard allows management of an unlimited number of facilities under one master account." },
                 { q: "What is the cancellation policy?", a: "Flexible, tier-based rules. Most venues offer 100% credit if cancelled 24 hours before the match." }
               ].map((item, i) => (
                  <div key={i} className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all cursor-pointer">
                     <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold uppercase italic text-white/80 group-hover:text-primary transition-colors pr-8">{item.q}</h4>
                        <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                           <ChevronDown className="h-5 w-5 text-white/30 group-hover:text-white transition-all group-hover:rotate-180" />
                        </div>
                     </div>
                     <p className="mt-6 text-muted-foreground text-lg leading-relaxed hidden group-hover:block animate-in fade-in slide-in-from-top-4 duration-500 antialiased">
                        {item.a}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section - Final Stadium Push */}
      <section className="pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-primary/10 to-emerald-500/5 rounded-[4rem] p-16 md:p-32 text-center border border-white/10 relative overflow-hidden group">
             <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
             <h2 className="text-4xl md:text-7xl font-black uppercase italic text-white mb-10 leading-[0.85]">
                Ready to Join the <br />
                <span className="text-primary italic transition-all duration-700 group-hover:brightness-125">Elite Tier?</span>
             </h2>
             <p className="text-muted-foreground max-w-2xl mx-auto text-xl mb-16 leading-relaxed">
                Whether you're looking for your next pitch or scaling your facility, the playoffs start here.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <button className="h-18 px-14 bg-primary text-white font-black uppercase italic tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 text-lg">
                   Join as Player
                </button>
                <button className="h-18 px-14 bg-white/5 backdrop-blur-xl border border-white/20 text-white font-black uppercase italic tracking-widest rounded-2xl hover:bg-white/10 transition-all shadow-2xl text-lg">
                   Onboard Facility
                </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
