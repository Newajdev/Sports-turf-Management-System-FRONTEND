"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, uploadProfileImage } from "@/services/user.services";
import { updateProfileSchema } from "@/zod/user.validation";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AppField from "@/components/shared/form/AppField";
import FormSubmitBtn from "@/components/shared/form/FormSubmitBtn";
import { Edit3, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

interface UpdateProfileModalProps {
  user: any;
}

const UpdateProfileModal = ({ user }: UpdateProfileModalProps) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(user.image || "");
  const queryClient = useQueryClient();

  const roleData = user.player || user.turfOwner || user.systemAdmin || {};

  const form = useForm({
    defaultValues: {
      name: user.name || "",
      profilePhoto: user.image || "",
      contactNumber: roleData.contactNumber || "",
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await updateProfile(value);
        if (response.success) {
          toast.success("Profile updated successfully");
          queryClient.invalidateQueries({ queryKey: ["user-profile"] });
          setOpen(false);
        } else {
          toast.error(response.message || "Failed to update profile");
        }
      } catch (error: any) {
        toast.error(error.message || "An error occurred");
      }
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("images", file);

    try {
      const result = await uploadProfileImage(formData);
      if (result.success) {
        const imageUrl = result.data; 
        if (imageUrl) {
            setPreviewImage(imageUrl);
            form.setFieldValue("profilePhoto", imageUrl);
            toast.success("Photo updated successfully");
        }
      } else {
        toast.error(result.message || "Upload failed");
      }
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 shadow-premium-subtle">
          <Edit3 className="h-4 w-4" /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information and profile picture.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 pt-4"
        >
          {/* Avatar Edit Section */}
          <div className="flex flex-col items-center gap-4 py-4 bg-muted/30 rounded-2xl border border-dashed">
            <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-primary/20 bg-background shadow-inner">
              {previewImage ? (
                <Image src={previewImage} alt="Preview" fill className="object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
              )}
            </div>
            
            <label className="relative">
              <span className="flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer px-3 py-1.5 bg-primary/10 rounded-full">
                <Upload className="h-3 w-3" /> {uploading ? "Uploading..." : "Upload New Photo"}
              </span>
              <input 
                type="file" 
                className="hidden" 
                onChange={handleImageUpload} 
                disabled={uploading}
                accept="image/*"
              />
            </label>
            <p className="text-[10px] text-muted-foreground italic">JPG, PNG or WEBP. Max 2MB.</p>
          </div>

          <div className="grid gap-4">
            <form.Field name="name">
                {(field) => <AppField field={field} label="Full Name" placeholder="Your name" />}
            </form.Field>

            <form.Field name="contactNumber">
                {(field) => (
                    <AppField 
                        field={field} 
                        label="Contact Number" 
                        placeholder="e.g. +8801700000000" 
                    />
                )}
            </form.Field>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
                {([canSubmit, isSubmitting]) => (
                    <FormSubmitBtn isPending={isSubmitting} disabled={!canSubmit || uploading}>
                        Save Changes
                    </FormSubmitBtn>
                )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileModal;
