"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        onClick={scrollToTop}
        className={cn(
          "h-12 w-12 rounded-full bg-primary p-0 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 hover:scale-110 active:scale-95 border-none",
          isVisible 
            ? "translate-y-0 opacity-100 pointer-events-auto" 
            : "translate-y-10 opacity-0 pointer-events-none"
        )}
        aria-label="Back to Top"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </div>
  );
}
