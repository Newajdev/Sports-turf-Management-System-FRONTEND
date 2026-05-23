import TurfCard from "./turf-card";
import PageHeroSection from "@/components/shared/page-hero-section";
import { ITurf } from "@/interface/turf.interface";

interface TurfPageProps {
  turfs: ITurf[];
}

export default function TurfPage({ turfs }: TurfPageProps) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <PageHeroSection
        title="Available Turfs"
        description="Browse and book top-tier sports venues for your next match."
        badge="Premium Venues"
      />

      <div className="container mx-auto px-4 md:px-6 py-12">
        {turfs.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground italic">
                Showing {turfs.length} available venues
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {turfs.map((turf) => (
                <TurfCard key={turf.id} turf={turf} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-3xl">
            <h2 className="text-xl font-bold mb-2">No turfs found</h2>
            <p className="text-muted-foreground">
              We couldn&apos;t find any available turfs at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
