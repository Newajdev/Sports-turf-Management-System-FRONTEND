import React from "react";
import BlogsContent from "@/components/modules/blogs/blogs-listing";
import { BlogItem } from "@/components/modules/blogs/blog-card";

async function getBlogs(): Promise<BlogItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blogs.json`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return <BlogsContent blogs={blogs} />;
}