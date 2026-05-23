import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readingTime: string;
}

export default function BlogCard({ blog }: { blog: BlogItem }) {
  return (
    <article
      className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 flex flex-col h-full hover:shadow-[0_20px_50px_rgba(34,197,94,0.1)]"
    >
      {/* Image Container */}
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-[0.6rem] font-black text-primary uppercase tracking-widest italic">
            {blog.category}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-[0.6rem] font-bold text-white/80 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Clock className="h-3 w-3 text-primary" />
          <span>{blog.readingTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-4 text-[0.65rem] font-bold text-muted-foreground uppercase tracking-widest mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary/70" />
            <span>{blog.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-primary/70" />
            <span>{blog.author}</span>
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-black italic uppercase leading-tight text-foreground group-hover:text-primary transition-colors mb-4 line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-muted-foreground line-clamp-3 mb-8 text-sm leading-relaxed">
          {blog.excerpt}
        </p>

        <div className="mt-auto">
          <Link
            href={`/blogs/${blog.id}`}
            className="group/link inline-flex items-center gap-3 text-xs font-black uppercase italic tracking-widest text-primary"
          >
            Read Full Insight 
            <div className="relative h-px w-10 bg-primary/20 overflow-hidden">
              <div className="absolute inset-0 bg-primary translate-x-[-100%] group-hover/link:translate-x-0 transition-transform duration-500" />
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
