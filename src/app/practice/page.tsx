import { PracticePageClient } from "@/components/practice-page-client";
import { SketchBox } from "@/components/sketch-box";
import { listCases } from "@/lib/services/cases";

export default async function PracticePage() {
  const cases = await listCases();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SketchBox variant="dark" className="mb-8 p-6 sm:p-8">
        <p className="font-hand text-sm text-white/70">~ mock case library ~</p>
        <h1 className="font-sketch text-4xl font-bold text-white sm:text-5xl">
          Practice Cases
        </h1>
        <p className="mt-2 text-sm text-white/80">
          {cases.length} curated cases — strategy, marketing, ops, finance, analytics
        </p>
      </SketchBox>
      <PracticePageClient initialCases={cases} />
    </div>
  );
}