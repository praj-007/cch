import type { CompetitionSource } from "./competition-sources";
import { competitionSources } from "./competition-sources";
import {
  buildUnstopUrl,
  deriveCompetitionStatus,
  fetchUnstopCompetition,
  inferCompetitionMode,
  parseUnstopDate,
  stripHtml,
} from "../src/lib/unstop";

export type BuiltCompetition = {
  slug: string;
  title: string;
  organizer: string;
  description: string;
  domain: string;
  format: string;
  registrationOpensAt: Date;
  registrationDeadline: Date;
  preliminaryDate: Date | null;
  eventDate: Date;
  location: string;
  mode: string;
  teamSizeMin: number;
  teamSizeMax: number;
  prizePool: string | null;
  registrationUrl: string | null;
  eligibility: string | null;
  status: string;
  isFeatured: boolean;
  tags: string[];
  hostCollege: string | null;
  unstopId: number;
};

function firstParagraph(text: string, fallback: string): string {
  const paragraph = text.split("\n").map((line) => line.trim()).find(Boolean);
  return paragraph && paragraph.length > 40 ? paragraph : fallback;
}

function buildRecord(
  source: CompetitionSource,
  remote: NonNullable<Awaited<ReturnType<typeof fetchUnstopCompetition>>>
): BuiltCompetition {
  const registrationOpensAt =
    parseUnstopDate(remote.start_date) ?? new Date();
  const registrationDeadline =
    parseUnstopDate(remote.end_date) ?? registrationOpensAt;
  const eventDate =
    parseUnstopDate(source.eventDate) ??
    new Date(registrationDeadline.getTime() + 21 * 24 * 60 * 60 * 1000);
  const preliminaryDate = source.preliminaryDate
    ? parseUnstopDate(source.preliminaryDate)
    : null;

  const plainDetails = stripHtml(remote.details);
  const description = firstParagraph(
    plainDetails,
    `${remote.title} — official dates synced from Unstop.`
  );

  const status = deriveCompetitionStatus(
    registrationOpensAt,
    registrationDeadline,
    eventDate
  );

  return {
    slug: source.slug,
    unstopId: source.unstopId,
    title: remote.title?.trim() || source.slug,
    organizer: source.organizer,
    description,
    domain: source.domain,
    format: source.format,
    registrationOpensAt,
    registrationDeadline,
    preliminaryDate,
    eventDate,
    location: source.location,
    mode:
      source.mode ??
      inferCompetitionMode(remote.region, source.location),
    teamSizeMin: source.teamSizeMin ?? 2,
    teamSizeMax: source.teamSizeMax ?? 4,
    prizePool: remote.overall_prizes?.trim() || null,
    registrationUrl: buildUnstopUrl(remote.public_url),
    eligibility: source.eligibility ?? null,
    status,
    isFeatured: source.isFeatured ?? false,
    tags: source.tags,
    hostCollege: source.hostCollege ?? null,
  };
}

export async function buildCompetitionsFromUnstop(): Promise<BuiltCompetition[]> {
  const built: BuiltCompetition[] = [];

  for (const source of competitionSources) {
    const remote = await fetchUnstopCompetition(source.unstopId);
    if (!remote?.title) {
      console.warn(
        `Skipping ${source.slug}: Unstop listing ${source.unstopId} unavailable`
      );
      continue;
    }
    built.push(buildRecord(source, remote));
  }

  if (built.length === 0) {
    throw new Error("No competitions could be synced from Unstop");
  }

  return built.sort(
    (a, b) =>
      a.registrationDeadline.getTime() - b.registrationDeadline.getTime()
  );
}

export async function buildCompetitionsForSeed() {
  return buildCompetitionsFromUnstop();
}