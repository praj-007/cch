"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  FileText,
  MessageSquare,
  Pause,
  Play,
  Send,
  Upload,
  Users,
} from "lucide-react";
import type { ArenaMode, CaseStudy, PracticeMode } from "@/types";
import { formatDuration } from "@/lib/utils";

function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function PracticeArena({ caseStudy }: { caseStudy: CaseStudy }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") as PracticeMode) || "solo";
  const type = (searchParams.get("type") as ArenaMode) || "full";

  const totalMinutes = type === "quick" ? Math.min(caseStudy.duration, 45) : caseStudy.duration;
  const totalSeconds = totalMinutes * 60;

  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [solution, setSolution] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setIsRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = useCallback(() => {
    setHasStarted(true);
    setIsRunning(true);
  }, []);

  const handleSubmit = () => {
    router.push(`/practice/${caseStudy.id}/feedback?mode=${mode}`);
  };

  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;
  const isLowTime = timeLeft < 300 && hasStarted;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href={`/practice/${caseStudy.id}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Exit arena
      </Link>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted">
            {mode === "team" ? "Team Practice" : "Solo Practice"} ·{" "}
            {type === "quick" ? "Quick Drill" : "Full Simulation"}
          </p>
          <h1 className="text-2xl font-bold text-foreground">{caseStudy.title}</h1>
        </div>

        <div
          className={`flex items-center gap-3 rounded-xl border px-5 py-3 ${
            isLowTime
              ? "border-red-300 bg-red-50 timer-active"
              : "border-border bg-surface"
          }`}
        >
          <Clock className={`h-5 w-5 ${isLowTime ? "text-red-600" : "text-primary"}`} />
          <div>
            <p className={`font-mono text-2xl font-bold ${isLowTime ? "text-red-600" : "text-foreground"}`}>
              {formatTime(timeLeft)}
            </p>
            <p className="text-xs text-muted">of {formatDuration(totalMinutes)}</p>
          </div>
          {!hasStarted ? (
            <button
              type="button"
              onClick={startTimer}
              className="ml-2 flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
            >
              <Play className="h-4 w-4" />
              Start
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className="ml-2 flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Resume
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-primary transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-3 flex items-center gap-2 font-semibold">
              <FileText className="h-4 w-4 text-primary" />
              Problem Statement
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              {caseStudy.problemStatement}
            </p>
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium uppercase text-muted">
                Key Questions
              </p>
              <ul className="space-y-1">
                {caseStudy.keyQuestions.map((q, i) => (
                  <li key={i} className="text-sm text-slate-600">
                    {i + 1}. {q}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-3 font-semibold">Your Solution</h2>
            <textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="Structure your recommendation: Situation → Analysis → Recommendation → Next Steps..."
              rows={10}
              className="w-full rounded-lg border border-border bg-background p-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted hover:bg-slate-50"
              >
                <Upload className="h-4 w-4" />
                Upload slides/PDF
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted hover:bg-slate-50"
              >
                <FileText className="h-4 w-4" />
                Use template
              </button>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-3 font-semibold">Working Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Framework notes, calculations, assumptions..."
              rows={5}
              className="w-full rounded-lg border border-border bg-background p-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-surface p-5">
            <h2 className="mb-3 font-semibold">Frameworks</h2>
            <div className="flex flex-wrap gap-2">
              {caseStudy.frameworks.map((f) => (
                <span
                  key={f}
                  className="rounded bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {f}
                </span>
              ))}
            </div>
          </section>

          {mode === "team" && (
            <section className="rounded-xl border border-border bg-surface p-5">
              <h2 className="mb-3 flex items-center gap-2 font-semibold">
                <Users className="h-4 w-4 text-primary" />
                Team Workspace
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                  <span>Arjun Patel</span>
                  <span className="text-xs text-muted">Lead</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                  <span>Rohan Gupta</span>
                  <span className="text-xs text-muted">Presenter</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                  <span>Priya Nair</span>
                  <span className="text-xs text-muted">Analyst</span>
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-border p-3">
                <p className="mb-2 flex items-center gap-1 text-xs font-medium text-muted">
                  <MessageSquare className="h-3 w-3" />
                  Team Chat
                </p>
                <div className="space-y-2 text-xs">
                  <p>
                    <span className="font-medium">Rohan:</span> I&apos;ll handle
                    the market sizing section
                  </p>
                  <p>
                    <span className="font-medium">Priya:</span> Working on
                    competitive analysis
                  </p>
                </div>
              </div>
            </section>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-light"
          >
            <Send className="h-4 w-4" />
            Submit Solution
          </button>
        </div>
      </div>
    </div>
  );
}