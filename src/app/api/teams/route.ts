import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { serializeTeam, serializeTeamMember } from "@/lib/serializers";

export async function GET() {
  const [teams, members] = await Promise.all([
    prisma.team.findMany({
      include: { members: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.teamMember.findMany({
      include: { user: true },
      orderBy: { user: { name: "asc" } },
    }),
  ]);

  return NextResponse.json({
    teams: teams.map(serializeTeam),
    members: members.map(serializeTeamMember),
  });
}