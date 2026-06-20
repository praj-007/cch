"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SketchCalendar } from "@/components/sketch-calendar";
import { CalendarFilters } from "@/components/calendar-filters";
import { CompetitionCard } from "@/components/competition-card";
import { SketchBox } from "@/components/sketch-box";
import type { Competition, CompetitionStatus, Domain } from "@/types";

export default function CalendarPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [registrations, setRegistrations] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<CompetitionStatus | "ALL">("ALL");
  const [domain, setDomain] = useState<Domain | "ALL">("ALL");
  const [delhiNcr, setDelhiNcr] = useState(false);
  const [view, setView] = useState<"list" | "calendar">("calendar");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status !== "ALL") params.set("status", status);
    if (domain !== "ALL") params.set("domain", domain);
    if (delhiNcr) params.set("delhiNcr", "true");
    if (search) params.set("search", search);

    const [compRes, userRes] = await Promise.all([
      fetch(`/api/competitions?${params}`),
      fetch("/api/users/me"),
    ]);

    const compData = await compRes.json();
    const userData = await userRes.json();

    setCompetitions(compData.competitions ?? []);
    setRegistrations(
      new Set(
        (userData.registrations ?? []).map(
          (r: { competition: { id: string } }) => r.competition.id
        )
      )
    );
    setLoading(false);
  }, [status, domain, delhiNcr, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openCount = useMemo(
    () => competitions.filter((c) => c.status === "REGISTRATION_OPEN").length,
    [competitions]
  );

  const grouped = useMemo(() => {
    const groups = new Map<string, Competition[]>();
    for (const comp of competitions) {
      const key = new Date(comp.registrationDeadline).toLocaleDateString(
        "en-IN",
        { month: "long", year: "numeric" }
      );
      const list = groups.get(key) ?? [];
      list.push(comp);
      groups.set(key, list);
    }
    return Array.from(groups.entries());
  }, [competitions]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero header */}
      <SketchBox variant="dark" className="mb-8 p-6 sm:p-8">
        <p className="font-hand text-sm text-white/70">~ competition calendar ~</p>
        <h1 className="font-sketch text-4xl font-bold text-white sm:text-6xl">
          Case Comp Calendar
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
          Every registration deadline marked on the calendar with a comp icon.
          Hover to peek, click a day to drill in, click an icon to jump to details.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <span className="sketch-tag px-3 py-1.5 text-sm font-bold text-black">
            {openCount} open now
          </span>
          <span className="sketch-tag border-white bg-transparent px-3 py-1.5 text-sm text-white">
            {competitions.length} total comps
          </span>
        </div>
      </SketchBox>

      <div className="grid gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <CalendarFilters
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            domain={domain}
            onDomainChange={setDomain}
            delhiNcr={delhiNcr}
            onDelhiNcrChange={setDelhiNcr}
            view={view}
            onViewChange={setView}
          />
        </aside>

        <div className="lg:col-span-3">
          {loading ? (
            <SketchBox className="py-20 text-center">
              <p className="font-sketch text-2xl animate-pulse">
                sketching your calendar...
              </p>
            </SketchBox>
          ) : competitions.length === 0 ? (
            <SketchBox variant="dashed" className="py-20 text-center">
              <p className="font-sketch text-2xl">nothing here yet ~</p>
              <p className="mt-2 text-sm text-muted">try clearing your filters</p>
            </SketchBox>
          ) : view === "calendar" ? (
            <SketchCalendar
              competitions={competitions}
              registrations={registrations}
            />
          ) : (
            <div className="space-y-10">
              {grouped.map(([monthLabel, comps]) => (
                <section key={monthLabel}>
                  <h2 className="mb-4 font-sketch text-3xl font-bold">
                    {monthLabel}
                  </h2>
                  <p className="mb-4 text-xs text-muted">
                    sorted by registration deadline
                  </p>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {comps
                      .sort(
                        (a, b) =>
                          new Date(a.registrationDeadline).getTime() -
                          new Date(b.registrationDeadline).getTime()
                      )
                      .map((comp) => (
                        <CompetitionCard
                          key={comp.id}
                          competition={comp}
                          isRegistered={registrations.has(comp.id)}
                        />
                      ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}