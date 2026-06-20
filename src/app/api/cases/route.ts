import { NextRequest, NextResponse } from "next/server";
import { listCases } from "@/lib/services/cases";
import type { Difficulty, Domain } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const cases = await listCases({
    search: searchParams.get("search") ?? undefined,
    domain: (searchParams.get("domain") as Domain | "ALL") ?? "ALL",
    difficulty: (searchParams.get("difficulty") as Difficulty | "ALL") ?? "ALL",
    duration: (searchParams.get("duration") as "all" | "quick" | "full") ?? "all",
  });

  return NextResponse.json({ cases, count: cases.length });
}