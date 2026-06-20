import { prisma } from "@/lib/db";
import { serializeCompetition } from "@/lib/serializers";
import type { CompetitionStatus, Domain } from "@/types";

export interface CompetitionFilters {
  status?: CompetitionStatus | "ALL";
  domain?: Domain | "ALL";
  mode?: string;
  month?: string;
  featured?: boolean;
  delhiNcr?: boolean;
  search?: string;
}

export async function listCompetitions(filters: CompetitionFilters = {}) {
  const where: Record<string, unknown> = {};

  if (filters.status && filters.status !== "ALL") {
    where.status = filters.status;
  }
  if (filters.domain && filters.domain !== "ALL") {
    where.domain = filters.domain;
  }
  if (filters.mode && filters.mode !== "ALL") {
    where.mode = filters.mode;
  }
  if (filters.featured) {
    where.isFeatured = true;
  }
  if (filters.delhiNcr) {
    where.OR = [
      { location: { contains: "Delhi" } },
      { location: { contains: "Gurgaon" } },
      { location: { contains: "NCR" } },
      { hostCollege: { contains: "Delhi" } },
      { hostCollege: { contains: "FMS" } },
      { hostCollege: { contains: "MDI" } },
      { hostCollege: { contains: "IIFT" } },
      { tags: { contains: "Delhi-NCR" } },
    ];
  }
  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search } },
      { organizer: { contains: filters.search } },
      { description: { contains: filters.search } },
    ];
  }
  if (filters.month) {
    const [year, month] = filters.month.split("-").map(Number);
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);
    where.eventDate = { gte: start, lte: end };
  }

  const competitions = await prisma.competition.findMany({
    where,
    orderBy: [{ eventDate: "asc" }, { registrationDeadline: "asc" }],
  });

  return competitions.map(serializeCompetition);
}

export async function getCompetitionBySlug(slug: string) {
  const competition = await prisma.competition.findUnique({ where: { slug } });
  return competition ? serializeCompetition(competition) : null;
}

export async function getCompetitionById(id: string) {
  const competition = await prisma.competition.findUnique({ where: { id } });
  return competition ? serializeCompetition(competition) : null;
}

export async function registerForCompetition(userId: string, competitionId: string) {
  return prisma.competitionRegistration.upsert({
    where: {
      userId_competitionId: { userId, competitionId },
    },
    create: { userId, competitionId },
    update: {},
  });
}

export async function getUserRegistrations(userId: string) {
  const regs = await prisma.competitionRegistration.findMany({
    where: { userId },
    include: { competition: true },
    orderBy: { createdAt: "desc" },
  });
  return regs.map((r) => ({
    registeredAt: r.createdAt.toISOString(),
    competition: serializeCompetition(r.competition),
  }));
}