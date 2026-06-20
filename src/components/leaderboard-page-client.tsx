"use client";

import { useState } from "react";
import { Flame, Medal, Trophy } from "lucide-react";
import { LeaderboardTable } from "@/components/leaderboard-table";
import type { LeaderboardEntry } from "@/types";

export function LeaderboardPageClient({
  userName,
  userRank,
  userPoints,
  userStreak,
  collegeLeaderboard,
  nationalLeaderboard,
}: {
  userName: string;
  userRank: number;
  userPoints: number;
  userStreak: number;
  collegeLeaderboard: LeaderboardEntry[];
  nationalLeaderboard: LeaderboardEntry[];
}) {
  const [tab, setTab] = useState<"college" | "national">("college");
  const entries = tab === "college" ? collegeLeaderboard : nationalLeaderboard;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-primary">
          <Trophy className="h-5 w-5" />
          <span className="text-sm font-medium">Gamification</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
        <p className="mt-2 text-muted">
          Track your progress against college peers and nationally.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">Your Rank (College)</p>
          <p className="text-3xl font-bold text-primary">#{userRank}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">Total Points</p>
          <p className="text-3xl font-bold text-foreground">
            {userPoints.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="flex items-center gap-1 text-sm text-muted">
            <Flame className="h-4 w-4 text-accent" />
            Current Streak
          </p>
          <p className="text-3xl font-bold text-accent">{userStreak} days</p>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("college")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === "college"
              ? "bg-primary text-white"
              : "bg-slate-100 text-muted hover:bg-slate-200"
          }`}
        >
          College Leaderboard
        </button>
        <button
          type="button"
          onClick={() => setTab("national")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === "national"
              ? "bg-primary text-white"
              : "bg-slate-100 text-muted hover:bg-slate-200"
          }`}
        >
          National Leaderboard
        </button>
      </div>

      <LeaderboardTable entries={entries} highlightName={userName} />

      <section className="mt-10 rounded-xl border border-border bg-slate-50 p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Medal className="h-5 w-5 text-accent" />
          How Points Work
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { action: "Complete a case", points: "+150" },
            { action: "Peer review submission", points: "+50" },
            { action: "7-day streak bonus", points: "+100" },
            { action: "Case of the Week", points: "+200" },
          ].map((item) => (
            <div key={item.action} className="rounded-lg bg-surface p-4">
              <p className="text-sm text-muted">{item.action}</p>
              <p className="font-semibold text-primary">{item.points}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}