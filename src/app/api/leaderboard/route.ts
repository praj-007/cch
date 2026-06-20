import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { serializeLeaderboardEntry } from "@/lib/serializers";

export async function GET(request: NextRequest) {
  const scope = request.nextUrl.searchParams.get("scope") ?? "college";

  const entries = await prisma.leaderboardSnapshot.findMany({
    where: { scope },
    orderBy: { rank: "asc" },
  });

  return NextResponse.json({
    entries: entries.map(serializeLeaderboardEntry),
    scope,
  });
}