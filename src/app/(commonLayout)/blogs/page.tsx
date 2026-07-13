/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import BlogsContent from "@/components/modules/blogs/blogs-listing";
import { BlogItem } from "@/components/modules/blogs/blog-card";
import { getAllBlogs } from "@/services/blog.services";


const mapApiBlogToBlogItem = (apiBlog: any): BlogItem => {
  return {
    id: apiBlog.id,
    title: apiBlog.title,
    excerpt: apiBlog.excerpt,
    image: apiBlog.image || "/images/blog-tactics.png",
    date: new Date(apiBlog.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    author: apiBlog.author?.name || "Author",
    category: apiBlog.category,
    readingTime: apiBlog.readingTime,
  };
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string };
}) {
  const queryParts = [];
  if (searchParams.search) {
    queryParts.push(`searchTerm=${encodeURIComponent(searchParams.search)}`);
  }
  if (searchParams.category && searchParams.category !== "all") {
    queryParts.push(`category=${encodeURIComponent(searchParams.category)}`);
  }
  
  const queryString = queryParts.join("&");
  const response = await getAllBlogs(queryString);
  const blogsData = response?.success ? response.data : [];
  
  const blogs = blogsData.map(mapApiBlogToBlogItem);

  return <BlogsContent blogs={blogs} />;
}
