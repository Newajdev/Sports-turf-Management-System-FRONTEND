import { ShieldCheck, Zap, Calendar, Trophy, Lock, BarChart3 } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Real-time Booking",
      description: "Instantly reserve slots on your favorite turfs with a few clicks. No more waiting for phone calls.",
      icon: Calendar,
      gradient: "from-emerald-500/10 to-emerald-500/5",
    },
    {
      title: "Verified Properties",
      description: "We verify every turf to ensure premium quality, high-grade safety, and accurate amenities.",
      icon: ShieldCheck,
      gradient: "from-indigo-500/10 to-indigo-500/5",
    },
    {
      title: "Competitive Pricing",
      description: "Get the best market rates and exclusive off-peak discounts for your regular matches.",
      icon: Zap,
      gradient: "from-amber-500/10 to-amber-500/5",
    },
    {
      title: "Advanced Analytics",
      description: "Turf owners get deep insights into revenue, peak hours, and user engagement metrics.",
      icon: BarChart3,
      gradient: "from-blue-500/10 to-blue-500/5",
    },
    {
      title: "Secure Payments",
      description: "Experience seamless checkout with SSLCommerz, bKash, and all major credit cards.",
      icon: Lock,
      gradient: "from-rose-500/10 to-rose-500/5",
    },
    {
      title: "Tournament Support",
      description: "Easily organize league matches and local tournaments with bulk slot configurations.",
      icon: Trophy,
      gradient: "from-violet-500/10 to-violet-500/5",
    },
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-2 animate-pulse">
            Premium Features
          </h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase">
            Everything You Need <br />
            <span className="text-primary italic">At Your Fingertips</span>
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our platform provides a comprehensive suite of tools for both players and property owners, making match scheduling smarter and management faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group p-8 rounded-3xl border border-border bg-background transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 relative overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors">
                  <feature.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 className="text-xl font-bold tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
