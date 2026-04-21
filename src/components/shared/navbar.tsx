"use client";

import Link from "next/link";
import { Trophy, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Book a Turf", href: "/book-a-turf" },
    { name: "Features", href: "/features" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "Blogs", href: "/blogs" },
  ];

  // Logic to show active state (background & colored text)
  // On Home page (/), only show active state when scrolled.
  // On all other pages, ALWAYS show active state.
  const showActiveState = isScrolled || pathname !== "/";

  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        showActiveState
          ? "bg-background/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/20 p-2 rounded-xl group-hover:bg-primary/30 transition-all duration-300 shadow-lg shadow-primary/10">
              <Trophy className="h-6 w-6 text-primary filter brightness-110 drop-shadow-sm" />
            </div>
            <span className={cn(
              "text-2xl font-black tracking-tighter transition-colors duration-300",
              showActiveState ? "text-primary" : "text-white drop-shadow-md"
            )}>
              TurfFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-bold transition-all hover:scale-105 tracking-wide uppercase italic",
                    showActiveState
                      ? "text-foreground hover:text-primary"
                      : "text-white/90 hover:text-white drop-shadow-sm opacity-80 hover:opacity-100"
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/auth/login"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "font-bold italic transition-colors duration-300",
                showActiveState ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white hover:bg-white/10"
              )}
            >
              Log in
            </Link>
            <Link
              href="/auth/register"
              className={cn(
                buttonVariants(),
                "bg-primary hover:bg-primary/90 text-white border-none px-8 font-black uppercase italic tracking-wider transition-all hover:scale-105 shadow-lg",
                showActiveState ? "shadow-primary/20" : "shadow-[0_10px_30px_rgba(34,197,94,0.4)]"
              )}
            >
              Join the Pitch
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              "md:hidden p-2 rounded-lg backdrop-blur-md border border-white/20 transition-all",
              showActiveState ? "text-foreground bg-primary/10" : "text-white bg-white/10"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-white/10 p-8 animate-in slide-in-from-top-4 duration-500 rounded-b-3xl shadow-2xl">
            <ul className="flex flex-col gap-6 mb-8 items-center">
              {navLinks.map((link) => (
                <li key={link.name} className="w-full text-center">
                  <Link
                    href={link.href}
                    className="text-xl font-black text-white hover:text-primary transition-all uppercase italic tracking-[0.2em]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4">
              <Link
                href="/auth/login"
                className={cn(buttonVariants({ variant: "outline" }), "w-full h-14 border-white/20 text-white font-bold italic")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className={cn(buttonVariants(), "w-full h-14 bg-primary text-white font-black uppercase italic tracking-widest")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join the Pitch
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
