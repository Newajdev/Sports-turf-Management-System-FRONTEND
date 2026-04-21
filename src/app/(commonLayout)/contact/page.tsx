import React from "react";
import PageHeroSection from "@/components/shared/page-hero-section";
import { Mail, Phone, MapPin, Send, MessageSquare, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <PageHeroSection 
        badge="Connect"
        title="Start A Conversation"
        description="Have questions about our platform or want to list your turf? Our team is ready to scale your sports experience."
      />

      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div className="space-y-12">
               <div className="space-y-4">
                  <h2 className="text-sm font-bold text-primary uppercase tracking-[0.4em]">Get In Touch</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">We're Here <br /> To <span className="text-primary italic">Support You</span></h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group p-8 rounded-[2rem] bg-card/50 border border-white/5 hover:border-primary/20 transition-all">
                     <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 group-hover:scale-110 transition-transform">
                        <Mail className="h-6 w-6 text-primary" />
                     </div>
                     <h4 className="text-lg font-black text-white uppercase italic mb-2">Email Support</h4>
                     <p className="text-muted-foreground text-sm">support@turfflow.com</p>
                     <p className="text-muted-foreground text-sm">info@turfflow.com</p>
                  </div>

                  <div className="group p-8 rounded-[2rem] bg-card/50 border border-white/5 hover:border-primary/20 transition-all">
                     <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 group-hover:scale-110 transition-transform">
                        <Phone className="h-6 w-6 text-primary" />
                     </div>
                     <h4 className="text-lg font-black text-white uppercase italic mb-2">Call Center</h4>
                     <p className="text-muted-foreground text-sm">+880 1234 567890</p>
                     <p className="text-muted-foreground text-sm">Mon-Fri (9AM - 6PM)</p>
                  </div>

                  <div className="group p-8 rounded-[2rem] bg-card/50 border border-white/5 hover:border-primary/20 transition-all">
                     <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 group-hover:scale-110 transition-transform">
                        <MapPin className="h-6 w-6 text-primary" />
                     </div>
                     <h4 className="text-lg font-black text-white uppercase italic mb-2">Office Address</h4>
                     <p className="text-muted-foreground text-sm">Sport Tech District</p>
                     <p className="text-muted-foreground text-sm">Elite Plaza, Floor 12</p>
                  </div>

                  <div className="group p-8 rounded-[2rem] bg-card/50 border border-white/5 hover:border-primary/20 transition-all">
                     <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 group-hover:scale-110 transition-transform">
                        <Globe className="h-6 w-6 text-primary" />
                     </div>
                     <h4 className="text-lg font-black text-white uppercase italic mb-2">Social Hubs</h4>
                     <p className="text-muted-foreground text-sm">@turfflow_global</p>
                     <p className="text-muted-foreground text-sm">Find us on FB & Insta</p>
                  </div>
               </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card/50 backdrop-blur-md border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 text-primary/10">
                  <MessageSquare className="h-32 w-32" />
               </div>
               
               <form className="relative z-10 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest pl-2">Full Name</label>
                        <input 
                           type="text" 
                           placeholder="Enter name"
                           className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 text-white text-sm font-bold tracking-widest focus:outline-none focus:border-primary transition-all"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest pl-2">Email Address</label>
                        <input 
                           type="email" 
                           placeholder="Enter email"
                           className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 text-white text-sm font-bold tracking-widest focus:outline-none focus:border-primary transition-all"
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest pl-2">Subject</label>
                     <select className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 text-white text-sm font-bold tracking-widest focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer">
                        <option className="bg-background">General Inquiry</option>
                        <option className="bg-background">List My Turf</option>
                        <option className="bg-background">Payment Issues</option>
                        <option className="bg-background">Partnership</option>
                     </select>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[0.65rem] font-black text-white/40 uppercase tracking-widest pl-2">Message</label>
                     <textarea 
                        rows={6}
                        placeholder="Type your message here..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-sm font-bold tracking-widest focus:outline-none focus:border-primary transition-all resize-none"
                     ></textarea>
                  </div>

                  <Button className="w-full h-16 bg-primary text-white font-black uppercase italic tracking-widest text-lg rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                     SEND MESSAGE <Send className="ml-2 h-5 w-5" />
                  </Button>
               </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
