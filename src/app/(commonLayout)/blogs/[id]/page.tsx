import React from "react";
import PageHeroSection from "@/components/shared/page-hero-section";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSingleBlog } from "@/services/blog.services";
import { getUserInfo } from "@/services/auth.services";
import BlogInteractions from "@/components/modules/blogs/blog-interactions";

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const userInfo = await getUserInfo();
  const response = await getSingleBlog(params.id);

  if (!response?.success || !response?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-background text-foreground p-6">
        <h2 className="text-3xl font-black italic uppercase text-primary mb-4">Insight Not Found</h2>
        <p className="text-muted-foreground mb-8">The blog post you are looking for does not exist or has been deleted.</p>
        <Link 
          href="/blogs" 
          className="px-6 py-3 bg-primary text-white font-bold rounded-xl uppercase italic tracking-wider hover:scale-105 transition-all"
        >
          Back to Insights
        </Link>
      </div>
    );
  }

  const blog = response.data;
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-32">
      <PageHeroSection 
        badge={blog.category}
        title={blog.title}
        description={`Written by ${blog.author?.name || "Team Turfix"} • ${formattedDate}`}
      />

      <div className="container mx-auto px-4 md:px-6 -mt-16 relative z-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button & Actions */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/blogs" className="group flex items-center gap-2 text-sm font-bold text-white/70 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              BACK TO BLOGS
            </Link>
          </div>

          {/* Main Featured Image */}
          <div className="relative h-[250px] md:h-[500px] w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl mb-12">
            <Image
              src={blog.image || "/images/blog-tactics.png"}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Post Content */}
          <div className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-[3rem] p-8 md:p-16 mb-12">
            <div className="flex items-center gap-6 mb-12 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground pb-8 border-b border-white/5">
               <div className="flex items-center gap-2">
                 <Calendar className="h-4 w-4 text-primary" />
                 <span>{formattedDate}</span>
               </div>
               <div className="flex items-center gap-2">
                 <Clock className="h-4 w-4 text-primary" />
                 <span>{blog.readingTime}</span>
               </div>
               <div className="flex items-center gap-2">
                 <User className="h-4 w-4 text-primary" />
                 <span>{blog.author?.name || "Team Turfix"}</span>
               </div>
            </div>

            <article className="prose prose-invert prose-emerald max-w-none">
                <p className="text-xl text-white/80 leading-relaxed italic border-l-4 border-primary pl-6 mb-12 italic">
                    {blog.excerpt}
                </p>
                
                {blog.content.split('\n\n').map((paragraph: string, i: number) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;
                  
                  return (
                    <div key={i} className="mb-8 text-muted-foreground text-lg leading-loose">
                      {trimmed.startsWith('##') ? (
                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mt-12 mb-6">
                          {trimmed.replace(/^##\s*/, '')}
                        </h2>
                      ) : (
                        <p>{trimmed}</p>
                      )}
                    </div>
                  );
                })}
            </article>
          </div>

          {/* Comments & Reactions Section */}
          <BlogInteractions 
            blogId={blog.id} 
            initialComments={blog.comments || []}
            initialReactionsCount={blog._count?.reactions || 0}
            initialHasReacted={blog.hasReacted}
            initialActiveReactionType={blog.activeReactionType}
            currentUser={userInfo}
          />
        </div>
      </div>
    </div>
  );
}
