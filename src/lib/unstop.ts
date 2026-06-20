import type { CompetitionStatus } from "@/types";

export type UnstopCompetition = {
  id: number;
  title: string;
  organization_id?: number;
  start_date?: string;
  end_date?: string;
  public_url?: string;
  details?: string;
  overall_prizes?: string;
  regn_open?: number;
  region?: string;
  type?: string;
};

type UnstopResponse = {
  data?: {
    competition?: UnstopCompetition;
  };
};

export async function fetchUnstopCompetition(
  unstopId: number
): Promise<UnstopCompetition | null> {
  const res = await fetch(
    `https://unstop.com/api/public/competition/${unstopId}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  const json = (await res.json()) as UnstopResponse;
  return json.data?.competition ?? null;
}

export function parseUnstopDate(value?: string): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function stripHtml(html?: string): string {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function buildUnstopUrl(publicUrl?: string): string | null {
  if (!publicUrl) return null;
  return `https://unstop.com/${publicUrl.replace(/^\//, "")}`;
}

export function deriveCompetitionStatus(
  registrationOpens: Date,
  registrationDeadline: Date,
  eventDate: Date,
  now = new Date()
): CompetitionStatus {
  if (now > eventDate) return "COMPLETED";
  if (now > registrationDeadline) return "CLOSED";
  if (now >= registrationOpens) return "REGISTRATION_OPEN";
  return "UPCOMING";
}

export function inferCompetitionMode(
  region?: string,
  location?: string | null
): "ONLINE" | "OFFLINE" | "HYBRID" {
  const value = `${region ?? ""} ${location ?? ""}`.toLowerCase();
  if (value.includes("online") && !value.match(/mumbai|delhi|bangalore|hyderabad|pune|kolkata|gurgaon|ahmedabad|campus|offline/)) {
    return "ONLINE";
  }
  if (value.includes("online") || value.includes("hybrid") || value.includes("virtual")) {
    return "HYBRID";
  }
  return "OFFLINE";
}