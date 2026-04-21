import React from "react";
import PageHeroSection from "@/components/shared/page-hero-section";
import { Download, Newspaper, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PressPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <PageHeroSection 
        badge="Newsroom"
        title="Stories From The Sideline"
        description="Latest news, official press releases, and brand resources for media partners."
      />

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             
             {/* News List */}
             <div className="lg:col-span-2 space-y-12">
                <div className="space-y-4">
                   <h3 className="text-sm font-bold text-primary uppercase tracking-[0.4em]">Recent Releases</h3>
                   <div className="space-y-8">
                      {[1, 2, 3].map((i) => (
                         <div key={i} className="group cursor-pointer">
                            <span className="text-[0.65rem] font-bold text-white/40 uppercase tracking-widest mb-2 block">April {10 + i}, 2024</span>
                            <h4 className="text-2xl font-black text-white uppercase italic tracking-tight group-hover:text-primary transition-colors">
                               TurfFlow Expands Fleet to {200 + i * 50} Premium Venues Nationwide
                            </h4>
                            <p className="mt-4 text-muted-foreground leading-relaxed">
                               Today we announced a major milestone in our mission to digitize sports infrastructure, adding key locations across major urban hubs...
                            </p>
                            <div className="mt-6 flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest italic opacity-0 group-hover:opacity-100 transition-opacity">
                               Read Full Story <Terminal className="h-3 w-3" />
                            </div>
                            <div className="mt-8 border-b border-white/5" />
                         </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Brand Kits */}
             <div className="space-y-8">
                <div className="p-8 rounded-[3rem] bg-card border border-white/5 shadow-2xl">
                   <Newspaper className="h-10 w-10 text-primary mb-6" />
                   <h3 className="text-xl font-black text-white uppercase italic mb-4">Media Enquiries</h3>
                   <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                      For interview requests, high-res assets, or official statements, please reach out to our communications team.
                   </p>
                   <Button className="w-full h-14 bg-white/5 border border-white/10 text-white font-bold uppercase italic rounded-xl hover:bg-white/10">
                      CONTACT PRESS TEAM
                   </Button>
                </div>

                <div className="p-8 rounded-[3rem] bg-primary/5 border border-primary/20">
                   <Download className="h-10 w-10 text-primary mb-6" />
                   <h3 className="text-xl font-black text-white uppercase italic mb-4">Brand Assets</h3>
                   <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                      Download our official logo kit, brand guidelines, and executive headshots.
                   </p>
                   <Button className="w-full h-14 bg-primary text-white font-black uppercase italic rounded-xl hover:scale-105 transition-all">
                      DOWNLOAD KIT (24MB)
                   </Button>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
