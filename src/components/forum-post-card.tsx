import { MessageCircle, ThumbsUp } from "lucide-react";
import type { ForumPost } from "@/types";
import { cn } from "@/lib/utils";

const typeStyles = {
  discussion: "bg-blue-50 text-blue-700",
  question: "bg-purple-50 text-purple-700",
  answer: "bg-emerald-50 text-emerald-700",
};

export function ForumPostCard({ post }: { post: ForumPost }) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5 transition-shadow hover:shadow-sm">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
            typeStyles[post.type]
          )}
        >
          {post.type}
        </span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-slate-100 px-2 py-0.5 text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="mb-1 font-semibold text-foreground">{post.title}</h3>
      <p className="mb-3 line-clamp-2 text-sm text-slate-600">{post.content}</p>
      <div className="flex items-center justify-between text-sm">
        <div>
          <span className="font-medium text-foreground">{post.author}</span>
          <span className="text-muted"> · {post.college}</span>
        </div>
        <div className="flex items-center gap-4 text-muted">
          <span className="flex items-center gap-1">
            <ThumbsUp className="h-3.5 w-3.5" />
            {post.upvotes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            {post.replies}
          </span>
        </div>
      </div>
    </article>
  );
}