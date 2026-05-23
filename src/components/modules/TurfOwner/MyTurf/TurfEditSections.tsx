/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Upload, X } from "lucide-react";
import Image from "next/image";
import {
  updateTurf,
  uploadTurfImages,
  deleteTurfImage,
} from "@/services/turf.services";
import { getAllSportTypes } from "@/services/admin.services";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DialogFooter } from "@/components/ui/dialog";
import { TurfStatus } from "@/interface/enum.interface";
import {
  turfToFormDefaults,
  WEEKLY_OFF_DAY_OPTIONS,
  TURF_STATUS_OPTIONS,
  type TurfUpdatePayload,
} from "./turfFormUtils";
import type { TurfEditSectionId } from "./turfEditSectionMeta";

interface TurfEditSectionsProps {
  turf: any;
  onUpdated: () => void;
  sections?: TurfEditSectionId[];
  /** Hide per-section titles when the parent dialog already shows them */
  hideSectionTitles?: boolean;
}

const ALL_SECTIONS: TurfEditSectionId[] = [
  "basic",
  "pricing",
  "schedule",
  "contact",
  "sports",
  "status",
  "images",
];

function SectionFields({
  title,
  description,
  children,
  onSave,
  isSaving,
  showFooter = true,
  showHeader = true,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSave: () => void;
  isSaving: boolean;
  showFooter?: boolean;
  showHeader?: boolean;
}) {
  return (
    <div className="space-y-4">
      {showHeader && (
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
      {showFooter && (
        <DialogFooter className="px-0 pt-2 sm:justify-start">
          <Button type="button" onClick={onSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      )}
    </div>
  );
}

export default function TurfEditSections({
  turf,
  onUpdated,
  sections = ALL_SECTIONS,
  hideSectionTitles = false,
}: TurfEditSectionsProps) {
  const visible = new Set(sections);
  const defaults = turfToFormDefaults(turf);
  const [savingSection, setSavingSection] = useState<string | null>(null);

  const [basic, setBasic] = useState({
    name: defaults.name,
    address: defaults.address,
    description: defaults.description,
  });
  const [pricing, setPricing] = useState({ hourlyRate: defaults.hourlyRate });
  const [schedule, setSchedule] = useState({
    openingTime: defaults.openingTime,
    closingTime: defaults.closingTime,
    weeklyOffDays: defaults.weeklyOffDays,
    isAlwaysOpen: defaults.isAlwaysOpen,
  });
  const [contact, setContact] = useState({
    contactNumbers: defaults.contactNumbers,
    emailAddress: defaults.emailAddress,
  });
  const [sportsTypes, setSportsTypes] = useState<string[]>(defaults.sportsTypes);
  const [status, setStatus] = useState({
    turfStatus: defaults.turfStatus,
    maintenanceStart: "",
    maintenanceEnd: "",
    maintenanceNotice: "",
  });
  const [images, setImages] = useState<string[]>(turf.images ?? []);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  const { data: sportTypesResponse } = useQuery({
    queryKey: ["sportTypes"],
    queryFn: () => getAllSportTypes(),
  });
  const sportTypes = sportTypesResponse?.data || [];

  const patch = async (section: string, payload: TurfUpdatePayload) => {
    setSavingSection(section);
    const res = await updateTurf(turf.id, payload);
    if (res.success) {
      toast.success("Updated successfully");
      onUpdated();
    } else {
      toast.error(res.message || "Update failed");
    }
    setSavingSection(null);
  };

  const saveBasic = () =>
    patch("basic", {
      name: basic.name.trim(),
      address: basic.address.trim(),
      description: basic.description.trim() || undefined,
    });

  const savePricing = () =>
    patch("pricing", { hourlyRate: Number(pricing.hourlyRate) });

  const saveSchedule = () =>
    patch("schedule", {
      openingTime: schedule.openingTime,
      closingTime: schedule.closingTime,
      weeklyOffDays: schedule.weeklyOffDays,
      isAlwaysOpen: schedule.isAlwaysOpen,
    });

  const saveContact = () => {
    const numbers = contact.contactNumbers
      .map((n) => n.trim())
      .filter(Boolean);
    return patch("contact", {
      contactNumber: numbers.length > 0 ? numbers : undefined,
      emailAddress: contact.emailAddress.trim() || null,
    });
  };

  const saveSports = () => patch("sports", { sportsTypes });

  const saveStatus = () => {
    const payload: TurfUpdatePayload = { turfStatus: status.turfStatus };
    if (status.turfStatus === TurfStatus.MAINTENANCE) {
      if (
        !status.maintenanceStart ||
        !status.maintenanceEnd ||
        !status.maintenanceNotice.trim()
      ) {
        toast.error(
          "Maintenance mode requires start date, end date, and notice",
        );
        return;
      }
      payload.maintenanceDetails = {
        startDateTime: new Date(status.maintenanceStart).toISOString(),
        endDateTime: new Date(status.maintenanceEnd).toISOString(),
        notice: status.maintenanceNotice.trim(),
      };
    }
    return patch("status", payload);
  };

  const handleUploadImages = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Select at least one image to upload");
      return;
    }
    setUploadingImages(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));
    const res = await uploadTurfImages(formData);
    if (res.success) {
      const updated = (res.data as { images?: string[] })?.images;
      if (updated?.length) setImages(updated);
      setSelectedFiles([]);
      toast.success("Images uploaded");
      onUpdated();
    } else {
      toast.error(res.message || "Upload failed");
    }
    setUploadingImages(false);
  };

  const handleRemoveImage = async (imageUrl: string) => {
    setUploadingImages(true);
    const res = await deleteTurfImage(turf.id, imageUrl);
    if (res.success) {
      setImages((prev) => prev.filter((img) => img !== imageUrl));
      toast.success("Image removed");
      onUpdated();
    } else {
      toast.error(res.message || "Failed to remove image");
    }
    setUploadingImages(false);
  };

  const toggleOffDay = (day: (typeof WEEKLY_OFF_DAY_OPTIONS)[number]) => {
    setSchedule((prev) => ({
      ...prev,
      weeklyOffDays: prev.weeklyOffDays.includes(day)
        ? prev.weeklyOffDays.filter((d) => d !== day)
        : [...prev.weeklyOffDays, day],
    }));
  };

  return (
    <div className="space-y-6">
      {visible.has("basic") && (
        <SectionFields
          title="Basic Information"
          description="Name, address, and description"
          onSave={saveBasic}
          isSaving={savingSection === "basic"}
          showHeader={!hideSectionTitles}
        >
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Turf Name</Label>
              <Input
                value={basic.name}
                onChange={(e) =>
                  setBasic((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                value={basic.address}
                onChange={(e) =>
                  setBasic((p) => ({ ...p, address: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                value={basic.description}
                onChange={(e) =>
                  setBasic((p) => ({ ...p, description: e.target.value }))
                }
              />
            </div>
          </div>
        </SectionFields>
      )}

      {visible.has("pricing") && (
        <SectionFields
          title="Pricing"
          onSave={savePricing}
          isSaving={savingSection === "pricing"}
          showHeader={!hideSectionTitles}
        >
          <div className="space-y-2 max-w-xs">
            <Label>Hourly Rate (BDT)</Label>
            <Input
              type="number"
              min={0}
              value={pricing.hourlyRate}
              onChange={(e) =>
                setPricing({ hourlyRate: Number(e.target.value) })
              }
            />
          </div>
        </SectionFields>
      )}

      {visible.has("schedule") && (
        <SectionFields
          title="Schedule"
          description="Operating hours, weekly off days, and 24/7 mode"
          onSave={saveSchedule}
          isSaving={savingSection === "schedule"}
          showHeader={!hideSectionTitles}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Opening Time</Label>
              <Input
                type="time"
                value={schedule.openingTime}
                onChange={(e) =>
                  setSchedule((p) => ({ ...p, openingTime: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Closing Time</Label>
              <Input
                type="time"
                value={schedule.closingTime}
                onChange={(e) =>
                  setSchedule((p) => ({ ...p, closingTime: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="isAlwaysOpen"
              checked={schedule.isAlwaysOpen}
              onCheckedChange={(checked) =>
                setSchedule((p) => ({ ...p, isAlwaysOpen: checked === true }))
              }
            />
            <Label htmlFor="isAlwaysOpen" className="cursor-pointer">
              Open 24/7 (always open)
            </Label>
          </div>
          <div className="space-y-2">
            <Label>Weekly Off Days</Label>
            <div className="flex flex-wrap gap-2">
              {WEEKLY_OFF_DAY_OPTIONS.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleOffDay(day)}
                  className="focus:outline-none"
                >
                  <Badge
                    variant={
                      schedule.weeklyOffDays.includes(day)
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {day}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </SectionFields>
      )}

      {visible.has("contact") && (
        <SectionFields
          title="Contact"
          onSave={saveContact}
          isSaving={savingSection === "contact"}
          showHeader={!hideSectionTitles}
        >
          <div className="space-y-3">
            <Label>Phone Numbers</Label>
            {contact.contactNumbers.map((num, idx) => (
              <div key={idx} className="flex gap-2">
                <Input
                  value={num}
                  placeholder="e.g. 01700000000"
                  onChange={(e) => {
                    const next = [...contact.contactNumbers];
                    next[idx] = e.target.value;
                    setContact((p) => ({ ...p, contactNumbers: next }));
                  }}
                />
                {contact.contactNumbers.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setContact((p) => ({
                        ...p,
                        contactNumbers: p.contactNumbers.filter(
                          (_, i) => i !== idx,
                        ),
                      }))
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                setContact((p) => ({
                  ...p,
                  contactNumbers: [...p.contactNumbers, ""],
                }))
              }
            >
              <Plus className="h-4 w-4 mr-1" /> Add Number
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={contact.emailAddress}
              onChange={(e) =>
                setContact((p) => ({ ...p, emailAddress: e.target.value }))
              }
            />
          </div>
        </SectionFields>
      )}

      {visible.has("sports") && (
        <SectionFields
          title="Sports Types"
          onSave={saveSports}
          isSaving={savingSection === "sports"}
          showHeader={!hideSectionTitles}
        >
          <div className="grid grid-cols-2 gap-3">
            {sportTypes.map((sport: any) => (
              <div
                key={sport.id}
                className="flex items-center space-x-2 rounded-lg border p-3"
              >
                <Checkbox
                  id={`edit-sport-${sport.id}`}
                  checked={sportsTypes.includes(sport.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSportsTypes((prev) => [...prev, sport.id]);
                    } else {
                      setSportsTypes((prev) =>
                        prev.filter((id) => id !== sport.id),
                      );
                    }
                  }}
                />
                <Label
                  htmlFor={`edit-sport-${sport.id}`}
                  className="cursor-pointer font-medium"
                >
                  {sport.title}
                </Label>
              </div>
            ))}
          </div>
        </SectionFields>
      )}

      {visible.has("status") && (
        <SectionFields
          title="Venue Status"
          description="Set operational status; maintenance requires schedule details"
          onSave={saveStatus}
          isSaving={savingSection === "status"}
          showHeader={!hideSectionTitles}
        >
          <div className="flex flex-wrap gap-2">
            {TURF_STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus((p) => ({ ...p, turfStatus: s }))}
              >
                <Badge variant={status.turfStatus === s ? "default" : "outline"}>
                  {s}
                </Badge>
              </button>
            ))}
          </div>
          {status.turfStatus === TurfStatus.MAINTENANCE && (
            <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t">
              <div className="space-y-2">
                <Label>Maintenance Start</Label>
                <Input
                  type="datetime-local"
                  value={status.maintenanceStart}
                  onChange={(e) =>
                    setStatus((p) => ({
                      ...p,
                      maintenanceStart: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Maintenance End</Label>
                <Input
                  type="datetime-local"
                  value={status.maintenanceEnd}
                  onChange={(e) =>
                    setStatus((p) => ({ ...p, maintenanceEnd: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Notice to Players</Label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                  value={status.maintenanceNotice}
                  onChange={(e) =>
                    setStatus((p) => ({
                      ...p,
                      maintenanceNotice: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}
        </SectionFields>
      )}

      {visible.has("images") && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <div
                key={`${img}-${idx}`}
                className="group relative aspect-video rounded-lg overflow-hidden border"
              >
                <Image
                  src={img}
                  alt={`Turf ${idx}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img)}
                  disabled={uploadingImages}
                  className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed hover:bg-muted/50 transition-colors">
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="mt-2 text-xs text-muted-foreground">Add</span>
              <input
                type="file"
                multiple
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setSelectedFiles(Array.from(e.target.files));
                  }
                }}
              />
            </label>
          </div>
          {selectedFiles.length > 0 && (
            <DialogFooter className="px-0 sm:justify-start">
              <Button
                type="button"
                onClick={handleUploadImages}
                disabled={uploadingImages}
              >
                {uploadingImages
                  ? "Uploading..."
                  : `Upload ${selectedFiles.length} image(s)`}
              </Button>
            </DialogFooter>
          )}
        </div>
      )}
    </div>
  );
}
