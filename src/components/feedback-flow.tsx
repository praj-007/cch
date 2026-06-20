"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle,
  Star,
  ThumbsUp,
  Users,
} from "lucide-react";
import type { CaseStudy } from "@/types";
import { selfAssessmentRubric } from "@/lib/data";

type Step = "self" | "peer" | "ai" | "complete";

export function FeedbackFlow({ caseStudy }: { caseStudy: CaseStudy }) {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "solo";

  const [step, setStep] = useState<Step>("self");
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [requestPeer, setRequestPeer] = useState(true);

  const allRated = selfAssessmentRubric.every((r) => ratings[r.id] > 0);
  const avgRating =
    Object.values(ratings).length > 0
      ? (
          Object.values(ratings).reduce((a, b) => a + b, 0) /
          Object.values(ratings).length
        ).toFixed(1)
      : "0";

  const steps: { id: Step; label: string; icon: typeof Star }[] = [
    { id: "self", label: "Self-Assessment", icon: CheckCircle },
    { id: "peer", label: "Peer Review", icon: Users },
    { id: "ai", label: "AI Feedback", icon: Bot },
    { id: "complete", label: "Model Solution", icon: Star },
  ];

  const stepIndex = steps.findIndex((s) => s.id === step);

  async function savePracticeSession() {
    const avg =
      Object.values(ratings).reduce((a, b) => a + b, 0) /
      Object.values(ratings).length;

    await fetch("/api/practice-sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        caseId: caseStudy.id,
        mode,
        arenaType: "full",
        selfRating: avg,
        aiScore: 72,
      }),
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm text-muted">Feedback for</p>
        <h1 className="text-2xl font-bold text-foreground">{caseStudy.title}</h1>
      </div>

      <div className="mb-8 flex items-center gap-2">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = s.id === step;
          const isDone = i < stepIndex;
          return (
            <div key={s.id} className="flex flex-1 items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                  isActive
                    ? "bg-primary text-white"
                    : isDone
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-muted"
                }`}
              >
                {isDone ? <CheckCircle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>
              <span
                className={`hidden text-xs font-medium sm:block ${
                  isActive ? "text-primary" : "text-muted"
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 ${isDone ? "bg-emerald-300" : "bg-slate-200"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {step === "self" && (
        <div className="animate-fade-in space-y-6">
          <section className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-4 font-semibold">Self-Assessment Rubric</h2>
            <p className="mb-6 text-sm text-muted">
              Rate yourself honestly on each criterion (1 = needs work, 5 =
              excellent).
            </p>
            <div className="space-y-5">
              {selfAssessmentRubric.map((item) => (
                <div key={item.id}>
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {item.criterion}
                      </p>
                      <p className="text-sm text-muted">{item.description}</p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-primary">
                      {ratings[item.id] || "—"}/5
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() =>
                          setRatings((prev) => ({ ...prev, [item.id]: n }))
                        }
                        className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                          ratings[item.id] === n
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-muted hover:bg-slate-200"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {allRated && (
              <p className="mt-4 text-sm text-muted">
                Average self-rating:{" "}
                <span className="font-semibold text-foreground">{avgRating}/5</span>
              </p>
            )}
          </section>
          <button
            type="button"
            disabled={!allRated}
            onClick={() => setStep("peer")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue to Peer Review
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {step === "peer" && (
        <div className="animate-fade-in space-y-6">
          <section className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-4 font-semibold">Peer Review</h2>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4">
              <input
                type="checkbox"
                checked={requestPeer}
                onChange={(e) => setRequestPeer(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border text-primary"
              />
              <div>
                <p className="font-medium text-foreground">
                  Request peer review from community
                </p>
                <p className="text-sm text-muted">
                  Your solution will be anonymously shared with 2 peers who
                  completed this case. You&apos;ll also review 2 peer submissions.
                </p>
              </div>
            </label>

            {requestPeer && (
              <div className="mt-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
                <p className="font-medium">Estimated turnaround: 24–48 hours</p>
                <p className="mt-1">
                  You&apos;ll earn +50 points for reviewing peer submissions.
                </p>
              </div>
            )}

            <div className="mt-6 rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted">
              <ThumbsUp className="mx-auto mb-2 h-5 w-5" />
              Sample peer feedback will appear here once reviews are complete.
            </div>
          </section>
          <button
            type="button"
            onClick={() => setStep("ai")}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-light"
          >
            View AI Feedback
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {step === "ai" && (
        <div className="animate-fade-in space-y-6">
          <section className="rounded-xl border border-border bg-surface p-6">
            <div className="mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">AI Feedback</h2>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                Score: 72/100
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-600">
              Your analysis demonstrates solid problem framing and appropriate
              framework selection. The market entry recommendation is
              directionally correct but lacks quantified market sizing to support
              city prioritization.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-emerald-50 p-4">
                <p className="mb-2 text-sm font-semibold text-emerald-800">
                  Strengths
                </p>
                <ul className="space-y-1 text-sm text-emerald-700">
                  <li>• Clear problem identification</li>
                  <li>• Good use of STP framework</li>
                  <li>• Actionable channel recommendations</li>
                </ul>
              </div>
              <div className="rounded-lg bg-amber-50 p-4">
                <p className="mb-2 text-sm font-semibold text-amber-800">
                  Areas to Improve
                </p>
                <ul className="space-y-1 text-sm text-amber-700">
                  <li>• Add market sizing for Tier-2 cities</li>
                  <li>• Quantify expected ROI per channel</li>
                  <li>• Address competitive response scenarios</li>
                </ul>
              </div>
            </div>
          </section>
          <button
            type="button"
            onClick={async () => {
              await savePracticeSession();
              setStep("complete");
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-light"
          >
            View Model Solution
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {step === "complete" && (
        <div className="animate-fade-in space-y-6">
          <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <CheckCircle className="mx-auto mb-3 h-10 w-10 text-emerald-600" />
            <h2 className="mb-2 text-xl font-bold text-emerald-900">
              Practice Complete!
            </h2>
            <p className="text-sm text-emerald-700">
              +150 points earned · Streak maintained ·{" "}
              {mode === "team" ? "Team practice logged" : "Solo practice logged"}
            </p>
          </section>

          <section className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-3 font-semibold">Model Solution Summary</h2>
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
              {caseStudy.modelSolutionSummary}
            </p>
            {caseStudy.hasVideoWalkthrough && (
              <div className="rounded-lg bg-slate-900 p-8 text-center text-white">
                <p className="mb-2 font-medium">Video Walkthrough</p>
                <p className="text-sm text-slate-400">
                  Expert breakdown of the model solution (12 min)
                </p>
                <button
                  type="button"
                  className="mt-4 rounded-lg bg-accent px-6 py-2 text-sm font-medium hover:bg-accent-light"
                >
                  Watch Now
                </button>
              </div>
            )}
          </section>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/practice"
              className="flex-1 rounded-xl border border-border bg-surface px-6 py-3 text-center font-semibold hover:bg-slate-50"
            >
              Practice Another Case
            </Link>
            <Link
              href="/leaderboard"
              className="flex-1 rounded-xl bg-primary px-6 py-3 text-center font-semibold text-white hover:bg-primary-light"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}