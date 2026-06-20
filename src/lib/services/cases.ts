import { prisma } from "@/lib/db";
import { serializeCase } from "@/lib/serializers";
import type { Difficulty, Domain } from "@/types";

export interface CaseFilters {
  search?: string;
  domain?: Domain | "ALL";
  difficulty?: Difficulty | "ALL";
  duration?: "all" | "quick" | "full";
}

export async function listCases(filters: CaseFilters = {}) {
  const where: Record<string, unknown> = {};

  if (filters.domain && filters.domain !== "ALL") {
    where.domain = filters.domain;
  }
  if (filters.difficulty && filters.difficulty !== "ALL") {
    where.difficulty = filters.difficulty;
  }
  if (filters.duration === "quick") {
    where.duration = { lte: 45 };
  } else if (filters.duration === "full") {
    where.duration = { gte: 90 };
  }
  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search } },
      { company: { contains: filters.search } },
      { tags: { contains: filters.search } },
    ];
  }

  const cases = await prisma.caseStudy.findMany({
    where,
    orderBy: [{ isCaseOfTheWeek: "desc" }, { title: "asc" }],
  });

  return cases.map(serializeCase);
}

export async function getCaseById(id: string) {
  const caseStudy = await prisma.caseStudy.findUnique({ where: { id } });
  return caseStudy ? serializeCase(caseStudy) : null;
}

export async function getCaseOfTheWeek() {
  const caseStudy = await prisma.caseStudy.findFirst({
    where: { isCaseOfTheWeek: true },
  });
  return caseStudy ? serializeCase(caseStudy) : null;
}