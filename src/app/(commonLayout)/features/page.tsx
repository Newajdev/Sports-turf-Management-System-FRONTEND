import React from "react";
import PageHeroSection from "@/components/shared/page-hero-section";

const FEATURES = [
  {
    title: "Instant Booking",
    description: "Secure your match in seconds with our real-time availability engine.",
    icon: "⚡",
  },
  {
    title: "Premium Venues",
    description: "Only the highest rated, verified turfs with professional maintenance.",
    icon: "🏆",
  },
  {
    title: "Split Payments",
    description: "Easily split the cost with teammates during the booking process.",
    icon: "💸",
  },
  {
    title: "Smart Analytics",
    description: "Track your matches, goals, and performance metrics over the season.",
    icon: "📊",
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <PageHeroSection 
        badge="Platform Excellence"
        title="Engineered For Victory"
        description="Discover the powerful toolset designed to elevate your sports facility and athlete experience."
      />

      <section className="py-24 relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-[2.5rem] bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black uppercase italic text-foreground mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary/5 rounded-[3rem] p-12 md:p-20 text-center border border-primary/20 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary-rgb)_0%,transparent_70%)] opacity-5" />
             <h2 className="text-3xl md:text-5xl font-black uppercase italic text-foreground mb-6">
                Ready to Experience the <span className="text-primary italic">Best?</span>
             </h2>
             <p className="text-muted-foreground max-w-xl mx-auto text-lg mb-10 leading-relaxed">
                Join thousands of athletes and venue owners who have already upgraded their game with TurfFlow.
             </p>
             <button className="h-14 px-12 bg-primary text-white font-black uppercase italic tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                Get Started Now
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}
