import { LeaderboardPageClient } from "@/components/leaderboard-page-client";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { serializeLeaderboardEntry } from "@/lib/serializers";

export default async function LeaderboardPage() {
  const [user, collegeEntries, nationalEntries] = await Promise.all([
    getCurrentUser(),
    prisma.leaderboardSnapshot.findMany({
      where: { scope: "college" },
      orderBy: { rank: "asc" },
    }),
    prisma.leaderboardSnapshot.findMany({
      where: { scope: "national" },
      orderBy: { rank: "asc" },
    }),
  ]);

  const collegeRank = collegeEntries.find((e) => e.userId === user?.id)?.rank ?? 0;

  return (
    <LeaderboardPageClient
      userName={user?.name ?? ""}
      userRank={collegeRank}
      userPoints={user?.points ?? 0}
      userStreak={user?.streak ?? 0}
      collegeLeaderboard={collegeEntries.map(serializeLeaderboardEntry)}
      nationalLeaderboard={nationalEntries.map(serializeLeaderboardEntry)}
    />
  );
}