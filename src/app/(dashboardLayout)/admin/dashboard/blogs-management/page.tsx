import BlogsManagement from "@/components/modules/dashboard/blogs/BlogsManagement";

export default function AdminBlogsManagementPage() {
  return <BlogsManagement userRole="SYSTEM_ADMIN" />;
}
