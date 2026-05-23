"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface SectionEditButtonProps {
  onClick: () => void;
  label?: string;
}

export default function SectionEditButton({
  onClick,
  label = "Edit",
}: SectionEditButtonProps) {
  return (
    <Button variant="outline" size="sm" className="gap-2" onClick={onClick}>
      <Pencil className="h-4 w-4" />
      {label}
    </Button>
  );
}
