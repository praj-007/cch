import { NextRequest, NextResponse } from "next/server";
import { getCaseById } from "@/lib/services/cases";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const caseStudy = await getCaseById(id);

  if (!caseStudy) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 });
  }

  return NextResponse.json({ case: caseStudy });
}