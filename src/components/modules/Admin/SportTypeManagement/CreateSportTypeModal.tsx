"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSportType } from "@/services/admin.services";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Upload, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const CreateSportTypeModal = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [iconFile, setIconFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const { mutate: handleCreate, isPending } = useMutation({
        mutationFn: createSportType,
        onSuccess: (res) => {
            if (res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({ queryKey: ["admin-sport-types"] });
                resetForm();
                setOpen(false);
            } else {
                toast.error(res.message);
            }
        },
        onError: (err: any) => {
            toast.error(err.message || "Failed to create sport type");
        }
    });

    const resetForm = () => {
        setTitle("");
        setIconFile(null);
        setPreviewUrl(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIconFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) {
            toast.error("Title is required");
            return;
        }
        
        const formData = new FormData();
        formData.append("title", title);
        if (iconFile) {
            formData.append("file", iconFile);
        }

        handleCreate(formData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Sport Type
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Sport Type</DialogTitle>
                        <DialogDescription>
                            Add a new category of sports that turfs can be listed under.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
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
                                        <button 
                                            type="button"
                                            onClick={() => { setIconFile(null); setPreviewUrl(null); }}
                                            className="absolute right-0 top-0 rounded-bl-lg bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ) : (
                                    <label 
                                        htmlFor="icon-upload"
                                        className="flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed hover:bg-muted/50 transition-colors"
                                    >
                                        <Upload className="h-6 w-6 text-muted-foreground" />
                                        <span className="text-[10px] text-muted-foreground mt-1">Upload</span>
                                        <input 
                                            id="icon-upload" 
                                            type="file" 
                                            className="hidden" 
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                )}
                                <div className="text-xs text-muted-foreground">
                                    <p>Upload a clean icon (SVG/PNG preferred)</p>
                                    <p>Max size: 2MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Creating..." : "Create Sport Type"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateSportTypeModal;
