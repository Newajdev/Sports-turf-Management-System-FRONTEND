/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ApiResponse } from "@/types/api.type";
import { IBlog } from "@/interface/blog.interface";
import { httpClient } from "@/lib/axios/httpClient";
import { revalidatePath } from "next/cache";

export async function getAllBlogs(
  queryString: string = "",
): Promise<ApiResponse<IBlog[]>> {
  try {
    const response = await httpClient.get<IBlog[]>(`/blogs?${queryString}`);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while fetching blogs.",
      data: [],
      meta: undefined,
    };
  }
}

export async function getSingleBlog(
  id: string,
): Promise<ApiResponse<IBlog | null>> {
  try {
    const response = await httpClient.get<IBlog>(`/blogs/${id}`);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching blog details.",
      data: null,
    };
  }
}

export async function getMyBlogs(
  queryString: string = "",
): Promise<ApiResponse<IBlog[]>> {
  try {
    const response = await httpClient.get<IBlog[]>(
      `/blogs/my-blogs/all?${queryString}`,
    );
    return response;
  } catch (error: any) {
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
    const response = await httpClient.post("/blogs", formData);
    revalidatePath("/blogs");
    revalidatePath("/admin/dashboard/blogs-management");
    revalidatePath("/turf-owner/dashboard/blogs-management");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "An error occurred while creating blog.",
      data: null,
    };
  }
}

export async function updateBlog(id: string, formData: FormData) {
  try {
    const response = await httpClient.patch<any>(`/blogs/${id}`, formData);
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${id}`);
    revalidatePath("/admin/dashboard/blogs-management");
    revalidatePath("/turf-owner/dashboard/blogs-management");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "An error occurred while updating blog.",
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
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "An error occurred while deleting blog.",
      data: null,
    };
  }
}

export async function addComment(blogId: string, comment: string) {
  try {
    const response = await httpClient.post<any>(`/blogs/${blogId}/comments`, {
      comment,
    });
    revalidatePath(`/blogs/${blogId}`);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to add comment.",
      data: null,
    };
  }
}

export async function deleteComment(blogId: string, commentId: string) {
  try {
    const response = await httpClient.delete<any>(
      `/blogs/comments/${commentId}`,
    );
    revalidatePath(`/blogs/${blogId}`);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to delete comment.",
      data: null,
    };
  }
}

export async function toggleReaction(blogId: string, type: string = "LIKE") {
  try {
    const response = await httpClient.post<any>(`/blogs/${blogId}/react`, {
      type,
    });
    revalidatePath(`/blogs/${blogId}`);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to toggle reaction.",
      data: null,
    };
  }
}
