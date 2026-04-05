import { getTurfByID } from "../_actions";
import { CarouselSpacing } from "@/components/modules/turfs/Carosol";
import { TurfInfoSection } from "@/components/modules/turfs/turf-info-section";
import { BookingCard } from "@/components/modules/turfs/booking-card";
import { ITurf } from "@/interface/turf.interface";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const TurfByIDPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const response = await getTurfByID(id);
  const turf = response?.data as ITurf;

  if (!turf) {
    return <div className="min-h-screen flex items-center justify-center text-foreground font-bold uppercase tracking-widest italic">Turf Not Found</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative pt-20">
        <div className="absolute top-26 left-4 md:left-20 z-20 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-500 bg-background/50 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-500/20">
          <Link href="/" className="hover:text-emerald-400 font-bold uppercase">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/book-a-turf" className="hover:text-emerald-400 font-bold uppercase">Turfs</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white/60 font-bold uppercase">{turf.name}</span>
        </div>
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

            {/* Features/Amenities Placeholder */}
            <div className="space-y-6 pt-6 border-t border-border/50">
                <h3 className="text-2xl font-bold uppercase italic tracking-tighter text-foreground">Facility Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {["Changing Rooms", "Night Lights", "Parking", "Water Station", "First Aid", "Seating Area"].map((amenity) => (
                        <div key={amenity} className="flex items-center gap-3 text-muted-foreground group">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            </div>
                            <span className="font-medium uppercase tracking-tight text-sm font-bold">{amenity}</span>
                        </div>
                    ))}
                </div>
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
