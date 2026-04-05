import { getTurfByID } from "../_actions";
import { CarouselSpacing } from "@/components/modules/turfs/Carosol";
import { TurfInfoSection } from "@/components/modules/turfs/turf-info-section";
import { BookingCard } from "@/components/modules/turfs/booking-card";
import { TurfItem } from "@/interface/turf.interface";

const TurfByIDPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const response = await getTurfByID(id);
  const turf = response?.data as TurfItem;

  if (!turf) {
    return <div className="min-h-screen flex items-center justify-center text-foreground font-bold uppercase tracking-widest italic">Turf Not Found</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative pt-16">
        <CarouselSpacing images={turf.images} />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 md:px-0 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-12">
            <TurfInfoSection turf={turf} />
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold uppercase italic tracking-tighter text-foreground decoration-emerald-500 decoration-3 underline-offset-8">Description</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                {turf.description || "Experience top-tier sporting action at " + turf.name + ". Our facility offers professional-grade surface quality, excellent lighting for night matches, and a comfortable environment for both players and spectators. Located at " + turf.address + ", we are your local destination for football, cricket, and more."}
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-4 h-fit">
            <BookingCard turf={turf} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TurfByIDPage;
