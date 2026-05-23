"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Star,
  Trophy,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { ITurf } from "@/interface/turf.interface";
import SectionEditButton from "./SectionEditButton";
import type { TurfEditSectionId } from "./turfEditSectionMeta";

interface MyTurfProfileProps {
  turf: ITurf;
  onEditSection: (section: TurfEditSectionId) => void;
}

const MyTurfProfile = ({ turf, onEditSection }: MyTurfProfileProps) => {
  const contactNumbers = turf.contactNumber?.filter(Boolean) ?? [];

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-xl overflow-hidden">
        <div className="relative h-48 w-full bg-muted">
          <Image
            src={turf.images?.[0] || "/placeholder-turf.jpg"}
            alt={turf.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold text-white">{turf.name}</h2>
                <Badge>{turf.turfStatus}</Badge>
                {turf.isAlwaysOpen && (
                  <Badge variant="secondary">24/7 Open</Badge>
                )}
              </div>
              <p className="flex items-center gap-2 text-sm text-white/80">
                <MapPin className="h-4 w-4 shrink-0" />
                {turf.address}
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="gap-2 shrink-0"
              onClick={() => onEditSection("status")}
            >
              Edit status
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                About this venue
              </CardTitle>
              <SectionEditButton onClick={() => onEditSection("basic")} />
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {turf.description || "No description provided."}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                Venue gallery
              </CardTitle>
              <SectionEditButton onClick={() => onEditSection("images")} />
            </CardHeader>
            <CardContent className="pt-6">
              {turf.images?.length ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {turf.images.map((img, idx) => (
                    <div
                      key={`${img}-${idx}`}
                      className="relative aspect-video rounded-lg overflow-hidden border"
                    >
                      <Image
                        src={img}
                        alt={`Gallery ${idx}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No images uploaded yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg">Pricing</CardTitle>
              <SectionEditButton onClick={() => onEditSection("pricing")} />
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">
                  {Number(turf.hourlyRate).toLocaleString()}
                </span>
                <span className="text-muted-foreground">BDT / hour</span>
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-semibold">{turf.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {turf.reviewCount} reviews
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Schedule
              </CardTitle>
              <SectionEditButton onClick={() => onEditSection("schedule")} />
            </CardHeader>
            <CardContent className="pt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Business hours</span>
                <span className="font-medium">
                  {turf.isAlwaysOpen
                    ? "24/7"
                    : `${turf.openingTime} – ${turf.closingTime}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weekly off days</span>
                <span className="font-medium">
                  {turf.weeklyOffDays?.length > 0
                    ? turf.weeklyOffDays.join(", ")
                    : "None"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg">Contact</CardTitle>
              <SectionEditButton onClick={() => onEditSection("contact")} />
            </CardHeader>
            <CardContent className="pt-6 space-y-3 text-sm">
              {contactNumbers.length > 0 ? (
                contactNumbers.map((num, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary shrink-0" />
                    <span>{num}</span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No phone numbers</p>
              )}
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate">
                  {turf.emailAddress || "No email"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg">Sports types</CardTitle>
              <SectionEditButton onClick={() => onEditSection("sports")} />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {turf.sportTypes?.length ? (
                  turf.sportTypes.map((sport) => (
                    <Badge key={sport.id} variant="secondary">
                      {sport.title}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No sports types selected.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyTurfProfile;
