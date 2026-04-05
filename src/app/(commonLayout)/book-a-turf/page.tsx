import React from "react";
import TurfCard, { TurfItem } from "@/components/modules/turfs/turf-card";
import TurfFilters from "@/components/modules/turfs/turf-filters";
import { Search, MapPin, Calendar, Users, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

async function getTurfs(): Promise<TurfItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/turfs.json`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch turfs:", error);
    return [];
  }
}

export default async function BookATurfPage() {
  const turfs = await getTurfs();

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* Marketplace Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-black flex items-center justify-center">
        {/* Cinematic Stadium Glows */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-40" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-2 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="text-[0.65rem] font-black text-primary uppercase tracking-widest italic">
              TurfFlow Marketplace
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase italic animate-in fade-in slide-in-from-bottom-8 duration-700">
            Choose Your <span className="text-primary italic">Battlefield</span>
          </h1>
          
          {/* Main Search Bar */}
          <div className="max-w-4xl mx-auto bg-white/[0.03] backdrop-blur-3xl p-3 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col md:flex-row gap-2 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
             <div className="flex-1 relative">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                <input 
                  type="text" 
                  placeholder="Where do you want to play?" 
                  className="w-full h-16 pl-14 pr-6 rounded-[2rem] bg-white/5 border-none outline-none text-white font-bold italic placeholder:text-white/30 focus:bg-white/10 transition-all"
                />
             </div>
             <div className="h-16 w-px bg-white/10 hidden md:block" />
             <div className="flex-1 relative">
                <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                <input 
                  type="text" 
                  placeholder="Select Date" 
                  className="w-full h-16 pl-14 pr-6 rounded-[2rem] bg-white/5 border-none outline-none text-white font-bold italic placeholder:text-white/30 focus:bg-white/10 transition-all"
                />
             </div>
             <button className={cn(
               "h-16 px-10 bg-primary hover:bg-primary/90 text-white font-black uppercase italic tracking-widest rounded-[2rem] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
             )}>
                Search Pitches
             </button>
          </div>
        </div>
      </section>

      {/* Marketplace Content */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Filters */}
            <TurfFilters />

            {/* Turf Listing Grid */}
            <div className="flex-1 space-y-10">
               <div className="flex items-center justify-between pb-8 border-b border-border/50">
                  <div className="flex items-center gap-4">
                     <h2 className="text-xl font-black italic uppercase text-foreground">Showing Elite <span className="text-primary italic">{turfs.length} Grounds</span></h2>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-black uppercase italic tracking-widest text-muted-foreground">
                     <span>Sort by:</span>
                     <select className="bg-transparent border-none outline-none text-primary font-black cursor-pointer hover:text-primary/80 transition-colors">
                        <option>Top Rated First</option>
                        <option>Prize: Low to High</option>
                        <option>Prize: High to Low</option>
                     </select>
                  </div>
               </div>

               {turfs.length === 0 ? (
                 <div className="text-center py-20 bg-muted/20 rounded-[3rem] border border-dashed border-border/50">
                    <h3 className="text-2xl font-black text-foreground italic uppercase">No turfs found in this area</h3>
                    <p className="text-muted-foreground mt-4">Try clearing your filters or exploring another location.</p>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    {turfs.map((turf) => (
                      <TurfCard key={turf.id} turf={turf} />
                    ))}
                 </div>
               )}

               {/* Pagination (Placeholder) */}
               <div className="flex items-center justify-center pt-16">
                  <button className="px-12 py-5 rounded-[2rem] border border-primary/20 text-xs font-black uppercase italic tracking-widest text-primary hover:bg-primary/10 transition-all hover:scale-105 active:scale-95">
                     Load More Grounds
                  </button>
               </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}