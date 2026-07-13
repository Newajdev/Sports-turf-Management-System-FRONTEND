"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";
import { createBlog, updateBlog } from "@/services/blog.services";
import Image from "next/image";

interface BlogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blog?: any;
  onSuccess: () => void;
}

const CATEGORIES = [
  "Tactics",
  "Technology",
  "Maintenance",
  "Nutrition",
  "Events",
  "News",
];

export default function BlogDialog({
  open,
  onOpenChange,
  blog,
  onSuccess,
}: BlogDialogProps) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [readingTime, setReadingTime] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setExcerpt(blog.excerpt || "");
      setContent(blog.content || "");
      setCategory(blog.category || CATEGORIES[0]);
      setReadingTime(blog.readingTime || "");
      setPreviewUrl(blog.image || "");
      setImageFile(null);
    } else {
      setTitle("");
      setExcerpt("");
      setContent("");
      setCategory(CATEGORIES[0]);
      setReadingTime("");
      setPreviewUrl("");
      setImageFile(null);
    }
  }, [blog, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !excerpt.trim() || !content.trim() || !category || !readingTime.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!blog && !imageFile) {
      toast.error("Please upload a featured image.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Pack rest of fields as a JSON string inside 'data' key for middleware
      const payload = {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        category,
        readingTime: readingTime.trim(),
      };
      formData.append("data", JSON.stringify(payload));

      let response;
      if (blog) {
        response = await updateBlog(blog.id, formData);
      } else {
        response = await createBlog(formData);
      }

      if (response.success) {
        toast.success(blog ? "Blog updated successfully!" : "Blog created successfully!");
        onSuccess();
        onOpenChange(false);
      } else {
        toast.error(response.message || "Failed to save blog insight.");
      }
    } catch (error) {
      toast.error("An error occurred while saving the blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border border-white/10 text-white rounded-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black italic uppercase text-primary">
            {blog ? "Edit Insight Post" : "Draft New Insight"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Share training strategies, turf guides, or tech updates with the player community.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Mastering the Pitch: 5 Tactics for Urban Football"
              className="bg-white/5 border-white/10 rounded-xl h-12 text-white placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Category</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl h-12 px-3 text-sm text-white focus:outline-none focus:border-primary transition-all font-semibold"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#121212] text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="readingTime" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Reading Time</Label>
              <Input
                id="readingTime"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                placeholder="e.g., 5 min read"
                className="bg-white/5 border-white/10 rounded-xl h-12 text-white placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Excerpt (Short Summary)</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Provide a quick summary of the article..."
              className="bg-white/5 border-white/10 rounded-xl min-h-[80px] p-4 text-white placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Content (Supports markdown h2 headers via ##)</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the full post here..."
              className="bg-white/5 border-white/10 rounded-xl min-h-[220px] p-4 text-white placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Featured Cover Image</Label>
            {previewUrl ? (
              <div className="relative h-48 w-full border border-white/10 rounded-2xl overflow-hidden group">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 p-1.5 bg-black/60 rounded-full text-white/80 hover:text-white hover:bg-black/80 transition-all border border-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-48 w-full border-2 border-dashed border-white/10 hover:border-primary/50 rounded-2xl cursor-pointer bg-white/5 transition-all">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload className="h-8 w-8 text-primary" />
                  <span className="text-sm font-bold uppercase italic tracking-wider text-white">Upload cover image</span>
                  <span className="text-[10px] uppercase">PNG, JPG or WEBP up to 5MB</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/5">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="px-6 border border-white/10 text-white/80 hover:text-white rounded-xl uppercase italic font-black tracking-widest text-xs h-12"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 bg-primary text-white hover:scale-105 transition-all rounded-xl uppercase italic font-black tracking-widest text-xs h-12 gap-2 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Publish Insight</span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
