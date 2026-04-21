import React from "react";
import PageHeroSection from "@/components/shared/page-hero-section";
import { Check, Zap, Shield, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Starter",
    price: "0",
    description: "Perfect for casual players looking to join public matches.",
    features: [
      "Standard Match Booking",
      "Global Community Access",
      "Basic Player Profile",
      "Email Support",
    ],
    cta: "Start Playing",
    highlight: false,
    icon: Zap,
  },
  {
    name: "Pro Athlete",
    price: "499",
    description: "Built for competitive players and team organizers.",
    features: [
      "Priority Slot Booking",
      "Advanced Match Analytics",
      "Priority Customer Support",
      "Exclusive Tournament Access",
      "Custom Team Management",
      "No Booking Fees",
    ],
    cta: "Level Up Now",
    highlight: true,
    icon: Trophy,
  },
  {
    name: "Venue Owner",
    price: "1999",
    description: "The complete solution for turf property management.",
    features: [
      "Manage Multiple Turfs",
      "Advanced Revenue Analytics",
      "Booking Management Portal",
      "Automated Slot Generation",
      "Direct Marketing Tools",
      "24/7 Dedicated Manager",
    ],
    cta: "Contact Sales",
    highlight: false,
    icon: Shield,
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <PageHeroSection 
        badge="Elite Membership"
        title="Unleash Your Potential"
        description="Choose the plan that powers your performance. Transparent pricing for players, teams, and venue owners."
      />

      <section className="py-24 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl z-0 pointer-events-none opacity-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[160px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLANS.map((plan, i) => (
              <div 
                key={i} 
                className={cn(
                  "relative flex flex-col p-8 rounded-[3rem] border transition-all duration-500 hover:-translate-y-2 group",
                  plan.highlight 
                    ? "bg-primary/5 border-primary/40 shadow-[0_20px_80px_rgba(34,197,94,0.15)]" 
                    : "bg-card/50 backdrop-blur-sm border-white/5 hover:border-white/10"
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-[0.65rem] font-black text-white uppercase tracking-widest italic shadow-xl">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                   <div className={cn(
                     "h-14 w-14 rounded-2xl flex items-center justify-center mb-6 border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                     plan.highlight ? "bg-primary/20 border-primary/30 text-primary" : "bg-white/5 border-white/10 text-white/60"
                   )}>
                      <plan.icon className="h-7 w-7" />
                   </div>
                   <h3 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tight">
                    {plan.name}
                   </h3>
                   <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-muted-foreground mr-1">BDT</span>
                      <span className="text-5xl font-black text-white italic tracking-tighter">
                        {plan.price}
                      </span>
                      {plan.price !== "0" && (
                        <span className="text-sm font-bold text-muted-foreground">/mo</span>
                      )}
                   </div>
                   <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                     {plan.description}
                   </p>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                   {plan.features.map((feature, j) => (
                     <div key={j} className="flex items-center gap-3">
                        <div className={cn(
                          "h-5 w-5 rounded-full flex items-center justify-center shrink-0",
                          plan.highlight ? "bg-primary text-white" : "bg-white/10 text-white/60"
                        )}>
                           <Check className="h-3 w-3" />
                        </div>
                        <span className="text-sm font-medium text-white/80">{feature}</span>
                     </div>
                   ))}
                </div>

                <Button 
                  className={cn(
                    "w-full h-14 rounded-2xl font-black uppercase italic tracking-widest text-sm transition-all group/btn shadow-xl",
                    plan.highlight 
                      ? "bg-primary text-white hover:bg-primary/90 shadow-primary/20" 
                      : "bg-white/10 text-white hover:bg-white/20"
                  )}
                >
                  {plan.cta} <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            ))}
          </div>

          {/* Pricing FAQ or Notes */}
          <div className="mt-32 max-w-4xl mx-auto text-center border-t border-white/5 pt-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.4em] mb-4">Enterprise</h2>
            <h3 className="text-4xl font-black text-white uppercase italic mb-6">Need a custom solution?</h3>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              We offer bespoke plans for sports leagues, municipalities, and multi-venue organizations. Let us build a management suit that fits your exact requirements.
            </p>
            <Button variant="outline" className="h-16 px-12 border-white/10 bg-white/5 text-white font-black uppercase italic tracking-widest hover:bg-white/10 rounded-2xl">
               Connect with Partnerships
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
