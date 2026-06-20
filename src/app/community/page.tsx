import { MessageSquare, Plus, Star } from "lucide-react";
import { ForumPostCard } from "@/components/forum-post-card";
import { CaseCard } from "@/components/case-card";
import { prisma } from "@/lib/db";
import { serializeForumPost } from "@/lib/serializers";
import { getCaseOfTheWeek } from "@/lib/services/cases";

export default async function CommunityPage() {
  const [posts, caseOfTheWeek] = await Promise.all([
    prisma.forumPost.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" },
    }),
    getCaseOfTheWeek(),
  ]);

  const forumPosts = posts.map(serializeForumPost);
  const discussions = forumPosts.filter((p) => p.type === "discussion");
  const questions = forumPosts.filter((p) => p.type === "question");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-primary">
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm font-medium">Community Hub</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Community</h1>
          <p className="mt-2 text-muted">
            Discuss cases, ask questions, and learn from peers and professors.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-white hover:bg-primary-light"
        >
          <Plus className="h-4 w-4" />
          New Post
        </button>
      </div>

      {caseOfTheWeek && (
        <section className="mb-10 rounded-xl border border-accent/30 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 fill-accent text-accent" />
            <h2 className="text-lg font-semibold text-foreground">
              Case of the Week
            </h2>
          </div>
          <div className="max-w-md">
            <CaseCard caseStudy={caseOfTheWeek} />
          </div>
        </section>
      )}

      <div className="mb-6 flex gap-2 border-b border-border">
        {["All", "Discussions", "Questions", "Ask/Answer"].map((tab, i) => (
          <button
            key={tab}
            type="button"
            className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              i === 0
                ? "border-primary text-primary"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-lg font-semibold">Recent Posts</h2>
          {forumPosts.map((post) => (
            <ForumPostCard key={post.id} post={post} />
          ))}
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl border border-border bg-surface p-5">
            <h3 className="mb-4 font-semibold">Ask/Answer</h3>
            <div className="space-y-3">
              {questions.slice(0, 3).map((q) => (
                <div key={q.id} className="border-b border-border pb-3 last:border-0">
                  <p className="text-sm font-medium text-foreground line-clamp-2">
                    {q.title}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {q.replies} answers · {q.upvotes} upvotes
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5">
            <h3 className="mb-4 font-semibold">Hot Discussions</h3>
            <div className="space-y-3">
              {discussions
                .sort((a, b) => b.upvotes - a.upvotes)
                .slice(0, 3)
                .map((d) => (
                  <div
                    key={d.id}
                    className="border-b border-border pb-3 last:border-0"
                  >
                    <p className="text-sm font-medium text-foreground line-clamp-2">
                      {d.title}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      by {d.author} · {d.upvotes} upvotes
                    </p>
                  </div>
                ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-primary/5 p-5">
            <h3 className="mb-2 font-semibold text-primary">
              Professor&apos;s Corner
            </h3>
            <p className="text-sm text-muted">
              Tips and methodology guidance from MBA professors. Look for posts
              tagged &quot;professor-tips&quot;.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}