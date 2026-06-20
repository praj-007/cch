import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FeedbackFlow } from "@/components/feedback-flow";
import { getCaseById } from "@/lib/services/cases";

export default async function FeedbackPage({
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
          Loading feedback...
        </div>
      }
    >
      <FeedbackFlow caseStudy={caseStudy} />
    </Suspense>
  );
}