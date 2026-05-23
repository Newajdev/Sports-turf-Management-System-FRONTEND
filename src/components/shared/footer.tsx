import Link from "next/link";
import { Trophy, Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { FooterVisibility } from "@/components/shared/footer-visibility";

const footerLinks = {
  platform: [
    { name: "Book a Turf", href: "/book-a-turf" },
    { name: "Sport Types", href: "/features" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
  ],
  support: [
    { name: "Help Center", href: "/support" },
    { name: "Contact Us", href: "/contact" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blogs", href: "/blogs" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterVisibility>
      <footer className="bg-muted px-6 py-12 md:py-20 lg:px-8 border-t border-border">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6 group">
                <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Trophy className="h-7 w-7 text-primary" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-foreground italic uppercase">
                  TurfFlow
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-8">
                The premier platform for sports turf management and booking. We
                connect athletes with the best pitches across the country, making
                every match a world-class experience.
              </p>
              <div className="flex items-center gap-5">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6">
                Platform
              </h4>
              <ul className="space-y-4">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6">
                Support
              </h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6">
                Company
              </h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground font-mono uppercase tracking-[0.2em]">
            <p>
              © {currentYear} TurfFlow Management System. All Rights Reserved.
            </p>
            <div className="flex gap-8">
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="hover:text-primary transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </FooterVisibility>
  );
}
