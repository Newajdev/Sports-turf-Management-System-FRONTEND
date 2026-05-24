import { Badge } from "@/components/ui/badge";
import { ITurf } from "@/interface/turf.interface";
import { TurfStatus } from "@/interface/enum.interface";
import {
  Clock,
  MapPin,
  Star,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

interface TurfInfoSectionProps {
  turf: ITurf;
}

export const TurfInfoSection = ({ turf }: TurfInfoSectionProps) => {
  const rating =
    typeof turf.rating === "number"
      ? turf.rating.toFixed(1)
      : Number(turf.rating).toFixed(1);

  const statusLabel: Record<TurfStatus, string> = {
    [TurfStatus.ACTIVE]: "Open for booking",
    [TurfStatus.MAINTENANCE]: "Under maintenance",
    [TurfStatus.DISABLED]: "Currently unavailable",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {turf.sportTypes?.map((sport) => (
          <Badge
            key={sport.id}
            variant="secondary"
            className="bg-primary/10 text-primary border-none px-3 py-1"
          >
            {sport.icon && (
              <Image
                src={sport.icon}
                alt=""
                width={16}
                height={16}
                className="mr-2 rounded-sm"
              />
            )}
            {sport.title}
          </Badge>
        ))}
        <Badge
          variant="outline"
          className={
            turf.turfStatus === TurfStatus.ACTIVE
              ? "border-primary/30 text-primary"
              : "border-amber-500/30 text-amber-600"
          }
        >
          {statusLabel[turf.turfStatus] ?? turf.turfStatus}
        </Badge>
      </div>

      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          {turf.name}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-foreground">{rating}</span>
            <span className="text-sm">
              ({turf.reviewCount} review{turf.reviewCount !== 1 ? "s" : ""})
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span>{turf.address}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
          <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Hours
            </p>
            <p className="font-semibold text-foreground">
              {turf.openingTime} – {turf.closingTime}
            </p>
            {turf.isAlwaysOpen && (
              <p className="text-xs text-primary mt-0.5">Open 24/7</p>
            )}
          </div>
        </div>

        {turf.contactNumber?.[0] && (
          <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
            <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Contact
              </p>
              <p className="font-semibold text-foreground">{turf.contactNumber[0]}</p>
            </div>
          </div>
        )}

        {turf.emailAddress && (
          <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
            <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Email
              </p>
              <p className="font-semibold text-foreground text-sm break-all">
                {turf.emailAddress}
              </p>
            </div>
          </div>
        )}

        {turf.isVerifiedEmail && (
          <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-4 sm:col-span-2 lg:col-span-1">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Verified venue
              </p>
              <p className="text-sm text-muted-foreground">
                Contact details confirmed by TurfBook
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
