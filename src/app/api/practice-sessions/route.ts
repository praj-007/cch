import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { caseId, mode, arenaType, solution, selfRating, aiScore } = body;

  if (!caseId || !mode || !arenaType) {
    return NextResponse.json(
      { error: "caseId, mode, and arenaType are required" },
      { status: 400 }
    );
  }

  const userId = await getCurrentUserId();

  const session = await prisma.practiceSession.create({
    data: {
      userId,
      caseId,
      mode,
      arenaType,
      solution: solution ?? null,
      selfRating: selfRating ?? null,
      aiScore: aiScore ?? null,
      completedAt: new Date(),
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      casesCompleted: { increment: 1 },
      points: { increment: 150 },
    },
  });

  return NextResponse.json({ session }, { status: 201 });
}