"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { revalidatePath } from "next/cache";

export async function getAllBlogs(queryString: string = "") {
  try {
    const response = await httpClient.get<any>(`/blogs?${queryString}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching blogs.",
      data: [],
      meta: undefined,
    };
  }
}

export async function getSingleBlog(id: string) {
  try {
    const response = await httpClient.get<any>(`/blogs/${id}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching blog details:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching blog details.",
      data: null,
    };
  }
}

export async function getMyBlogs(queryString: string = "") {
  try {
    const response = await httpClient.get<any>(`/blogs/my-blogs/all?${queryString}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching my blogs:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fetching your blogs.",
      data: [],
      meta: undefined,
    };
  }
}

export async function createBlog(formData: FormData) {
  try {
    const response = await httpClient.post<any>("/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    revalidatePath("/blogs");
    revalidatePath("/admin/dashboard/blogs-management");
    revalidatePath("/turf-owner/dashboard/blogs-management");
    return response;
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || "An error occurred while creating blog.",
      data: null,
    };
  }
}

export async function updateBlog(id: string, formData: FormData) {
  try {
    const response = await httpClient.patch<any>(`/blogs/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${id}`);
    revalidatePath("/admin/dashboard/blogs-management");
    revalidatePath("/turf-owner/dashboard/blogs-management");
    return response;
  } catch (error: any) {
    console.error("Error updating blog:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || "An error occurred while updating blog.",
      data: null,
    };
  }
}

export async function deleteBlog(id: string) {
  try {
    const response = await httpClient.delete<any>(`/blogs/${id}`);
    revalidatePath("/blogs");
    revalidatePath("/admin/dashboard/blogs-management");
    revalidatePath("/turf-owner/dashboard/blogs-management");
    return response;
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || "An error occurred while deleting blog.",
      data: null,
    };
  }
}

export async function addComment(blogId: string, comment: string) {
  try {
    const response = await httpClient.post<any>(`/blogs/${blogId}/comments`, { comment });
    revalidatePath(`/blogs/${blogId}`);
    return response;
  } catch (error: any) {
    console.error("Error adding comment:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to add comment.",
      data: null,
    };
  }
}

export async function deleteComment(blogId: string, commentId: string) {
  try {
    const response = await httpClient.delete<any>(`/blogs/comments/${commentId}`);
    revalidatePath(`/blogs/${blogId}`);
    return response;
  } catch (error: any) {
    console.error("Error deleting comment:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to delete comment.",
      data: null,
    };
  }
}

export async function toggleReaction(blogId: string, type: string = "LIKE") {
  try {
    const response = await httpClient.post<any>(`/blogs/${blogId}/react`, { type });
    revalidatePath(`/blogs/${blogId}`);
    return response;
  } catch (error: any) {
    console.error("Error toggling reaction:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to toggle reaction.",
      data: null,
    };
  }
}
