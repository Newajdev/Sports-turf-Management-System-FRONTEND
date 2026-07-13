import React from "react";
import BlogCard, { BlogItem } from "@/components/modules/blogs/blog-card";
import { cn } from "@/lib/utils";
import PrimaryButton from "@/components/shared/primaryButton";
import PageHeroSection from "@/components/shared/page-hero-section";

interface BlogsContentProps {
  blogs: BlogItem[];
}

export default function BlogsContent({ blogs }: BlogsContentProps) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* Blog Hero Section */}
      <PageHeroSection
        badge="Knowledge Hub"
        title="Inside The Pitch"
        description="Elite tactical insights, sports technology breakthroughs, and professional turf management guides."
      />

      {/* Blog Grid Content */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(var(--primary) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          {blogs.length === 0 ? (
            <div className="text-center py-20 space-y-6">
              <h2 className="text-2xl font-black text-foreground italic uppercase">
                No insights found yet
              </h2>
              <p className="text-muted-foreground">
                The coaching team is currently drafting new strategies. Check
                back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}

          {/* Load More Section (Placeholder) */}
          <div className="mt-20 flex flex-col items-center gap-8 pt-12">
            <p className="text-muted-foreground font-medium uppercase italic text-xs tracking-widest">
              Viewing {blogs.length} of {blogs.length} Insights
            </p>
            <div className="flex items-center gap-4">
              <button
                className={cn(
                  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
                  "h-14 px-10 font-black uppercase italic tracking-widest border-primary/20 opacity-50 cursor-not-allowed",
                )}
              >
                End of Season
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white mb-20 md:mb-0">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8 p-12 rounded-[3rem] bg-primary border border-primary/20 relative overflow-hidden">
           

            <h2 className="text-3xl md:text-4xl font-black uppercase italic text-white tracking-tighter">
              Stay in the <span className="text-white italic">Game</span>
            </h2>
            <p className="text-white/80 max-w-lg mx-auto text-lg leading-relaxed">
              Join 5,000+ athletes and facility owners for weekly tactical
              breakdowns and platform updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">

              <PrimaryButton
                href="/login"
                type="submit"
                className="w-full p-6 bg-white text-black rounded-full shadow-lg shadow-primary/20"
              >
                Join Now
              </PrimaryButton>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
