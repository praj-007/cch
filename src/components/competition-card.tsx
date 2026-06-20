import Link from "next/link";
import { Calendar, ExternalLink, MapPin, Users } from "lucide-react";
import { SketchBox } from "@/components/sketch-box";
import { getCompIcon } from "@/lib/comp-icons";
import type { Competition } from "@/types";
import { cn } from "@/lib/utils";

const statusLabels = {
  REGISTRATION_OPEN: "Open",
  UPCOMING: "Soon",
  CLOSED: "Closed",
  COMPLETED: "Done",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function CompetitionCard({
  competition,
  isRegistered,
  compact,
}: {
  competition: Competition;
  isRegistered?: boolean;
  compact?: boolean;
}) {
  const icon = getCompIcon(competition.slug, competition.organizer);

  return (
    <SketchBox
      as="article"
      variant={competition.isFeatured ? "highlight" : "default"}
      className="flex flex-col p-5 transition-transform hover:-translate-y-1"
    >
      <div className="mb-3 flex items-start gap-3">
        <span className="comp-icon-btn flex h-12 w-12 shrink-0 items-center justify-center text-2xl">
          {icon.emoji}
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                "sketch-tag px-2 py-0.5 text-xs font-bold",
                competition.status === "REGISTRATION_OPEN"
                  ? "sketch-tag-active"
                  : ""
              )}
            >
              {statusLabels[competition.status]}
            </span>
            {competition.isFeatured && (
              <span className="sketch-tag px-2 py-0.5 text-xs font-bold">
                ★ featured
              </span>
            )}
            {isRegistered && (
              <span className="sketch-tag px-2 py-0.5 text-xs font-bold">
                ✓ tracked
              </span>
            )}
          </div>
          <h3 className="mt-2 font-sketch text-xl font-bold leading-tight">
            <Link
              href={`/calendar/${competition.slug}`}
              className="hover:underline"
            >
              {competition.title}
            </Link>
          </h3>
          <p className="text-sm text-muted">{competition.organizer}</p>
        </div>
        <span className="sketch-tag px-2 py-0.5 text-[10px] font-bold">
          {competition.domain}
        </span>
      </div>

      {!compact && (
        <p className="mb-4 line-clamp-2 flex-1 text-sm">{competition.description}</p>
      )}

      <div className="space-y-1.5 border-t-2 border-dashed border-black/15 pt-3 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0" strokeWidth={2.5} />
          <span>
            <strong>Deadline:</strong> {formatDate(competition.registrationDeadline)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted">
          <Calendar className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span>Event: {formatDate(competition.eventDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-muted">
          <MapPin className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span>
            {competition.location} · {competition.mode}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted">
          <Users className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span>
            Team {competition.teamSizeMin}–{competition.teamSizeMax}
          </span>
        </div>
      </div>

      {competition.prizePool && !compact && (
        <p className="mt-3 font-sketch text-base font-bold">
          {competition.prizePool}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/calendar/${competition.slug}`}
          className="sketch-btn sketch-btn-filled px-4 py-2 text-sm font-bold"
        >
          details →
        </Link>
        {competition.registrationUrl &&
          competition.status === "REGISTRATION_OPEN" && (
            <a
              href={competition.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-btn inline-flex items-center gap-1 px-4 py-2 text-sm font-bold"
            >
              official site
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
      </div>
    </SketchBox>
  );
}