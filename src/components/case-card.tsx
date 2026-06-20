import Link from "next/link";
import { Clock, Play, Star, Video } from "lucide-react";
import { SketchBox } from "@/components/sketch-box";
import type { CaseStudy } from "@/types";
import { formatDuration } from "@/lib/utils";

const difficultyStyle = {
  Beginner: "",
  Intermediate: "sketch-tag-active",
  Advanced: "bg-black text-white",
};

export function CaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link href={`/practice/${caseStudy.id}`} className="group block">
      <SketchBox
        variant={caseStudy.isCaseOfTheWeek ? "highlight" : "default"}
        className="flex h-full flex-col p-5 transition-transform group-hover:-translate-y-1"
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={`sketch-tag px-2.5 py-0.5 text-xs font-bold ${difficultyStyle[caseStudy.difficulty]}`}
          >
            {caseStudy.difficulty}
          </span>
          {caseStudy.isCaseOfTheWeek && (
            <span className="sketch-tag flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold">
              <Star className="h-3 w-3 fill-black" />
              cotw
            </span>
          )}
          {caseStudy.hasVideoWalkthrough && (
            <Video className="ml-auto h-4 w-4 text-muted" strokeWidth={2.5} />
          )}
        </div>

        <h3 className="mb-1 font-sketch text-xl font-bold group-hover:underline">
          {caseStudy.title}
        </h3>
        <p className="mb-3 text-sm text-muted">{caseStudy.company}</p>
        <p className="mb-4 line-clamp-2 flex-1 text-sm">
          {caseStudy.problemStatement}
        </p>

        <div className="flex items-center justify-between border-t-2 border-dashed border-black/15 pt-3">
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="sketch-tag px-2 py-0.5">
              {caseStudy.domain}
            </span>
            <span className="flex items-center gap-1 text-muted">
              <Clock className="h-3 w-3" />
              {formatDuration(caseStudy.duration)}
            </span>
          </div>
          <span className="flex items-center gap-1 text-sm font-bold opacity-0 transition-opacity group-hover:opacity-100">
            <Play className="h-3.5 w-3.5" />
            go →
          </span>
        </div>
      </SketchBox>
    </Link>
  );
}