"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SketchCalendar } from "@/components/sketch-calendar";
import { SketchBox } from "@/components/sketch-box";
import { getCompIcon } from "@/lib/comp-icons";
import type { Competition } from "@/types";

function formatDeadline(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export function HomeCalendarHero({
  competitions,
  openCount,
}: {
  competitions: Competition[];
  openCount: number;
}) {
  const upcoming = [...competitions]
    .filter((c) => c.status === "REGISTRATION_OPEN" || c.status === "UPCOMING")
    .sort(
      (a, b) =>
        new Date(a.registrationDeadline).getTime() -
        new Date(b.registrationDeadline).getTime()
    )
    .slice(0, 6);

  return (
    <div className="space-y-8">
      <SketchBox variant="dark" className="p-6 sm:p-8">
        <p className="font-hand text-sm text-white/75">~ India B-school season ~</p>
        <h1 className="mt-1 font-sketch text-4xl font-bold text-white sm:text-6xl lg:text-7xl">
          never miss a case comp deadline
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-white/85 sm:text-base">
          Real corporate and campus case competitions — registration deadlines
          plotted on the calendar. Hover for a peek, click a day to drill in,
          register straight from the card.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <span className="sketch-tag px-3 py-1.5 text-sm font-bold text-black">
            {openCount} open now
          </span>
          <span className="sketch-tag-on-dark px-3 py-1.5 text-sm font-bold">
            {competitions.length} verified comps
          </span>
        </div>
      </SketchBox>

      <SketchCalendar competitions={competitions} registrations={new Set()} />

      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-sketch text-3xl font-bold">register next</h2>
            <p className="text-sm text-muted">
              Upcoming deadlines with official registration links
            </p>
          </div>
          <Link href="/calendar" className="sketch-btn px-4 py-2 text-sm font-bold">
            full calendar →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {upcoming.map((comp) => {
            const icon = getCompIcon(comp.slug, comp.organizer);
            return (
              <SketchBox key={comp.id} className="flex flex-col p-4">
                <div className="flex items-start gap-3">
                  <span className="comp-icon-btn flex h-11 w-11 shrink-0 items-center justify-center text-xl">
                    {icon.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-sketch text-lg font-bold leading-tight">
                      {comp.title}
                    </p>
                    <p className="text-sm text-muted">{comp.organizer}</p>
                    <p className="mt-1 text-xs font-bold">
                      deadline: {formatDeadline(comp.registrationDeadline)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/calendar/${comp.slug}`}
                    className="sketch-btn px-3 py-1.5 text-xs font-bold"
                  >
                    details
                  </Link>
                  {comp.registrationUrl && (
                    <a
                      href={comp.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sketch-btn sketch-btn-filled inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold"
                    >
                      register
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </SketchBox>
            );
          })}
        </div>
      </section>
    </div>
  );
}