import React from "react";
import PageHeroSection from "@/components/shared/page-hero-section";
import { Search, Book, HelpCircle, MessageCircle, FileText, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { title: "Booking Help", icon: Book, count: 12 },
  { title: "Account Settings", icon: Zap, count: 8 },
  { title: "Payments & Refunds", icon: FileText, count: 15 },
  { title: "Venue Owner FAQ", icon: MessageCircle, count: 10 },
];

const FAQS = [
  {
    k: "How do I book a turf?",
    v: "Simply search for your preferred turf, select an available slot, and proceed to payment. You will receive an instant confirmation via SMS and Email.",
  },
  {
    k: "Can I cancel a booking?",
    v: "Yes, you can cancel up to 24 hours before the match for a full refund. Cancellations within 24 hours are subject to venue policies.",
  },
  {
    k: "What is a Master Slot?",
    v: "Master Slots are pre-defined time blocks (e.g., 1 hour, 90 mins) set by the venue. You select these to create a booking.",
  },
  {
    k: "How do I list my own turf?",
    v: "Navigate to the 'Contact Us' page and select 'List My Turf' or register as a Turf Owner to get started with our automated onboarding.",
  },
];

export default function SupportPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <PageHeroSection 
        badge="Help Center"
        title="We Are Here To Guide You"
        description="Search our extensive knowledge base or connect with a support specialist. Professional assistance at every step."
      />

      {/* Search Header */}
      <section className="py-20 relative z-10 -mt-10">
        <div className="container mx-auto px-4 md:px-6">
           <div className="max-w-3xl mx-auto">
              <div className="relative group">
                 <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-primary" />
                 </div>
                 <input 
                  type="text" 
                  placeholder="SEARCH FOR TOPICS, GUIDES, OR FAQS..."
                  className="w-full h-20 bg-card border border-white/10 rounded-[2.5rem] pl-16 pr-8 text-white text-sm font-black tracking-widest focus:outline-none focus:border-primary transition-all shadow-2xl group-hover:border-white/20"
                 />
              </div>
           </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className="group p-8 rounded-[2.5rem] bg-card/50 border border-white/5 hover:border-primary/20 transition-all cursor-pointer">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                  <cat.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase italic mb-2 tracking-tight">{cat.title}</h3>
                <p className="text-xs font-black text-primary uppercase tracking-widest">{cat.count} ARTICLES</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-4 md:px-6">
           <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                 <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                 <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Most Asked Questions</h2>
              </div>

              <div className="grid gap-6">
                {FAQS.map((faq, i) => (
                  <div key={i} className="p-8 rounded-[2rem] bg-card/80 border border-white/5 hover:border-white/10 transition-all">
                    <h4 className="text-xl font-black text-white uppercase italic mb-4 tracking-tight">{faq.k}</h4>
                    <p className="text-muted-foreground leading-relaxed">{faq.v}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* Still need help? */}
      <section className="py-24">
         <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="p-16 rounded-[4rem] bg-primary/5 border border-primary/20 relative overflow-hidden max-w-5xl mx-auto">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary-rgb)_0%,transparent_70%)] opacity-5" />
               <h3 className="text-3xl font-black text-white uppercase italic mb-6">Can't find what you're looking for?</h3>
               <p className="text-muted-foreground text-lg mb-10">Our agents are online 24/7. Connect with us instantly via live chat or open a support ticket.</p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button className="h-16 px-10 bg-primary text-white font-black uppercase italic tracking-widest rounded-2xl hover:scale-105 transition-all">
                     LIVE CHAT NOW
                  </Button>
                  <Button variant="outline" className="h-16 px-10 border-white/10 bg-white/5 text-white font-black uppercase italic tracking-widest rounded-2xl hover:bg-white/10">
                     OPEN A TICKET
                  </Button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
