import React from "react";
import PageHeroSection from "@/components/shared/page-hero-section";

export default function TermsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <PageHeroSection 
        badge="Legal"
        title="Terms of Service"
        description="Please read these terms carefully before using our platform. Your use of the service constitutes agreement."
      />

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-card p-12 md:p-20 rounded-[3rem] border border-black/5 shadow-2xl">
            <div className="prose prose-invert prose-emerald max-w-none space-y-12">
               <div className="space-y-4">
                  <h3 className="text-2xl font-black text-primary uppercase italic tracking-tight">1. Acceptance of Terms</h3>
                  <p className="text-muted-foreground leading-loose">
                    By accessing or using the TurfFlow platform, you agree to be bound by these Terms of Service. If you do not agree to all terms, do not access or use our services.
                  </p>
               </div>

               <div className="space-y-4">
                  <h3 className="text-2xl font-black text-primary uppercase italic tracking-tight">2. Booking & Payments</h3>
                  <p className="text-muted-foreground leading-loose">
                    All bookings are subject to availability. Payments are processed securely via our partners. A booking is only confirmed once payment is received.
                  </p>
               </div>

               <div className="space-y-4">
                  <h3 className="text-2xl font-black text-primary uppercase italic tracking-tight">3. User Responsibilities</h3>
                     <p className="text-muted-foreground leading-loose">
                        Users are responsible for arriving on time and following the specific rules of individual venues. TurfFlow is a facilitator and is not responsible for the physical condition of the turfs.
                     </p>
               </div>

               <div className="space-y-4 pt-12 border-t border-black/5">
                  <p className="text-xs font-bold text-black/40 uppercase tracking-widest">Last Updated: April 2026</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
