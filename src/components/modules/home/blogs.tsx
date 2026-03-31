"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const BLOG_POSTS = [
  {
    id: "1",
    title: "Mastering the Pitch: 5 Tactics for Urban Football",
    excerpt: "Learn how to dominate small-sided games with these pro-level positional strategies and quick-transition drills.",
    image: "/images/blog-tactics.png",
    date: "March 24, 2024",
    author: "Coach Arifin",
    category: "Tactics",
  },
  {
    id: "2",
    title: "The Rise of Smart Turfs: Wearable Tech in 2024",
    excerpt: "How IoT and wearable sensors are transforming player performance tracking on modern turf facilities.",
    image: "/images/blog-tech.png",
    date: "March 18, 2024",
    author: "Tech Lab",
    category: "Technology",
  },
  {
    id: "3",
    title: "Eco-Friendly Turf: The Future of Sustainable Play",
    excerpt: "Discover the latest innovations in recycled turf materials that provide pro-level performance with zero environmental impact.",
    image: "/images/blog-maintenance.png",
    date: "March 12, 2024",
    author: "Eco Teams",
    category: "Maintenance",
  },
];

export default function BlogsSection() {
  return (
    <section className="py-24 bg-background/50 relative overflow-hidden border-t border-border/50">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-foreground">
              Latest <span className="text-primary">Insights</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Explore the intersection of sports technology, tactical mastery, and professional turf management.
            </p>
          </div>
          <Link
            href="/blogs"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-12 px-6 font-bold uppercase italic border border-primary/20 hover:bg-primary/10 hover:text-primary transition-all group"
            )}
          >
            Read All Posts <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary text-[0.6rem] font-black text-white uppercase tracking-widest italic shadow-lg shadow-primary/20">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-primary" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-black italic uppercase leading-tight text-foreground group-hover:text-primary transition-colors mb-4 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground line-clamp-3 mb-8 text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-auto">
                  <Link
                    href={`/blogs/${post.id}`}
                    className="inline-flex items-center gap-2 text-primary font-black uppercase italic text-xs tracking-widest group/link"
                  >
                    Read Full Insight 
                    <div className="h-px w-8 bg-primary/30 group-hover/link:w-12 transition-all duration-300" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      
      {/* Stadium Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </section>
  );
}
