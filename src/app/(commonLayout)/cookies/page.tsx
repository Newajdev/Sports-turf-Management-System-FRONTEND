import React from "react";
import PageHeroSection from "@/components/shared/page-hero-section";

export default function CookiesPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <PageHeroSection 
        badge="Legal"
        title="Cookie Policy"
        description="Learn how we use cookies and similar technologies to enhance your experience on our platform."
      />

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-card p-12 md:p-20 rounded-[3rem] border border-white/5 shadow-2xl">
            <div className="prose prose-invert prose-emerald max-w-none space-y-12">
               <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">What are Cookies?</h3>
                  <p className="text-muted-foreground leading-loose">
                    Cookies are small text files that are stored on your device when you visit a website. They help us remember your preferences and provide a smoother experience.
                  </p>
               </div>

               <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Types of Cookies We Use</h3>
                  <p className="text-muted-foreground leading-loose">
                    - **Essential Cookies**: Necessary for technical operation (e.g., authentication).<br />
                    - **Analytical Cookies**: Help us understand how users interact with the platform.<br />
                    - **Preference Cookies**: Remember your language or location settings.
                  </p>
               </div>

               <div className="space-y-4 pt-12 border-t border-white/5">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Last Updated: April 2024</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
