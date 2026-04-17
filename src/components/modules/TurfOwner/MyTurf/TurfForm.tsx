"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTurf, updateTurf, uploadTurfImages } from "@/services/turf.services";
import { getAllSportTypes } from "@/services/admin.services";
import { createTurfSchema } from "@/zod/turf.validation";
import { Button } from "@/components/ui/button";
import AppField from "@/components/shared/form/AppField";
import FormSubmitBtn from "@/components/shared/form/FormSubmitBtn";
import { toast } from "sonner";
import { useState } from "react";
import { X, Upload, Plus } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TurfFormProps {
    initialData?: any;
    onSuccess: () => void;
}

const TurfForm = ({ initialData, onSuccess }: TurfFormProps) => {
    const isEdit = !!initialData;
    const [images, setImages] = useState<string[]>(initialData?.images || []);
    const [uploading, setUploading] = useState(false);

    const { data: sportTypesResponse } = useQuery({
        queryKey: ["sportTypes"],
        queryFn: () => getAllSportTypes(),
    });

    const sportTypes = sportTypesResponse?.data || [];

    const form = useForm({
        defaultValues: {
            name: initialData?.name || "",
            address: initialData?.address || "",
            description: initialData?.description || "",
            hourlyRate: initialData?.hourlyRate ? Number(initialData.hourlyRate) : 0,
            openingTime: initialData?.openingTime || "08:00",
            closingTime: initialData?.closingTime || "22:00",
            sportsTypes: initialData?.sportTypes?.map((s: any) => s.id) || [],
        },
        onSubmit: async ({ value }) => {
            if (images.length < 3) {
                toast.error("Please upload at least 3 images");
                return;
            }

            const payload = {
                ...value,
                images,
                hourlyRate: Number(value.hourlyRate),
            };

            try {
                let response;
                if (isEdit) {
                    response = await updateTurf(initialData.id, payload);
                } else {
                    response = await createTurf(payload);
                }

                if (response.success) {
                    toast.success(isEdit ? "Turf updated successfully" : "Turf created successfully");
                    onSuccess();
                } else {
                    toast.error(response.message || "Something went wrong");
                }
            } catch (error: any) {
                toast.error(error.message || "An error occurred");
            }
        },
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const formData = new FormData();
        Array.from(files).forEach((file) => formData.append("images", file));

        try {
            const result = await uploadTurfImages(formData);
            if (result.success) {
                // If the response returns the whole turf object, extract images
                const newImages = result.data?.images || result.data || [];
                // If it's just strings, append them
                if (Array.isArray(newImages)) {
                    setImages((prev) => [...prev, ...newImages]);
                }
                toast.success("Images uploaded successfully");
            } else {
                toast.error(result.message || "Upload failed");
            }
        } catch (error) {
            toast.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <form.Field name="name">
                    {(field) => <AppField field={field} label="Turf Name" placeholder="e.g. Arena 71" />}
                </form.Field>

                <form.Field name="hourlyRate">
                    {(field) => (
                        <AppField 
                            field={field} 
                            label="Hourly Rate (BDT)" 
                            type="number" 
                            placeholder="e.g. 1500" 
                        />
                    )}
                </form.Field>
            </div>

            <form.Field name="address">
                {(field) => <AppField field={field} label="Address" placeholder="Enter full address" />}
            </form.Field>

            <form.Field name="description">
                {(field) => (
                   <div className="space-y-2">
                        <Label>Description</Label>
                        <textarea
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Describe your turf..."
                        />
                   </div>
                )}
            </form.Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <form.Field name="openingTime">
                    {(field) => <AppField field={field} label="Opening Time" type="time" />}
                </form.Field>
                <form.Field name="closingTime">
                    {(field) => <AppField field={field} label="Closing Time" type="time" />}
                </form.Field>
            </div>

            {/* Sports Types Selection */}
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
                                                field.handleChange(current.filter((id: string) => id !== sport.id));
                                            }
                                        }}
                                    />
                                    <Label htmlFor={sport.id} className="cursor-pointer font-medium">{sport.name}</Label>
                                </div>
                            )}
                        </form.Field>
                    ))}
                </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
                <Label className="text-base font-semibold">Turf Images (Min 3 required)</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img, idx) => (
                        <div key={idx} className="group relative aspect-video rounded-xl overflow-hidden border bg-muted">
                            <Image src={img} alt={`Turf ${idx}`} fill className="object-cover" />
                            <button 
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                    
                    <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 transition-all hover:bg-muted/50">
                        {uploading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                        ) : (
                            <>
                                <Upload className="h-6 w-6 text-muted-foreground" />
                                <span className="mt-2 text-xs text-muted-foreground">Add Image</span>
                            </>
                        )}
                        <input type="file" multiple className="hidden" onChange={handleImageUpload} disabled={uploading} accept="image/*" />
                    </label>
                </div>
            </div>

            <div className="pt-6 border-t">
                <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
                    {([canSubmit, isSubmitting]) => (
                        <FormSubmitBtn 
                            isPending={isSubmitting} 
                            disabled={!canSubmit || images.length < 3}
                            className="w-full h-12 text-lg font-bold"
                        >
                            {isEdit ? "Update Turf Details" : "Register Turf"}
                        </FormSubmitBtn>
                    )}
                </form.Subscribe>
            </div>
        </form>
    );
};

export default TurfForm;
