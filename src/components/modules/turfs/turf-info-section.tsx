import { Badge } from "@/components/ui/badge";
import { TurfItem } from "@/interface/turf.interface";
import { Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";

interface TurfInfoSectionProps {
  turf: TurfItem;
}

export const TurfInfoSection = ({ turf }: TurfInfoSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Title and Rating */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {turf.sportTypes.map((sport) => (
            <Badge key={sport.id} variant="secondary" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-none px-3 py-1">
              <Image src={sport.icon} alt={sport.title} width={16} height={16} className="mr-2" />
              {sport.title}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight italic uppercase">
          {turf.name}
        </h1>
        <div className="flex items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Star className="w-5 h-5 text-emerald-500 fill-emerald-500" />
            <span className="font-semibold text-foreground text-lg">{turf.rating}</span>
            <span>({turf.reviewCount} Reviews)</span>
          </div>
          <div className="flex items-center gap-1.5 uppercase font-medium tracking-wider">
            <MapPin className="w-5 h-5 text-emerald-500" />
            {turf.address}
          </div>
        </div>
      </div>

      {/* Description */}
      {turf.description && (
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground text-lg leading-relaxed">
            {turf.description}
          </p>
        </div>
      )}

      {/* Quick Details */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-tighter">Operating Hours</span>
          </div>
          <p className="text-lg font-semibold">{turf.openingTime} - {turf.closingTime}</p>
        </div>
        
        <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-1 font-medium uppercase tracking-tighter">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Location</span>
          </div>
          <p className="text-lg font-semibold">{turf.address.split(' ').pop()}</p>
        </div>
      </div>
    </div>
  );
};
