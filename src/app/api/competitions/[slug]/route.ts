import { NextRequest, NextResponse } from "next/server";
import {
  getCompetitionBySlug,
  registerForCompetition,
} from "@/lib/services/competitions";
import { getCurrentUserId } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const competition = await getCompetitionBySlug(slug);

  if (!competition) {
    return NextResponse.json({ error: "Competition not found" }, { status: 404 });
  }

  return NextResponse.json({ competition });
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const competition = await getCompetitionBySlug(slug);

  if (!competition) {
    return NextResponse.json({ error: "Competition not found" }, { status: 404 });
  }

  const userId = await getCurrentUserId();
  await registerForCompetition(userId, competition.id);

  return NextResponse.json({ success: true, competitionId: competition.id });
}