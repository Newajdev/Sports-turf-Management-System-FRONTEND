/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Heart, MessageSquare, Send, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { addComment, deleteComment, toggleReaction } from "@/services/blog.services";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BlogInteractionsProps {
  blogId: string;
  initialComments: any[];
  initialReactionsCount: number;
  initialHasReacted: boolean;
  initialActiveReactionType: string | null;
  currentUser: any;
}

export default function BlogInteractions({
  blogId,
  initialComments,
  initialReactionsCount,
  initialHasReacted,
  currentUser,
}: BlogInteractionsProps) {
  const [comments, setComments] = useState<any[]>(initialComments);
  const [reactionsCount, setReactionsCount] = useState<number>(initialReactionsCount);
  const [hasReacted, setHasReacted] = useState<boolean>(initialHasReacted);
  
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  const isPlayer = currentUser?.role === "PLAYER";

  const handleReact = async () => {
    if (!currentUser) {
      toast.error("Please log in to react to insights.");
      return;
    }
    if (!isPlayer) {
      toast.error("Only players can react to blogs.");
      return;
    }
    if (isReacting) return;

    setIsReacting(true);
    try {
      const response = await toggleReaction(blogId, "LIKE");
      if (response.success) {
        setHasReacted(response.data.reacted);
        setReactionsCount((prev) => 
          response.data.reacted ? prev + 1 : Math.max(0, prev - 1)
        );
        toast.success(response.message);
      } else {
        toast.error(response.message || "Failed to toggle reaction.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsReacting(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please log in to leave a comment.");
      return;
    }
    if (!isPlayer) {
      toast.error("Only players can comment on blogs.");
      return;
    }
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await addComment(blogId, commentText.trim());
      if (response.success) {
        setComments((prev) => [response.data, ...prev]);
        setCommentText("");
        toast.success("Comment posted successfully!");
      } else {
        toast.error(response.message || "Failed to post comment.");
      }
    } catch (error) {
      toast.error("Failed to add comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (deletingCommentId) return;

    setDeletingCommentId(commentId);
    try {
      const response = await deleteComment(blogId, commentId);
      if (response.success) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
        toast.success("Comment deleted successfully.");
      } else {
        toast.error(response.message || "Failed to delete comment.");
      }
    } catch (error) {
      toast.error("Failed to delete comment.");
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className="space-y-12 w-full">
      {/* Reactions Bar */}
      <div className="flex items-center justify-between p-6 bg-card/45 border border-white/5 rounded-3xl backdrop-blur-sm shadow-xl">
        <div className="flex items-center gap-6">
          <button
            onClick={handleReact}
            disabled={isReacting}
            className={cn(
              "group flex items-center gap-3.5 px-6 py-3 rounded-full text-sm font-bold uppercase italic tracking-widest border transition-all duration-300",
              hasReacted
                ? "bg-primary/20 border-primary text-primary hover:bg-primary/30"
                : "bg-white/5 border-white/10 text-white/70 hover:border-primary/30 hover:text-primary"
            )}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-transform duration-300 group-hover:scale-125",
                hasReacted ? "fill-primary text-primary" : "text-white/70"
              )}
            />
            <span>{hasReacted ? "Reacted" : "React"}</span>
          </button>
          <span className="text-muted-foreground font-black italic text-sm tracking-wider uppercase">
            {reactionsCount} {reactionsCount === 1 ? "Reaction" : "Reactions"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground font-medium text-sm">
          <MessageSquare className="h-4 w-4 text-primary" />
          <span>{comments.length} Comments</span>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-card/30 border border-white/5 rounded-[2.5rem] p-8 md:p-12 space-y-10 shadow-2xl backdrop-blur-md">
        <h3 className="text-2xl font-black text-white uppercase italic tracking-tight pb-4 border-b border-white/5">
          Match Commentary ({comments.length})
        </h3>

        {/* Comment Input */}
        {currentUser ? (
          isPlayer ? (
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="flex gap-4 items-start">
                <Avatar className="h-10 w-10 border border-primary/20 mt-1">
                  <AvatarImage src={currentUser?.image || ""} />
                  <AvatarFallback className="bg-primary/20 text-primary font-black uppercase">
                    {currentUser?.name?.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <Textarea
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[100px] bg-white/5 border-white/10 rounded-2xl p-4 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary resize-none placeholder:text-muted-foreground text-white"
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !commentText.trim()}
                      className="px-6 py-5 bg-primary text-white hover:scale-105 font-black uppercase italic tracking-widest transition-all rounded-xl gap-2 flex items-center"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      <span>Post Comment</span>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="p-6 border border-yellow-500/20 bg-yellow-500/5 rounded-2xl text-center text-yellow-500/80 font-bold uppercase text-xs italic tracking-widest">
              Only registered players can comment on blogs.
            </div>
          )
        ) : (
          <div className="p-8 border border-white/10 bg-white/5 rounded-2xl text-center space-y-4">
            <p className="text-muted-foreground font-bold uppercase text-xs italic tracking-wider">
              Join the conversation to share your tactics.
            </p>
            <Link href="/login" className="inline-block px-6 py-2.5 bg-primary text-white font-black uppercase italic text-xs tracking-widest rounded-xl hover:scale-105 transition-all">
              Sign In to Comment
            </Link>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {comments.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground text-sm font-bold uppercase italic">
              No comments yet. Be the first to share your thoughts!
            </div>
          ) : (
            comments.map((comment) => {
              const isCommentOwner = comment.player?.userId === currentUser?.id;
              const isBlogAuthor = false; // Resolved backend side permission
              const isAdmin = currentUser?.role === "SYSTEM_ADMIN";
              const canDelete = isCommentOwner || isAdmin;

              const dateStr = new Date(comment.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              return (
                <div
                  key={comment.id}
                  className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300"
                >
                  <Avatar className="h-10 w-10 border border-primary/20 shrink-0">
                    <AvatarImage src={comment.player?.profilePhoto || ""} />
                    <AvatarFallback className="bg-primary/20 text-primary font-black uppercase">
                      {comment.player?.name?.substring(0, 2) || "PL"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black italic uppercase text-sm tracking-wide text-white">
                          {comment.player?.name || "Player"}
                        </span>
                        <span className="text-[0.65rem] font-bold text-muted-foreground uppercase tracking-widest ml-3">
                          {dateStr}
                        </span>
                      </div>

                      {canDelete && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          disabled={deletingCommentId === comment.id}
                          className="text-muted-foreground hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-500/10 shrink-0"
                          title="Delete Comment"
                        >
                          {deletingCommentId === comment.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-red-500" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
