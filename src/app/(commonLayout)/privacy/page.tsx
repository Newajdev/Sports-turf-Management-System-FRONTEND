import React from "react";
import PageHeroSection from "@/components/shared/page-hero-section";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <PageHeroSection 
        badge="Legal"
        title="Privacy Policy"
        description="Your trust is our most valuable asset. Learn how we protect and manage your personal data."
      />

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-card p-12 md:p-20 rounded-[3rem] border border-white/5 shadow-2xl">
            <div className="prose prose-invert prose-emerald max-w-none space-y-12">
               <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Data Collection</h3>
                  <p className="text-muted-foreground leading-loose">
                    We collect info like your name, email, and booking history to provide a personalized service. Your payment details are processed by encrypted third-party providers and are never stored on our servers.
                  </p>
               </div>

               <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Usage of Cookies</h3>
                  <p className="text-muted-foreground leading-loose">
                    We use cookies to keep you logged in and understand how you interact with our platform. You can manage cookie preferences in your browser settings.
                  </p>
               </div>

               <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Your Rights</h3>
                     <p className="text-muted-foreground leading-loose">
                        You have the right to access, correct, or delete your personal data at any time through your account dashboard or by contacting our support team.
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
