import { Flame, Medal } from "lucide-react";
import type { LeaderboardEntry } from "@/types";
import { cn } from "@/lib/utils";

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <Medal className="h-5 w-5 text-amber-500" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-slate-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-700" />;
  return (
    <span className="flex h-5 w-5 items-center justify-center text-sm font-medium text-muted">
      {rank}
    </span>
  );
}

export function LeaderboardTable({
  entries,
  highlightName,
}: {
  entries: LeaderboardEntry[];
  highlightName?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-muted">
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">Student</th>
            <th className="hidden px-4 py-3 sm:table-cell">College</th>
            <th className="px-4 py-3 text-right">Points</th>
            <th className="hidden px-4 py-3 text-right md:table-cell">Cases</th>
            <th className="hidden px-4 py-3 text-right lg:table-cell">Streak</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const isHighlighted = entry.name === highlightName;
            return (
              <tr
                key={entry.rank}
                className={cn(
                  "border-b border-border last:border-0",
                  isHighlighted && "bg-primary/5"
                )}
              >
                <td className="px-4 py-3">
                  <RankBadge rank={entry.rank} />
                </td>
                <td className="px-4 py-3">
                  <p className={cn("font-medium", isHighlighted && "text-primary")}>
                    {entry.name}
                    {isHighlighted && (
                      <span className="ml-2 text-xs text-primary">(You)</span>
                    )}
                  </p>
                  <p className="text-xs text-muted sm:hidden">{entry.college}</p>
                </td>
                <td className="hidden px-4 py-3 text-sm text-muted sm:table-cell">
                  {entry.college}
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  {entry.points.toLocaleString()}
                </td>
                <td className="hidden px-4 py-3 text-right text-sm text-muted md:table-cell">
                  {entry.casesCompleted}
                </td>
                <td className="hidden px-4 py-3 text-right lg:table-cell">
                  <span className="inline-flex items-center gap-1 text-sm text-accent">
                    <Flame className="h-3.5 w-3.5" />
                    {entry.streak}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}