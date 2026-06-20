import Link from "next/link";
import {
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle,
  Flame,
  Lock,
  Target,
  Trophy,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { serializeBadge, serializeCompetition, serializeUser } from "@/lib/serializers";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  const [allBadges, collegeRank] = await Promise.all([
    prisma.badge.findMany({ orderBy: { name: "asc" } }),
    user
      ? prisma.leaderboardSnapshot.findFirst({
          where: { scope: "college", userId: user.id },
          select: { rank: true },
        })
      : Promise.resolve(null),
  ]);

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-muted">User not found. Run npm run db:seed</p>
      </div>
    );
  }

  const serializedUser = serializeUser(user, collegeRank?.rank ?? 0);
  const earnedBadgeIds = new Set(user.badges.map((b) => b.badgeId));
  const casesUntilCertified = 20 - user.casesCompleted;
  const certProgress = (user.casesCompleted / 20) * 100;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-start gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white">
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
          <p className="text-muted">
            {user.program} · {user.college}
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-primary" />
              Rank #{serializedUser.rank}
            </span>
            <span className="flex items-center gap-1">
              <Target className="h-4 w-4 text-primary" />
              {user.points.toLocaleString()} points
            </span>
            <span className="flex items-center gap-1">
              <Flame className="h-4 w-4 text-accent" />
              {user.streak} day streak
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-primary" />
              {user.casesCompleted} cases completed
            </span>
          </div>
        </div>
      </div>

      {user.competitionRegs.length > 0 && (
        <section className="mb-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 flex items-center gap-2 font-semibold">
            <CalendarDays className="h-5 w-5 text-primary" />
            Tracked Competitions
          </h2>
          <div className="space-y-3">
            {user.competitionRegs.map((reg) => {
              const comp = serializeCompetition(reg.competition);
              return (
                <Link
                  key={reg.id}
                  href={`/calendar/${comp.slug}`}
                  className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-slate-50"
                >
                  <div>
                    <p className="font-medium text-foreground">{comp.title}</p>
                    <p className="text-sm text-muted">{comp.organizer}</p>
                  </div>
                  <span className="text-xs text-muted">
                    {new Date(comp.eventDate).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="mb-8 rounded-xl border border-border bg-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-semibold">
            <Award className="h-5 w-5 text-accent" />
            Practice Certified
          </h2>
          {user.isPracticeCertified ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              <CheckCircle className="h-4 w-4" />
              Certified
            </span>
          ) : (
            <span className="text-sm text-muted">
              {casesUntilCertified} more cases to go
            </span>
          )}
        </div>
        <p className="mb-4 text-sm text-muted">
          Complete 20 cases with good peer ratings to earn your Practice
          Certified badge — a signal recruiters can trust.
        </p>
        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${Math.min(certProgress, 100)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          {user.casesCompleted}/20 cases completed ({Math.round(certProgress)}%)
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Badges</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {allBadges.map((badge) => {
            const earned = earnedBadgeIds.has(badge.id);
            const userBadge = user.badges.find((b) => b.badgeId === badge.id);
            return (
              <div
                key={badge.id}
                className={`flex items-start gap-4 rounded-xl border p-4 ${
                  earned
                    ? "border-border bg-surface"
                    : "border-dashed border-border bg-slate-50 opacity-70"
                }`}
              >
                <span className="text-2xl">{earned ? badge.icon : "🔒"}</span>
                <div>
                  <p className="font-medium text-foreground">
                    {badge.name}
                    {!earned && (
                      <Lock className="ml-1 inline h-3.5 w-3.5 text-muted" />
                    )}
                  </p>
                  <p className="text-sm text-muted">{badge.description}</p>
                  {earned && userBadge && (
                    <p className="mt-1 text-xs text-muted">
                      Earned {userBadge.earnedAt.toISOString().split("T")[0]}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface p-6">
        <h2 className="mb-4 font-semibold">Recent Activity</h2>
        <div className="space-y-3">
          {[
            {
              action: "Registered for HUL L.I.M.E. Season XIV",
              points: "—",
              date: "Today",
            },
            {
              action: "Completed GlowNest market entry case",
              points: "+150",
              date: "Yesterday",
            },
            {
              action: "Maintained 12-day practice streak",
              points: "+25",
              date: "2 days ago",
            },
          ].map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-border py-3 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {activity.action}
                </p>
                <p className="text-xs text-muted">{activity.date}</p>
              </div>
              <span className="text-sm font-semibold text-primary">
                {activity.points}
              </span>
            </div>
          ))}
        </div>
        <Link
          href="/practice"
          className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
        >
          Continue practicing →
        </Link>
      </section>
    </div>
  );
}