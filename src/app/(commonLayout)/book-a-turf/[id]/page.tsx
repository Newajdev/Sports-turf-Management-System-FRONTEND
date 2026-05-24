import { getTurfByID } from "../_actions";
import { TurfGallery } from "@/components/modules/turfs/TurfGallery";
import { TurfInfoSection } from "@/components/modules/turfs/turf-info-section";
import { BookingCard } from "@/components/modules/turfs/booking-card";
import { CustomSlotRequestForm } from "@/components/modules/turfs/CustomSlotRequestForm";
import { ReportTurfDialog } from "@/components/modules/turfs/ReportTurfDialog";
import { TurfReviewsClient } from "@/components/modules/turfs/TurfReviewsClient";
import { SaveTurfButton } from "@/components/modules/turfs/SaveTurfButton";
import { TurfNotFound } from "@/components/modules/turfs/TurfNotFound";
import { ITurf } from "@/interface/turf.interface";
import { getUserInfo } from "@/services/auth.services";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const TurfByIDPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const [response, user] = await Promise.all([getTurfByID(id), getUserInfo()]);
  const turf = response?.data as ITurf | undefined;
  const isLoggedIn = !!user;

  if (!response?.success || !turf?.id) {
    return <TurfNotFound />;
  }

  const amenities = turf.amenities ?? [];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-16">
    

      <TurfGallery images={turf.images} turfName={turf.name} />

      <div className="container mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-8 space-y-10">
            <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <TurfInfoSection turf={turf} />
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <SaveTurfButton turfId={turf.id} isLoggedIn={isLoggedIn} />
                  <ReportTurfDialog
                    turfId={turf.id}
                    turfName={turf.name}
                    isLoggedIn={isLoggedIn}
                  />
                </div>
              </div>
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">About this venue</h2>
              <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
                <p className="text-muted-foreground leading-relaxed">
                  {turf.description ||
                    `Play at ${turf.name} — a quality venue at ${turf.address}. Open ${turf.openingTime} to ${turf.closingTime} with professional facilities for your next match.`}
                </p>
              </div>
            </section>

            {amenities.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-4 py-3 text-sm font-medium"
                    >
                      <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-semibold text-foreground">Reviews</h2>
                {turf.reviewCount > 0 && (
                  <Badge variant="secondary">{turf.reviewCount} total</Badge>
                )}
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
                <TurfReviewsClient turfId={turf.id} />
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-5">
            <BookingCard turf={turf} isLoggedIn={isLoggedIn} />
            <CustomSlotRequestForm turf={turf} isLoggedIn={isLoggedIn} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TurfByIDPage;
