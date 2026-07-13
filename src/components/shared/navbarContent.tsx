/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Trophy, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import PrimaryButton from "./primaryButton";
import NotificationDropdown from "./dashboard/NotificationDropdown";
import UserDropdown from "./dashboard/UserDropdown";

interface navbarProps {
  userInfo: any;
}

export default function NavbarContent({ userInfo }: navbarProps) {
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

  const showActiveState = isScrolled || pathname !== "/";

  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        showActiveState
          ? "bg-background/90 backdrop-blur-xl border-b border-white/10 py-2 lg:py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-4 lg:py-5",
      )}
    >
      <div className="w-full px-3 sm:px-4 lg:px-6">
        <nav className="flex items-center justify-between gap-4 sm:gap-8 lg:gap-12">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary/20 p-1.5 sm:p-2 rounded-lg sm:rounded-xl group-hover:bg-primary/30 transition-all duration-300 shadow-lg shadow-primary/10">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-primary filter brightness-110 drop-shadow-sm" />
              </div>
              <span
                className={cn(
                  "text-lg sm:text-2xl font-black tracking-tighter transition-colors duration-300 hidden sm:inline",
                  showActiveState
                    ? "text-primary"
                    : "text-white drop-shadow-md",
                )}
              >
                Turfix
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-bold transition-all hover:scale-105 tracking-wide uppercase italic whitespace-nowrap",
                    showActiveState
                      ? "text-foreground hover:text-primary"
                      : "text-white/90 hover:text-white drop-shadow-sm opacity-80 hover:opacity-100",
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-6">
            {userInfo ? (
              <div className="flex items-center gap-4">
                <NotificationDropdown />
                <div className="flex items-center gap-2 pl-4 border-l border-muted/50">
                  <div className="flex flex-col items-end">
                    <span
                      className={cn(
                        "text-xs font-bold leading-none",
                        showActiveState ? "text-foreground" : "text-white/90",
                      )}
                    >
                      {userInfo?.name || "User"}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] text-primary bg-primary/20 px-1.5 rounded-sm uppercase tracking-tight",
                        showActiveState ? "text-foreground" : "text-white/70",
                      )}
                    >
                      {userInfo?.role?.replace("_", " ")}
                    </span>
                  </div>
                  <UserDropdown userInfo={userInfo} />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <PrimaryButton
                  href="/auth/login"
                  variant="ghost"
                  className={cn(
                    "font-bold italic transition-colors duration-300 text-sm p-4",
                    showActiveState
                      ? "text-foreground hover:text-primary"
                      : "text-white/90 hover:text-white hover:bg-white/10",
                  )}
                >
                  Log in
                </PrimaryButton>
                <PrimaryButton
                  href="/auth/register"
                  className={cn(
                    "p-4 bg-primary hover:bg-primary/90 text-white text-sm shadow-lg",
                    showActiveState
                      ? "shadow-primary/20"
                      : "shadow-[0_10px_30px_rgba(34,197,94,0.4)]",
                  )}
                >
                  Register
                </PrimaryButton>
              </div>
            )}
          </div>

          {/* Tablet/Mobile Right Section */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            {userInfo ? (
              <div className="flex items-center gap-2">
                <NotificationDropdown />
                <UserDropdown userInfo={userInfo} />
              </div>
            ) : null}

            {/* Mobile Menu Toggle */}
            <button
              className={cn(
                "p-2 rounded-lg backdrop-blur-md border border-white/20 transition-all lg:hidden",
                showActiveState
                  ? "text-foreground bg-primary/10 hover:bg-primary/20"
                  : "text-white bg-white/10 hover:bg-white/20",
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile & Tablet Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-white/10 mt-2 rounded-b-2xl shadow-2xl animate-in slide-in-from-top-4 duration-300">
            <div className="px-4 sm:px-6 py-6 space-y-6">
              {/* Navigation Links */}
              <ul className="flex flex-col gap-4 space-y-2 border-b border-white/10 pb-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-base sm:text-lg font-bold hover:text-primary transition-all uppercase tracking-wide",
                        showActiveState ? "text-foreground" : "text-black",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* User Section or Auth Buttons */}
              {userInfo ? (
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-bold text-foreground">
                      {userInfo?.name || "User"}
                    </span>
                    <span className="text-xs text-primary bg-primary/20 px-2 py-1 rounded-sm uppercase tracking-tight w-fit">
                      {userInfo?.role?.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <PrimaryButton
                    href="/auth/login"
                    variant="outline"
                    size="lg"
                    className="w-full border-white/20 text-black font-bold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log in
                  </PrimaryButton>
                  <PrimaryButton
                    href="/auth/register"
                    size="lg"
                    className="w-full bg-primary text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </PrimaryButton>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
