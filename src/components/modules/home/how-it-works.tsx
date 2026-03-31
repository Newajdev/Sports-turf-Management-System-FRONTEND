import { Search, CalendarDays, Rocket } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Find Your Pitch",
      description: "Search by location, sport type, and slot availability. Our verified filters find the best turfs nearest to you.",
      icon: Search,
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    },
    {
      title: "Book & Pay Instantly",
      description: "Select your master slot, pick a date, and pay securely using SSLCommerz or bKash. Instant confirmation.",
      icon: CalendarDays,
      color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    },
    {
      title: "Get Training",
      description: "Arrive at the pitch, verify your booking ID, and start your match. Our platform tracks your match history.",
      icon: Rocket,
      color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 px-4">
           <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">
              Booking Process
           </h2>
           <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase italic px-4">
              Get to the Pitch <br />
              <span className="text-primary">In 3 Simple Steps</span>
           </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 max-w-6xl mx-auto px-4 lg:px-0">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-[2px] bg-border group-hover:bg-primary/20 transition-colors duration-500 -z-10" />
              )}
              
              <div className={`mb-8 flex h-24 w-24 items-center justify-center rounded-full border-2 ${step.color} bg-background group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 relative z-10`}>
                 <step.icon className="h-10 w-10" />
                 <div className="absolute top-0 right-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    {index + 1}
                 </div>
              </div>
              
              <h4 className="text-2xl font-black text-foreground uppercase tracking-tight mb-4 group-hover:text-primary transition-colors italic">
                {step.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
