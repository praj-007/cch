import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PracticeArena } from "@/components/practice-arena";
import { getCaseById } from "@/lib/services/cases";

export default async function ArenaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseStudy = await getCaseById(id);

  if (!caseStudy) notFound();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-muted">
          Loading practice arena...
        </div>
      }
    >
      <PracticeArena caseStudy={caseStudy} />
    </Suspense>
  );
}