"use client";

import { Search } from "lucide-react";
import type { Difficulty, Domain } from "@/types";

interface PracticeFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  domain: Domain | "All";
  onDomainChange: (value: Domain | "All") => void;
  difficulty: Difficulty | "All";
  onDifficultyChange: (value: Difficulty | "All") => void;
  duration: "all" | "quick" | "full";
  onDurationChange: (value: "all" | "quick" | "full") => void;
}

const domains: (Domain | "All")[] = [
  "All",
  "Strategy",
  "Marketing",
  "Operations",
  "Finance",
  "Analytics",
];

const difficulties: (Difficulty | "All")[] = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
];

export function PracticeFilters({
  search,
  onSearchChange,
  domain,
  onDomainChange,
  difficulty,
  onDifficultyChange,
  duration,
  onDurationChange,
}: PracticeFiltersProps) {
  return (
    <div className="space-y-4 rounded-xl border border-border bg-surface p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search cases..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
          Domain
        </p>
        <div className="flex flex-wrap gap-2">
          {domains.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onDomainChange(d)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                domain === d
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-muted hover:bg-slate-200"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
          Difficulty
        </p>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onDifficultyChange(d)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                difficulty === d
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-muted hover:bg-slate-200"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
          Duration
        </p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { value: "all", label: "All" },
              { value: "quick", label: "Quick (≤45 min)" },
              { value: "full", label: "Full (90+ min)" },
            ] as const
          ).map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => onDurationChange(d.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                duration === d.value
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-muted hover:bg-slate-200"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}