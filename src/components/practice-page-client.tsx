"use client";

import { useMemo, useState } from "react";
import { CaseCard } from "@/components/case-card";
import { PracticeFilters } from "@/components/practice-filters";
import type { CaseStudy, Difficulty, Domain } from "@/types";

export function PracticePageClient({
  initialCases,
}: {
  initialCases: CaseStudy[];
}) {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState<Domain | "All">("All");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const [duration, setDuration] = useState<"all" | "quick" | "full">("all");

  const filteredCases = useMemo(() => {
    return initialCases.filter((c) => {
      const matchesSearch =
        search === "" ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesDomain = domain === "All" || c.domain === domain;
      const matchesDifficulty =
        difficulty === "All" || c.difficulty === difficulty;

      const matchesDuration =
        duration === "all" ||
        (duration === "quick" && c.duration <= 45) ||
        (duration === "full" && c.duration >= 90);

      return matchesSearch && matchesDomain && matchesDifficulty && matchesDuration;
    });
  }, [initialCases, search, domain, difficulty, duration]);

  return (
    <div className="grid gap-8 lg:grid-cols-4">
      <aside className="lg:col-span-1">
        <PracticeFilters
          search={search}
          onSearchChange={setSearch}
          domain={domain}
          onDomainChange={setDomain}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          duration={duration}
          onDurationChange={setDuration}
        />
      </aside>

      <div className="lg:col-span-3">
        <p className="mb-4 text-sm text-muted">
          Showing {filteredCases.length} case
          {filteredCases.length !== 1 ? "s" : ""}
        </p>
        {filteredCases.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {filteredCases.map((c) => (
              <CaseCard key={c.id} caseStudy={c} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-slate-50 py-16 text-center">
            <p className="text-muted">No cases match your filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setDomain("All");
                setDifficulty("All");
                setDuration("all");
              }}
              className="mt-2 text-sm font-medium text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}