import React from "react";
import PageHeroSection from "@/components/shared/page-hero-section";
import { Calendar, User, Clock, ArrowLeft, Share2, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Mock data as fallback
const BLOG_POSTS = [
  {
    id: "1",
    title: "Mastering the Pitch: 5 Tactics for Urban Football",
    content: `
      Urban football is more than just a game; it's a test of reflexes, spatial awareness, and quick decision-making. In a confined pitch, every second counts. 
      
      ## 1. The High Press
      Don't let your opponents breathe. In urban settings, the pitch is small, meaning any mistake near their goal can lead to an instant score. Coordinate with your team to pressure the ball carrier early.
      
      ## 2. One-Touch Accuracy
      Transition speed is everything. Practicing your one-touch passing will allow you to bypass defenders before they can set their positions.
      
      ## 3. Positional Flexibility
      Positions are fluid on a turf pitch. A defender must be ready to join the attack, and strikers must drop back to cover. Versatility is the hallmark of a pro urban player.
    `,
    image: "/images/blog-tactics.png",
    date: "March 24, 2024",
    author: "Coach Arifin",
    category: "Tactics",
    readingTime: "5 min read",
  },
  {
    id: "2",
    title: "The Rise of Smart Turfs: Wearable Tech in 2024",
    content: `
      Technology is changing how we play. From sensors embedded in the turf to wearables on every player, the data revolution is here.
      
      ## Data-Driven Performance
      Imagine knowing exactly how much ground you covered and your peak sprint speed right after the match. Modern turfs are now equipped with IoT sensors that bridge the gap between amateur play and professional analytics.
    `,
    image: "/images/blog-tech.png",
    date: "March 18, 2024",
    author: "Tech Lab",
    category: "Technology",
    readingTime: "7 min read",
  },
  {
    id: "3",
    title: "Eco-Friendly Turf: The Future of Sustainable Play",
    content: `
      Sustainability is the new standard. The latest generation of artificial turf uses recycled materials that don't compromise on performance.
      
      ## Why It Matters
      Conventional turfs often use materials that are hard to recycle. New innovations are focusing on bio-based infills and recyclable fibers, ensuring that your game doesn't come at the cost of the planet.
    `,
    image: "/images/blog-maintenance.png",
    date: "March 12, 2024",
    author: "Eco Teams",
    category: "Maintenance",
    readingTime: "4 min read",
  },
];

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const blog = BLOG_POSTS.find((p) => p.id === params.id) || BLOG_POSTS[0];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-32">
      <PageHeroSection 
        badge={blog.category}
        title={blog.title}
        description={`Written by ${blog.author} • ${blog.date}`}
      />

      <div className="container mx-auto px-4 md:px-6 -mt-16 relative z-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button & Actions */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/blogs" className="group flex items-center gap-2 text-sm font-bold text-white/70 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              BACK TO BLOGS
            </Link>
            <div className="flex items-center gap-4">
               <button className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-primary hover:border-primary/30 transition-all">
                  <Share2 className="h-4 w-4" />
               </button>
               <button className="p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-primary hover:border-primary/30 transition-all">
                  <MessageSquare className="h-4 w-4" />
               </button>
            </div>
          </div>

          {/* Main Featured Image */}
          <div className="relative h-[250px] md:h-[500px] w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl mb-12">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Post Content */}
          <div className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-[3rem] p-8 md:p-16">
            <div className="flex items-center gap-6 mb-12 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground pb-8 border-b border-white/5">
               <div className="flex items-center gap-2">
                 <Calendar className="h-4 w-4 text-primary" />
                 <span>{blog.date}</span>
               </div>
               <div className="flex items-center gap-2">
                 <Clock className="h-4 w-4 text-primary" />
                 <span>{blog.readingTime}</span>
               </div>
               <div className="flex items-center gap-2">
                 <User className="h-4 w-4 text-primary" />
                 <span>{blog.author}</span>
               </div>
            </div>

            <article className="prose prose-invert prose-emerald max-w-none">
                <p className="text-xl text-white/80 leading-relaxed italic border-l-4 border-primary pl-6 mb-12 italic">
                    {blog.content.split('\n\n')[0]}
                </p>
                
                {blog.content.split('\n\n').slice(1).map((paragraph, i) => (
                  <div key={i} className="mb-8 text-muted-foreground text-lg leading-loose">
                    {paragraph.startsWith('##') ? (
                      <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mt-12 mb-6">
                        {paragraph.replace('##', '').trim()}
                      </h2>
                    ) : (
                      <p>{paragraph}</p>
                    )}
                  </div>
                ))}
            </article>

            {/* Newsletter or Next Step */}
            <div className="mt-20 pt-16 border-t border-white/5 flex flex-col items-center text-center">
                <h3 className="text-2xl font-black text-white uppercase italic mb-4">Want more insights?</h3>
                <p className="text-muted-foreground mb-8 max-w-sm">Join our newsletter to receive tactical breakdowns and exclusive turf offers directly in your inbox.</p>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                   <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL" 
                    className="flex-1 h-14 bg-white/5 border border-white/10 rounded-xl px-6 text-sm font-bold tracking-widest focus:outline-none focus:border-primary transition-colors text-white"
                   />
                   <Button className="h-14 px-8 bg-primary text-white font-black uppercase italic tracking-widest hover:scale-105 transition-all">
                      SUBSCRIBE
                   </Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
