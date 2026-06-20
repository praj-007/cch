"use client";

import { Search } from "lucide-react";
import { SketchBox } from "@/components/sketch-box";
import type { CompetitionStatus, Domain } from "@/types";
import { cn } from "@/lib/utils";

interface CalendarFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  status: CompetitionStatus | "ALL";
  onStatusChange: (v: CompetitionStatus | "ALL") => void;
  domain: Domain | "ALL";
  onDomainChange: (v: Domain | "ALL") => void;
  delhiNcr: boolean;
  onDelhiNcrChange: (v: boolean) => void;
  view: "list" | "calendar";
  onViewChange: (v: "list" | "calendar") => void;
}

const statuses: (CompetitionStatus | "ALL")[] = [
  "ALL",
  "REGISTRATION_OPEN",
  "UPCOMING",
  "CLOSED",
  "COMPLETED",
];

const domains: (Domain | "ALL")[] = [
  "ALL",
  "Strategy",
  "Marketing",
  "Operations",
  "Finance",
  "Analytics",
];

const statusLabels: Record<CompetitionStatus | "ALL", string> = {
  ALL: "All",
  REGISTRATION_OPEN: "Open",
  UPCOMING: "Upcoming",
  CLOSED: "Closed",
  COMPLETED: "Done",
};

export function CalendarFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  domain,
  onDomainChange,
  delhiNcr,
  onDelhiNcrChange,
  view,
  onViewChange,
}: CalendarFiltersProps) {
  return (
    <SketchBox variant="recessed" className="space-y-5 p-4">
      <p className="font-sketch text-xl font-bold">filters ~</p>

      <div className="flex gap-2">
        {(["calendar", "list"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onViewChange(v)}
            className={cn(
              "sketch-btn flex-1 px-3 py-2 text-sm font-bold capitalize",
              view === v && "sketch-btn-filled"
            )}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="search comps..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="sketch-input w-full py-2 pl-6 pr-2 text-sm"
        />
      </div>

      <div>
        <p className="mb-2 font-sketch text-sm font-bold">status</p>
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onStatusChange(s)}
              className={cn(
                "sketch-tag px-2.5 py-1 text-xs font-bold transition-colors",
                status === s && "sketch-tag-active"
              )}
            >
              {statusLabels[s]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-sketch text-sm font-bold">domain</p>
        <div className="flex flex-wrap gap-2">
          {domains.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onDomainChange(d)}
              className={cn(
                "sketch-tag px-2.5 py-1 text-xs font-bold",
                domain === d && "sketch-tag-active"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <label className="sketch-box-dashed flex cursor-pointer items-center gap-3 p-3">
        <input
          type="checkbox"
          checked={delhiNcr}
          onChange={(e) => onDelhiNcrChange(e.target.checked)}
          className="h-4 w-4 border-2 border-black accent-black"
        />
        <span className="text-sm font-bold">Delhi-NCR only</span>
      </label>
    </SketchBox>
  );
}