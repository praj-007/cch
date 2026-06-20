import { NextRequest, NextResponse } from "next/server";
import { listCompetitions } from "@/lib/services/competitions";
import type { CompetitionStatus, Domain } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const competitions = await listCompetitions({
    status: (searchParams.get("status") as CompetitionStatus | "ALL") ?? "ALL",
    domain: (searchParams.get("domain") as Domain | "ALL") ?? "ALL",
    mode: searchParams.get("mode") ?? "ALL",
    month: searchParams.get("month") ?? undefined,
    featured: searchParams.get("featured") === "true",
    delhiNcr: searchParams.get("delhiNcr") === "true",
    search: searchParams.get("search") ?? undefined,
  });

  return NextResponse.json({ competitions, count: competitions.length });
}