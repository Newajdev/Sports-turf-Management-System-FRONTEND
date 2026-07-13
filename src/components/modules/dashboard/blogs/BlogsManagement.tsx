"use client";

import React, { useState, useCallback } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { PlusCircle, Loader2, BookOpen, MessageSquare, Heart, Eye } from "lucide-react";
import { deleteBlog, getMyBlogs } from "@/services/blog.services";
import BlogDialog from "./BlogDialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DataTable from "@/components/shared/table/DataTable";
import DateCell from "@/components/shared/cell/DateCell";
import Image from "next/image";
import Link from "next/link";

interface IBlog {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readingTime: string;
  createdAt: string;
  author: { id: string; name: string; image?: string };
  _count?: { comments: number; reactions: number };
}

interface BlogsManagementProps {
  userRole: "SYSTEM_ADMIN" | "TURF_OWNER";
}

export default function BlogsManagement({ userRole }: BlogsManagementProps) {
  const queryClient = useQueryClient();

  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<IBlog | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const queryString = React.useMemo(() => {
    const parts: string[] = [];
    parts.push(`page=${pagination.pageIndex + 1}`);
    parts.push(`limit=${pagination.pageSize}`);
    if (searchTerm) parts.push(`searchTerm=${encodeURIComponent(searchTerm)}`);
    if (sorting.length > 0) {
      parts.push(`sortBy=${sorting[0].id}`);
      parts.push(`sortOrder=${sorting[0].desc ? "desc" : "asc"}`);
    }
    return parts.join("&");
  }, [pagination, sorting, searchTerm]);

  const { data: blogsResponse, isLoading } = useQuery({
    queryKey: ["my-blogs", queryString, userRole],
    queryFn: () => getMyBlogs(queryString),
  });

  const blogs: IBlog[] = blogsResponse?.success ? blogsResponse.data : [];
  const meta = blogsResponse?.success ? blogsResponse.meta : undefined;

  const handleCreateNew = () => {
    setSelectedBlog(null);
    setDialogOpen(true);
  };

  const handleEdit = (blog: IBlog) => {
    setSelectedBlog(blog);
    setDialogOpen(true);
  };

  const handleDeleteClick = (blog: IBlog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!blogToDelete) return;
    setIsDeleting(true);
    try {
      const response = await deleteBlog(blogToDelete.id);
      if (response.success) {
        toast.success("Blog insight deleted successfully.");
        queryClient.invalidateQueries({ queryKey: ["my-blogs"] });
      } else {
        toast.error(response.message || "Failed to delete blog.");
      }
    } catch {
      toast.error("Failed to delete blog.");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  const handleSuccess = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["my-blogs"] });
  }, [queryClient]);

  const columns: ColumnDef<IBlog>[] = [
    {
      id: "blog",
      header: "Blog Insight",
      cell: ({ row }) => {
        const blog = row.original;
        return (
          <div className="flex items-center gap-4 max-w-xs">
            <div className="relative h-14 w-20 shrink-0 rounded-lg overflow-hidden border border-white/5">
              {blog.image ? (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary/50" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm text-foreground line-clamp-1">{blog.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{blog.excerpt}</p>
            </div>
          </div>
        );
      },
    },
    {
      id: "category",
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/10 text-primary text-[0.65rem] font-bold uppercase tracking-wider"
        >
          {row.original.category}
        </Badge>
      ),
    },
    {
      id: "readingTime",
      header: "Reading Time",
      accessorKey: "readingTime",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground font-medium">
          {row.original.readingTime}
        </span>
      ),
    },
    {
      id: "stats",
      header: "Engagement",
      cell: ({ row }) => {
        const { _count } = row.original;
        return (
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-bold">
            <span className="flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5 text-primary/70" />
              {_count?.reactions ?? 0}
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-primary/70" />
              {_count?.comments ?? 0}
            </span>
          </div>
        );
      },
    },
    {
      id: "author",
      header: "Author",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-foreground">
          {row.original.author?.name || "—"}
        </span>
      ),
    },
    {
      id: "createdAt",
      header: "Published",
      accessorKey: "createdAt",
      cell: ({ row }) => <DateCell date={row.original.createdAt} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black italic uppercase tracking-tight text-foreground">
            Blog Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create and manage blog posts for the Turfix community.
          </p>
        </div>
        <Button
          onClick={handleCreateNew}
          className="gap-2 bg-primary text-white font-bold uppercase italic tracking-wider hover:scale-105 transition-all px-6 rounded-xl"
        >
          <PlusCircle className="h-4 w-4" />
          Draft New Insight
        </Button>
      </div>

      {/* Table */}
      <DataTable<IBlog>
        data={blogs}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No blog insights found. Start drafting your first post!"
        meta={meta}
        toolbarAction={
          <Link href="/blogs" target="_blank" className="inline-flex items-center gap-2 text-xs font-bold uppercase italic tracking-wider text-muted-foreground hover:text-primary transition-colors border border-white/10 px-4 py-2 rounded-lg hover:border-primary/30">
            <Eye className="h-3.5 w-3.5" />
            View Public Blog
          </Link>
        }
        actions={{
          onEdit: handleEdit,
          onDelete: handleDeleteClick,
          getEditLabel: () => "Edit Post",
          getDeleteLabel: () => "Delete Post",
        }}
        search={{
          placeholder: "Search insights by title, excerpt...",
          onDebouncedChange: setSearchTerm,
          initialValue: searchTerm,
          debounceMs: 400,
        }}
        sorting={{
          state: sorting,
          onSortingChange: setSorting,
        }}
        pagination={{
          state: pagination,
          onPaginationChange: setPagination,
        }}
      />

      {/* Create/Edit Dialog */}
      <BlogDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        blog={selectedBlog}
        onSuccess={handleSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border border-white/10 rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black italic uppercase text-destructive">
              Delete Blog Insight?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete{" "}
              <strong className="text-foreground">&ldquo;{blogToDelete?.title}&rdquo;</strong>?
              This action is permanent. All comments and reactions will also be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel
              disabled={isDeleting}
              className="border-white/10 bg-transparent text-white hover:bg-white/5 rounded-xl font-bold uppercase italic tracking-wider text-xs"
            >
              Keep Post
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90 text-white rounded-xl font-bold uppercase italic tracking-wider text-xs gap-2 flex items-center"
            >
              {isDeleting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Deleting...</>
              ) : (
                "Yes, Delete It"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
