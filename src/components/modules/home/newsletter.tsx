import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterSection() {
  return (
    <section className="py-24 bg-primary/5 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-primary rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 overflow-hidden relative">
          
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex-1 space-y-4 text-primary-foreground text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Ready to Play?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto md:mx-0">
              Join thousands of players already using our platform. Subscribe to our newsletter to get the latest updates, exclusive offers, and turf availability alerts directly in your inbox.
            </p>
          </div>
          
          <div className="relative z-10 w-full max-w-md flex-shrink-0">
            <form className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-xl shadow-lg">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-foreground h-12"
                  required
                />
              </div>
              <Button type="button" className="h-12 px-6 rounded-lg font-semibold w-full sm:w-auto">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
            <p className="text-xs text-primary-foreground/70 mt-3 text-center md:text-left">
              We care about your data. Read our privacy policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
