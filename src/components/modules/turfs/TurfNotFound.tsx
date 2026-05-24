import Link from "next/link";
import { MapPinOff } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

export function TurfNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <MapPinOff className="h-16 w-16 text-muted-foreground/40 mb-6" />
      <h1 className="text-2xl font-bold mb-2">Turf not found</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        This venue may have been removed or the link is incorrect. Browse available turfs to find another venue.
      </p>
      <Link href="/book-a-turf" className={cn(buttonVariants())}>
        Browse all turfs
      </Link>
    </div>
  );
}
