import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/button-variants";
import BlogCard, { BlogItem } from "@/components/modules/blogs/blog-card";

const BLOG_POSTS: BlogItem[] = [
  {
    id: "1",
    title: "Mastering the Pitch: 5 Tactics for Urban Football",
    excerpt: "Learn how to dominate small-sided games with these pro-level positional strategies and quick-transition drills.",
    image: "/images/blog-tactics.png",
    date: "March 24, 2024",
    author: "Coach Arifin",
    category: "Tactics",
    readingTime: "5 min read",
  },
  {
    id: "2",
    title: "The Rise of Smart Turfs: Wearable Tech in 2024",
    excerpt: "How IoT and wearable sensors are transforming player performance tracking on modern turf facilities.",
    image: "/images/blog-tech.png",
    date: "March 18, 2024",
    author: "Tech Lab",
    category: "Technology",
    readingTime: "7 min read",
  },
  {
    id: "3",
    title: "Eco-Friendly Turf: The Future of Sustainable Play",
    excerpt: "Discover the latest innovations in recycled turf materials that provide pro-level performance with zero environmental impact.",
    image: "/images/blog-maintenance.png",
    date: "March 12, 2024",
    author: "Eco Teams",
    category: "Maintenance",
    readingTime: "4 min read",
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
            <BlogCard key={post.id} blog={post} />
          ))}
        </div>
      </div>
      
      {/* Stadium Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </section>
  );
}
