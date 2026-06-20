import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { serializeBadge, serializeUser } from "@/lib/serializers";
import { getUserRegistrations } from "@/lib/services/competitions";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const collegeRank = await prisma.leaderboardSnapshot.findFirst({
    where: { scope: "college", userId: user.id },
    select: { rank: true },
  });

  const allBadges = await prisma.badge.findMany({ orderBy: { name: "asc" } });
  const registrations = await getUserRegistrations(user.id);

  return NextResponse.json({
    user: serializeUser(user, collegeRank?.rank ?? 0),
    allBadges: allBadges.map(serializeBadge),
    registrations,
  });
}