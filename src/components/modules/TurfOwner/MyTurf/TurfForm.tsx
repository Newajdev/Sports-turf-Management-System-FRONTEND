/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { createTurf, uploadTurfImages } from "@/services/turf.services";
import { getAllSportTypes } from "@/services/admin.services";
import AppField from "@/components/shared/form/AppField";
import FormSubmitBtn from "@/components/shared/form/FormSubmitBtn";
import { toast } from "sonner";
import { useState } from "react";
import { Upload } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  WEEKLY_OFF_DAY_OPTIONS,
  type TurfCreatePayload,
} from "./turfFormUtils";
import { WeeklyOffDay } from "@/interface/enum.interface";

interface TurfFormProps {
  onSuccess: () => void;
}

const TurfForm = ({ onSuccess }: TurfFormProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [weeklyOffDays, setWeeklyOffDays] = useState<WeeklyOffDay[]>([]);
  const [isAlwaysOpen, setIsAlwaysOpen] = useState(false);
  const [contactNumbers, setContactNumbers] = useState<string[]>([""]);

  const { data: sportTypesResponse } = useQuery({
    queryKey: ["sportTypes"],
    queryFn: () => getAllSportTypes(),
  });

  const sportTypes = sportTypesResponse?.data || [];

  const uploadPendingImages = async () => {
    if (selectedFiles.length === 0) {
      return { success: true, data: null, message: "" };
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    return uploadTurfImages(formData);
  };

  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
      description: "",
      hourlyRate: 0,
      openingTime: "08:00",
      closingTime: "22:00",
      emailAddress: "",
      sportsTypes: [] as string[],
    },

    onSubmit: async ({ value }) => {
      if (!value.name.trim() || !value.address.trim()) {
        toast.error("Name and address are required");
        return;
      }

      const payload: TurfCreatePayload = {
        name: value.name.trim(),
        address: value.address.trim(),
        openingTime: value.openingTime,
        closingTime: value.closingTime,
        hourlyRate: Number(value.hourlyRate),
      };

      if (value.description.trim()) {
        payload.description = value.description.trim();
      }

      const numbers = contactNumbers.map((n) => n.trim()).filter(Boolean);
      if (numbers.length > 0) {
        payload.contactNumber = numbers;
      }

      if (value.emailAddress.trim()) {
        payload.emailAddress = value.emailAddress.trim();
      }

      if (weeklyOffDays.length > 0) {
        payload.weeklyOffDays = weeklyOffDays;
      }

      if (isAlwaysOpen) {
        payload.isAlwaysOpen = true;
      }

      if (value.sportsTypes.length > 0) {
        payload.sportsTypes = value.sportsTypes;
      }

      try {
        setUploading(true);
        const response = await createTurf(payload);

        if (!response.success) {
          toast.error(response.message || "Something went wrong");
          return;
        }

        if (selectedFiles.length > 0) {
          const uploadResult = await uploadPendingImages();
          if (!uploadResult.success) {
            toast.error(
              uploadResult.message ||
                "Venue created, but image upload failed. Add images from edit.",
            );
          }
        }

        toast.success("Turf created successfully");
        onSuccess();
      } catch (error: any) {
        toast.error(error.message || "An error occurred");
      } finally {
        setUploading(false);
      }
    },
  });

  const toggleOffDay = (day: WeeklyOffDay) => {
    setWeeklyOffDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-8"
    >
      <p className="text-sm text-muted-foreground rounded-xl bg-muted/50 p-4">
        Only name, address, hours, and hourly rate are required. You can add
        contact info, sports, images, and other details now or later from your
        venue profile.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form.Field name="name">
          {(field) => (
            <AppField
              field={field}
              label="Turf Name *"
              placeholder="e.g. Arena 71"
            />
          )}
        </form.Field>

        <form.Field name="hourlyRate">
          {(field) => (
            <AppField
              field={field}
              label="Hourly Rate (BDT) *"
              type="number"
              placeholder="e.g. 1500"
            />
          )}
        </form.Field>
      </div>

      <form.Field name="address">
        {(field) => (
          <AppField
            field={field}
            label="Address *"
            placeholder="Enter full address"
          />
        )}
      </form.Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form.Field name="openingTime">
          {(field) => (
            <AppField field={field} label="Opening Time *" type="time" />
          )}
        </form.Field>
        <form.Field name="closingTime">
          {(field) => (
            <AppField field={field} label="Closing Time *" type="time" />
          )}
        </form.Field>
      </div>

      <div className="space-y-6 rounded-2xl border border-dashed p-6">
        <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
          Optional details
        </h4>

        <form.Field name="description">
          {(field) => (
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Describe your turf..."
              />
            </div>
          )}
        </form.Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Contact Number</Label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={contactNumbers[0]}
              onChange={(e) => setContactNumbers([e.target.value])}
              placeholder="e.g. 01700000000"
            />
          </div>
          <form.Field name="emailAddress">
            {(field) => (
              <AppField
                field={field}
                label="Email"
                type="email"
                placeholder="turf@example.com"
              />
            )}
          </form.Field>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="create-isAlwaysOpen"
            checked={isAlwaysOpen}
            onCheckedChange={(checked) => setIsAlwaysOpen(checked === true)}
          />
          <Label htmlFor="create-isAlwaysOpen" className="cursor-pointer">
            Open 24/7
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
              >
                <Badge
                  variant={
                    weeklyOffDays.includes(day) ? "destructive" : "secondary"
                  }
                >
                  {day}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold">Supported Sports</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sportTypes.map((sport: any) => (
              <form.Field key={sport.id} name="sportsTypes">
                {(field) => (
                  <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id={sport.id}
                      checked={field.state.value?.includes(sport.id)}
                      onCheckedChange={(checked) => {
                        const current = field.state.value || [];
                        if (checked) {
                          field.handleChange([...current, sport.id]);
                        } else {
                          field.handleChange(
                            current.filter((id: string) => id !== sport.id),
                          );
                        }
                      }}
                    />
                    <Label
                      htmlFor={sport.id}
                      className="cursor-pointer font-medium"
                    >
                      {sport.title}
                    </Label>
                  </div>
                )}
              </form.Field>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold">Turf Images (optional)</Label>
          <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 transition-all hover:bg-muted/50">
            {uploading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            ) : (
              <>
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="mt-2 text-xs text-muted-foreground">
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} file(s) selected — uploads after create`
                    : "Add images (optional)"}
                </span>
              </>
            )}
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  setSelectedFiles(Array.from(e.target.files));
                }
              }}
              disabled={uploading}
              accept="image/*"
            />
          </label>
        </div>
      </div>

      <div className="pt-6 border-t">
        <form.Subscribe
          selector={(s) => [s.canSubmit, s.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <FormSubmitBtn
              isPending={isSubmitting || uploading}
              disabled={!canSubmit || uploading}
              className="w-full h-12 text-lg font-bold"
            >
              Register Turf
            </FormSubmitBtn>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
};

export default TurfForm;
