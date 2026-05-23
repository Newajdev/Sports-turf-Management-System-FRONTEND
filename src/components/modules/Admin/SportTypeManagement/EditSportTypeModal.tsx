/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSportType } from "@/services/admin.services";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { ISportType } from "./sportTypeColumns";

interface EditSportTypeModalProps {
  sportType: ISportType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditSportTypeModal = ({
  sportType,
  open,
  onOpenChange,
}: EditSportTypeModalProps) => {
  const [title, setTitle] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (sportType && open) {
      setTitle(sportType.title);
      setIconFile(null);
      setPreviewUrl(sportType.icon ?? null);
    }
  }, [sportType, open]);

  const { mutate: handleUpdate, isPending } = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateSportType(id, formData),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["admin-sport-types"] });
        onOpenChange(false);
      } else {
        toast.error(res.message);
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update sport type");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearIconSelection = () => {
    setIconFile(null);
    setPreviewUrl(sportType?.icon ?? null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!sportType) return;

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    if (iconFile) {
      formData.append("file", iconFile);
    }

    handleUpdate({ id: sportType.id, formData });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25 p-6">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Sport Type</DialogTitle>
            <DialogDescription>
              Update the sport type title or icon.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Football, Cricket..."
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Icon</Label>
              <div className="flex items-center gap-4">
                {previewUrl ? (
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg border bg-muted p-2">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />
                    {iconFile && (
                      <button
                        type="button"
                        onClick={clearIconSelection}
                        className="absolute right-0 top-0 rounded-bl-lg bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ) : (
                  <label
                    htmlFor="edit-icon-upload"
                    className="flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed hover:bg-muted/50 transition-colors"
                  >
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground mt-1">
                      Upload
                    </span>
                    <input
                      id="edit-icon-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                )}

                {previewUrl && !iconFile && (
                  <label
                    htmlFor="edit-icon-replace"
                    className="text-xs text-muted-foreground"
                  >
                    <span className="text-primary cursor-pointer underline">
                      Replace icon
                    </span>
                    <input
                      id="edit-icon-replace"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                )}

                <div className="text-xs text-muted-foreground">
                  <p>Upload a clean icon (SVG/PNG preferred)</p>
                  <p>Leave unchanged to keep the current icon</p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending} className="py-5">
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSportTypeModal;
