import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Play,
  Star,
  User,
  Users,
  Video,
} from "lucide-react";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { getCaseById } from "@/lib/services/cases";
import { formatDuration } from "@/lib/utils";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseStudy = await getCaseById(id);

  if (!caseStudy) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/practice"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to library
      </Link>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <DifficultyBadge difficulty={caseStudy.difficulty} />
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-muted">
          {caseStudy.domain}
        </span>
        {caseStudy.isCaseOfTheWeek && (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            <Star className="h-3 w-3 fill-current" />
            Case of the Week
          </span>
        )}
        {caseStudy.hasVideoWalkthrough && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            <Video className="h-3 w-3" />
            Video walkthrough
          </span>
        )}
      </div>

      <h1 className="mb-2 text-3xl font-bold text-foreground">
        {caseStudy.title}
      </h1>
      <p className="mb-6 text-lg text-muted">{caseStudy.company}</p>

      <div className="mb-8 flex items-center gap-4 text-sm text-muted">
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {formatDuration(caseStudy.duration)}
        </span>
        <span>{caseStudy.tags.join(" · ")}</span>
      </div>

      <section className="mb-8 rounded-xl border border-border bg-surface p-6">
        <h2 className="mb-3 font-semibold text-foreground">Problem Statement</h2>
        <p className="leading-relaxed text-slate-600">
          {caseStudy.problemStatement}
        </p>
      </section>

      <section className="mb-8 rounded-xl border border-border bg-surface p-6">
        <h2 className="mb-3 font-semibold text-foreground">Key Questions</h2>
        <ul className="space-y-2">
          {caseStudy.keyQuestions.map((q, i) => (
            <li key={i} className="flex gap-2 text-slate-600">
              <span className="font-medium text-primary">{i + 1}.</span>
              {q}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8 rounded-xl border border-border bg-surface p-6">
        <h2 className="mb-3 font-semibold text-foreground">
          Suggested Frameworks
        </h2>
        <div className="flex flex-wrap gap-2">
          {caseStudy.frameworks.map((f) => (
            <span
              key={f}
              className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="mb-2 font-semibold text-amber-900">Preview Only</h2>
        <p className="text-sm text-amber-800">
          The full model solution and video walkthrough are available after you
          complete the practice session and submit your solution.
        </p>
      </section>

      <div className="rounded-xl border border-border bg-surface p-6">
        <h2 className="mb-4 font-semibold text-foreground">Choose Practice Mode</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href={`/practice/${caseStudy.id}/arena?mode=solo&type=full`}
            className="group flex flex-col rounded-xl border-2 border-border p-5 transition-all hover:border-primary hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <h3 className="mb-1 font-semibold group-hover:text-primary">
              Solo Practice
            </h3>
            <p className="mb-4 flex-1 text-sm text-muted">
              Timed individual practice with self-assessment and AI feedback.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              <Play className="h-4 w-4" />
              Start solo
            </span>
          </Link>

          <Link
            href={`/practice/${caseStudy.id}/arena?mode=team&type=full`}
            className="group flex flex-col rounded-xl border-2 border-border p-5 transition-all hover:border-primary hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="mb-1 font-semibold group-hover:text-primary">
              Team Practice
            </h3>
            <p className="mb-4 flex-1 text-sm text-muted">
              Shared workspace with teammates, role assignment, and team chat.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
              <Play className="h-4 w-4" />
              Start with team
            </span>
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/practice/${caseStudy.id}/arena?mode=solo&type=quick`}
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-muted hover:bg-slate-200"
          >
            Quick drill (30–45 min)
          </Link>
          <Link
            href={`/practice/${caseStudy.id}/arena?mode=solo&type=full`}
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-muted hover:bg-slate-200"
          >
            Full simulation (90–120 min)
          </Link>
        </div>
      </div>
    </div>
  );
}