"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SketchBox } from "@/components/sketch-box";
import { getCompIcon } from "@/lib/comp-icons";
import type { Competition } from "@/types";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function dateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDeadline(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function SketchCalendar({
  competitions,
  registrations,
}: {
  competitions: Competition[];
  registrations: Set<string>;
}) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hovered, setHovered] = useState<{
    comp: Competition;
    x: number;
    y: number;
  } | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const deadlineMap = useMemo(() => {
    const map = new Map<string, Competition[]>();
    for (const comp of competitions) {
      const d = new Date(comp.registrationDeadline);
      const key = dateKey(d.getFullYear(), d.getMonth(), d.getDate());
      const list = map.get(key) ?? [];
      list.push(comp);
      map.set(key, list);
    }
    return map;
  }, [competitions]);

  const { firstDay, daysInMonth } = useMemo(() => {
    const fd = new Date(year, month, 1).getDay();
    const dim = new Date(year, month + 1, 0).getDate();
    return { firstDay: fd, daysInMonth: dim };
  }, [year, month]);

  const cells = useMemo(() => {
    const arr: (number | null)[] = [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [firstDay, daysInMonth]);

  const monthLabel = new Date(year, month).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const selectedComps = selectedKey ? deadlineMap.get(selectedKey) ?? [] : [];

  const prevMonth = useCallback(() => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
    setSelectedKey(null);
  }, [month]);

  const nextMonth = useCallback(() => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
    setSelectedKey(null);
  }, [month]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prevMonth();
      if (e.key === "ArrowRight") nextMonth();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevMonth, nextMonth]);

  const monthDeadlines = useMemo(() => {
    let count = 0;
    deadlineMap.forEach((comps, key) => {
      const { year: y, month: m } = parseKey(key);
      if (y === year && m === month) count += comps.length;
    });
    return count;
  }, [deadlineMap, year, month]);

  return (
    <div ref={calendarRef} className="relative">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-sketch text-4xl font-bold tracking-tight sm:text-5xl">
            {monthLabel}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {monthDeadlines} registration deadline
            {monthDeadlines !== 1 ? "s" : ""} this month — click a day to explore
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevMonth}
            className="sketch-btn flex h-11 w-11 items-center justify-center"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => {
              setYear(today.getFullYear());
              setMonth(today.getMonth());
              setSelectedKey(
                dateKey(today.getFullYear(), today.getMonth(), today.getDate())
              );
            }}
            className="sketch-btn px-4 py-2 text-sm font-bold"
          >
            Today
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="sketch-btn flex h-11 w-11 items-center justify-center"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-3 text-xs">
        <span className="sketch-tag flex items-center gap-1.5 px-2.5 py-1">
          <span className="comp-icon-btn flex h-5 w-5 items-center justify-center text-[10px]">
            🏆
          </span>
          = registration deadline
        </span>
        <span className="sketch-tag px-2.5 py-1">
          ▨ = deadline day
        </span>
        <span className="sketch-tag animate-pulse px-2.5 py-1">
          wiggle = closes within 7 days
        </span>
      </div>

      <SketchBox variant="highlight" className="overflow-hidden p-3 sm:p-5">
        {/* Weekday headers */}
        <div className="surface-muted mb-2 grid grid-cols-7 gap-1 rounded-lg border-2 border-black/10 py-2 sm:gap-2">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="text-center font-sketch text-sm font-bold sm:text-base"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {cells.map((day, i) => {
            if (day === null) {
              return (
                <div
                  key={`e-${i}`}
                  className="min-h-[88px] sm:min-h-[110px]"
                />
              );
            }

            const key = dateKey(year, month, day);
            const dayComps = deadlineMap.get(key) ?? [];
            const isToday =
              today.getFullYear() === year &&
              today.getMonth() === month &&
              today.getDate() === day;
            const isSelected = selectedKey === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedKey(isSelected ? null : key)}
                className={cn(
                  "calendar-day relative flex min-h-[88px] flex-col p-1.5 text-left sm:min-h-[110px] sm:p-2",
                  dayComps.length > 0 && "has-deadline",
                  isSelected && "selected",
                  isToday && "today"
                )}
              >
                <span
                  className={cn(
                    "day-number mb-1 inline-flex h-7 w-7 items-center justify-center font-sketch text-sm font-bold sm:h-8 sm:w-8 sm:text-base",
                    !isToday && "text-ink"
                  )}
                >
                  {day}
                </span>

                <div className="flex flex-wrap gap-1">
                  {dayComps.map((comp) => {
                    const icon = getCompIcon(comp.slug, comp.organizer);
                    const urgent =
                      comp.status === "REGISTRATION_OPEN" &&
                      daysUntil(comp.registrationDeadline) <= 7 &&
                      daysUntil(comp.registrationDeadline) >= 0;

                    return (
                      <Link
                        key={comp.id}
                        href={`/calendar/${comp.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const calRect = calendarRef.current?.getBoundingClientRect();
                          if (!calRect) return;
                          setHovered({
                            comp,
                            x: rect.left - calRect.left + rect.width / 2,
                            y: rect.top - calRect.top,
                          });
                        }}
                        onMouseLeave={() => setHovered(null)}
                        className={cn(
                          "comp-icon-btn relative flex h-8 w-8 items-center justify-center text-base sm:h-9 sm:w-9 sm:text-lg",
                          urgent && "urgent",
                          registrations.has(comp.id) && "ring-2 ring-black ring-offset-1"
                        )}
                        title={`${comp.title} — register by ${formatDeadline(comp.registrationDeadline)}`}
                      >
                        {icon.emoji}
                      </Link>
                    );
                  })}
                </div>

                {dayComps.length > 3 && (
                  <span className="mt-auto text-[10px] text-muted">
                    +{dayComps.length - 3}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </SketchBox>

      {/* Hover tooltip */}
      {hovered && (
        <div
          className="sketch-tooltip animate-pop-in pointer-events-none absolute z-50 max-w-[220px] p-3"
          style={{
            left: hovered.x,
            top: hovered.y - 8,
            transform: "translate(-50%, -100%)",
          }}
        >
          <p className="font-sketch text-lg font-bold leading-tight">
            {hovered.comp.title}
          </p>
          <p className="mt-0.5 text-xs text-muted">{hovered.comp.organizer}</p>
          <p className="mt-2 border-t border-dashed border-black/20 pt-2 text-xs">
            <span className="font-bold">Register by:</span>{" "}
            {formatDeadline(hovered.comp.registrationDeadline)}
          </p>
          {daysUntil(hovered.comp.registrationDeadline) >= 0 &&
            daysUntil(hovered.comp.registrationDeadline) <= 14 && (
              <p className="mt-1 text-xs font-bold">
                {daysUntil(hovered.comp.registrationDeadline) === 0
                  ? "⚡ Closes TODAY"
                  : `⏳ ${daysUntil(hovered.comp.registrationDeadline)} days left`}
              </p>
            )}
        </div>
      )}

      {/* Selected day panel */}
      {selectedKey && (
        <SketchBox variant="default" className="mt-6 animate-fade-in p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-sketch text-2xl font-bold">
                {parseKey(selectedKey).day}{" "}
                {new Date(
                  parseKey(selectedKey).year,
                  parseKey(selectedKey).month,
                  parseKey(selectedKey).day
                ).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </h3>
              <p className="text-sm text-muted">
                {selectedComps.length === 0
                  ? "No registration deadlines on this day"
                  : `${selectedComps.length} deadline${selectedComps.length !== 1 ? "s" : ""}`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedKey(null)}
              className="sketch-btn px-3 py-1 text-xs"
            >
              ✕ close
            </button>
          </div>

          {selectedComps.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {selectedComps.map((comp) => {
                const icon = getCompIcon(comp.slug, comp.organizer);
                const days = daysUntil(comp.registrationDeadline);
                return (
                  <Link
                    key={comp.id}
                    href={`/calendar/${comp.slug}`}
                    className="sketch-box group flex items-start gap-3 p-4 transition-transform hover:-translate-y-1"
                  >
                    <span className="comp-icon-btn flex h-12 w-12 shrink-0 items-center justify-center text-2xl">
                      {icon.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-sketch text-lg font-bold leading-tight group-hover:underline">
                        {comp.title}
                      </p>
                      <p className="text-xs text-muted">{comp.organizer}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="sketch-tag px-2 py-0.5 text-[10px]">
                          {comp.domain}
                        </span>
                        {days >= 0 && days <= 7 && comp.status === "REGISTRATION_OPEN" && (
                          <span className="sketch-tag sketch-tag-active px-2 py-0.5 text-[10px]">
                            {days === 0 ? "LAST DAY" : `${days}d left`}
                          </span>
                        )}
                        {registrations.has(comp.id) && (
                          <span className="sketch-tag px-2 py-0.5 text-[10px]">
                            ✓ tracked
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-sm text-muted py-4">
              Pick another day — deadlines are marked with comp icons ↑
            </p>
          )}
        </SketchBox>
      )}

      {/* Upcoming deadlines strip */}
      <div className="mt-8">
        <h3 className="mb-3 font-sketch text-2xl font-bold">
          Coming up next ~
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {competitions
            .filter(
              (c) =>
                c.status === "REGISTRATION_OPEN" &&
                daysUntil(c.registrationDeadline) >= 0
            )
            .sort(
              (a, b) =>
                new Date(a.registrationDeadline).getTime() -
                new Date(b.registrationDeadline).getTime()
            )
            .slice(0, 8)
            .map((comp) => {
              const icon = getCompIcon(comp.slug, comp.organizer);
              const days = daysUntil(comp.registrationDeadline);
              return (
                <Link
                  key={comp.id}
                  href={`/calendar/${comp.slug}`}
                  className="sketch-box flex min-w-[140px] shrink-0 flex-col items-center p-3 text-center transition-transform hover:-translate-y-1"
                >
                  <span className="text-3xl">{icon.emoji}</span>
                  <span className="mt-1 font-sketch text-sm font-bold leading-tight">
                    {icon.short}
                  </span>
                  <span className="mt-1 text-[10px] text-muted">
                    {days === 0 ? "Today!" : `${days}d left`}
                  </span>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}