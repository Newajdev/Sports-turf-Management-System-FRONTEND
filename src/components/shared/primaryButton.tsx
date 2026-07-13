"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ReactNode } from "react";

interface PrimaryButtonProps {
  /** Navigation href - if provided, renders as a Link */
  href?: string;
  /** Button content */
  children: ReactNode;
  /** Click handler for button elements */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Button size */
  size?: "default" | "sm" | "lg";
  /** Variant style */
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "secondary"
    | "destructive"
    | "link";
  /** HTML type attribute (only for button elements) */
  type?: "button" | "submit" | "reset";
  /** Disable the button */
  disabled?: boolean;
}

const PrimaryButton = ({
  href,
  children,
  onClick,
  className,
  size = "default",
  variant = "default",
  type = "button",
  disabled = false,
}: PrimaryButtonProps) => {
  const baseStyles = cn(
    buttonVariants({ variant, size }),
    "font-black uppercase italic tracking-widest transition-all hover:scale-105 active:scale-95",
    className,
  );

  // Render as Link if href is provided
  if (href) {
    return (
      <Link href={href} className={baseStyles} onClick={onClick}>
        {children}
      </Link>
    );
  }

  // Render as button element
  return (
    <button
      type={type}
      className={baseStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
