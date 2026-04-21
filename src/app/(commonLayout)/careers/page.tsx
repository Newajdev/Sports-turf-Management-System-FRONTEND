import React from "react";
import PageHeroSection from "@/components/shared/page-hero-section";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const JOBS = [
  { title: "Senior Frontend Engineer", location: "Remote / Dhaka", type: "Full-time" },
  { title: "Product Designer", location: "Remote", type: "Full-time" },
  { title: "Operations Manager", location: "Chittagong", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <PageHeroSection 
        badge="Join The Team"
        title="Build The Future Of Sports"
        description="We are a fast-growing team of athletes, engineers, and visionaries. Come play with us."
      />

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-8">
             <div className="text-center mb-16">
                <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Open Positions</h3>
             </div>

             {JOBS.map((job, i) => (
                <div key={i} className="group p-8 rounded-3xl bg-card border border-white/5 hover:border-primary/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-2xl shadow-primary/5">
                   <div className="space-y-2">
                      <h4 className="text-2xl font-black text-white uppercase italic tracking-tight">{job.title}</h4>
                      <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                         <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-primary" />
                            <span>{job.location}</span>
                         </div>
                         <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            <span>{job.type}</span>
                         </div>
                      </div>
                   </div>
                   <Button variant="outline" className="h-12 px-6 border-white/10 bg-white/5 text-white font-bold uppercase italic rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                   </Button>
                </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
