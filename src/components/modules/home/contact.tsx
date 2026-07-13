/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  Globe,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  contactValidationSchema,
} from "@/zod/contact.validation";
import { submitContactForm } from "@/services/contact.services";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export default function ContactPageComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    },
    onSubmit: async ({ value }) => {
      try {
        setIsLoading(true);
        const res = (await submitContactForm(value)) as {
          success: boolean;
          message?: string;
        };
        if (res.success) {
          toast.success(res.message || "Message sent successfully!");
          form.reset();
        } else {
          toast.error(res.message || "Failed to send message.");
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "An unexpected error occurred. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  const getFieldError = (errors: any[]) => {
    if (!errors.length) return null;
    const err = errors[0];
    if (typeof err === "string") return err;
    if (err && typeof err === "object" && "message" in err) {
      return err.message;
    }
    return String(err);
  };


  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-primary uppercase tracking-[0.4em]">
                  Get In Touch
                </h2>
                <h3 className="text-4xl md:text-5xl font-black text-black uppercase italic tracking-tighter">
                  We&rsquo;re Here <br /> To{" "}
                  <span className="text-primary italic">Support You</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group p-8 rounded-[2rem] bg-card/50 border border-black/5 hover:border-primary/20 transition-all">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 group-hover:scale-110 transition-transform">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-black text-black uppercase italic mb-2">
                    Email Support
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    support@turfflow.com
                  </p>
                  <p className="text-muted-foreground text-sm">
                    info@turfflow.com
                  </p>
                </div>

                <div className="group p-8 rounded-[2rem] bg-card/50 border border-black/5 hover:border-primary/20 transition-all">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 group-hover:scale-110 transition-transform">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-black text-black uppercase italic mb-2">
                    Call Center
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    +880 1234 567890
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Mon-Fri (9AM - 6PM)
                  </p>
                </div>

                <div className="group p-8 rounded-[2rem] bg-card/50 border border-black/5 hover:border-primary/20 transition-all">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 group-hover:scale-110 transition-transform">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-black text-black uppercase italic mb-2">
                    Office Address
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Sport Tech District
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Elite Plaza, Floor 12
                  </p>
                </div>

                <div className="group p-8 rounded-[2rem] bg-card/50 border border-black/5 hover:border-primary/20 transition-all">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 group-hover:scale-110 transition-transform">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-black text-black uppercase italic mb-2">
                    Social Hubs
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    @turfflow_global
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Find us on FB & Insta
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card/50 backdrop-blur-md border  rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className="relative z-10 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <form.Field
                    name="name"
                    validators={{
                      onChange: contactValidationSchema.shape.name,
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <label className="text-[0.65rem] font-black text-black/40 uppercase tracking-widest pl-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter name"
                          className="w-full h-14 bg-black/5 border border-black/10 rounded-xl px-6 text-black text-sm font-bold tracking-widest focus:outline-none focus:border-primary transition-all"
                        />
                        {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                          <p className="text-red-500 text-xs mt-1 ml-2">
                            {getFieldError(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name="email"
                    validators={{
                      onChange: contactValidationSchema.shape.email,
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <label className="text-[0.65rem] font-black text-black/40 uppercase tracking-widest pl-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter email"
                          className="w-full h-14 bg-black/5 border border-black/10 rounded-xl px-6 text-black text-sm font-bold tracking-widest focus:outline-none focus:border-primary transition-all"
                        />
                        {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                          <p className="text-red-500 text-xs mt-1 ml-2">
                            {getFieldError(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>
                </div>

                <form.Field
                  name="subject"
                  validators={{
                    onChange: contactValidationSchema.shape.subject,
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <label className="text-[0.65rem] font-black text-black/40 uppercase tracking-widest pl-2">
                        Subject
                      </label>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full h-14 bg-black/5 border border-black/10 rounded-xl px-6 text-black text-sm font-bold tracking-widest focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                      >
                        <option className="bg-background" value="General Inquiry">
                          General Inquiry
                        </option>
                        <option className="bg-background" value="List My Turf">
                          List My Turf
                        </option>
                        <option className="bg-background" value="Payment Issues">
                          Payment Issues
                        </option>
                        <option className="bg-background" value="Partnership">
                          Partnership
                        </option>
                      </select>
                      {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                        <p className="text-red-500 text-xs mt-1 ml-2">
                          {getFieldError(field.state.meta.errors)}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="message"
                  validators={{
                    onChange: contactValidationSchema.shape.message,
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <label className="text-[0.65rem] font-black text-black/40 uppercase tracking-widest pl-2">
                        Message
                      </label>
                      <textarea
                        rows={6}
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Type your message here..."
                        className="w-full bg-black/5 border border-black/10 rounded-2xl p-6 text-black text-sm font-bold tracking-widest focus:outline-none focus:border-primary transition-all resize-none"
                      ></textarea>
                      {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                        <p className="text-red-500 text-xs mt-1 ml-2">
                          {getFieldError(field.state.meta.errors)}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <Button
                  disabled={isLoading}
                  className="w-full h-16 bg-primary text-white font-black uppercase italic tracking-widest text-lg rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                      SENDING...
                    </>
                  ) : (
                    <>
                      SEND MESSAGE <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
