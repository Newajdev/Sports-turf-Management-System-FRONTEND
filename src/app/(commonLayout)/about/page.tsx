
import PageHeroSection from "@/components/shared/page-hero-section";
import { Users, Globe, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import Image from "next/image";

const VALUES = [
  {
    title: "Player Centric",
    description: "We build tools that empower athletes to focus on what matters most—the match.",
    icon: Users,
  },
  {
    title: "Global Standards",
    description: "Bringing professional-grade management systems to local sports facilities worldwide.",
    icon: Globe,
  },
  {
    title: "Integrity First",
    description: "Transparent bookings, verified venues, and fair play are at our core.",
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <PageHeroSection
        badge="Our Mission"
        title="Revolutionizing The Pitch"
        description="We are on a journey to digitize the world's sport turfs, making professional-level play accessible to everyone, everywhere."
      />

      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.4em]">
                The Story
              </h2>
              <h3 className="text-4xl md:text-6xl font-black text-black uppercase italic tracking-tighter leading-[0.9]">
                Born from a{" "}
                <span className="text-primary">Love for the Game</span>
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {
                  "Turfix started in a local neighborhood park. We noticed how difficult it was for groups to find, book, and split costs for their matches. "
                }
              </p>
              <p className="ext-xl text-muted-foreground leading-relaxed">
                {
                  "Fast forward to today, and we've evolved into a comprehensive ecosystem that supports thousands of players and hundreds of elite venues. Our platform isn't just a booking tool—it's a community catalyst."
                }
              </p>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-[3rem] overflow-hidden border border-black/10 shadow-3xl aspect-4/5">
                <Image
                  src="/images/hero-bg.png"
                  alt="Stadium Vision"
                  height={600}
                  width={400}
                  priority
                  quality={100}
                  className="object-cover w-full h-full hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

                <div className="absolute bottom-12 left-12 right-12">
                  <div className="p-8 rounded-[2rem] bg-black/5 backdrop-blur-xl border border-black/10">
                    <Trophy className="h-10 w-10 text-primary mb-4" />
                    <p className="text-white font-bold italic tracking-tight">
                      {
                        "Our goal is to ensure that the infrastructure of sport is as dynamic and competitive as the athletes who use it."
                      }
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black/5 border-y border-black/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.4em] mb-4">
              Core Values
            </h2>
            <h3 className="text-4xl font-black text-black uppercase italic tracking-tighter">
              What Drives Us Forward
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {VALUES.map((value, i) => (
              <div
                key={i}
                className="group p-10 rounded-[2.5rem] bg-card/30 border border-black/5 hover:border-primary/20 transition-all duration-500 hover:bg-card/50"
              >
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-transform">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-2xl font-black text-black uppercase italic mb-4 group-hover:text-primary transition-colors">
                  {value.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="relative inline-block">
            <Sparkles className="absolute -top-12 -left-12 h-24 w-24 text-primary opacity-20 animate-pulse" />
            <h2 className="text-5xl md:text-8xl font-black text-black uppercase italic tracking-tighter mb-12 drop-shadow-2xl">
              Join the <span className="text-primary">Future</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            {
              "The game is changing. Be part of the ecosystem that's defining the next era of sports management."
            }
          </p>
          <button className="h-16 px-12 bg-primary text-white font-black uppercase italic tracking-widest text-lg rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-primary/20">
            Get Started with TurfFlow
          </button>
        </div>
      </section>
    </div>
  );
}
