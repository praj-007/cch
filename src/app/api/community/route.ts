import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { serializeForumPost } from "@/lib/serializers";
import { getCaseOfTheWeek } from "@/lib/services/cases";

export async function GET() {
  const [posts, caseOfTheWeek] = await Promise.all([
    prisma.forumPost.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" },
    }),
    getCaseOfTheWeek(),
  ]);

  return NextResponse.json({
    posts: posts.map(serializeForumPost),
    caseOfTheWeek,
  });
}