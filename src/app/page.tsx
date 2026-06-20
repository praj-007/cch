import Link from "next/link";
import { HomeCalendarHero } from "@/components/home-calendar-hero";
import { SketchBox } from "@/components/sketch-box";
import { listCases } from "@/lib/services/cases";
import { listCompetitions } from "@/lib/services/competitions";

export default async function HomePage() {
  const [allCases, competitions] = await Promise.all([
    listCases(),
    listCompetitions(),
  ]);

  const openComps = competitions.filter((c) => c.status === "REGISTRATION_OPEN");

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <HomeCalendarHero
          competitions={competitions}
          openCount={openComps.length}
        />
      </section>

      <section className="border-y-2 border-dashed border-black/20 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { value: `${openComps.length}`, label: "open registrations" },
            { value: `${competitions.length}`, label: "verified comps" },
            { value: `${allCases.length}`, label: "practice cases" },
            { value: "Delhi-NCR", label: "pilot region" },
          ].map((stat) => (
            <SketchBox key={stat.label} className="p-4 text-center">
              <p className="font-sketch text-3xl font-bold text-ink sm:text-4xl">
                {stat.value}
              </p>
              <p className="text-sm font-bold text-muted">{stat.label}</p>
            </SketchBox>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SketchBox variant="dashed" className="p-6 sm:p-8">
          <p className="font-hand text-sm font-bold text-muted">
            ~ after you pick your comps ~
          </p>
          <h2 className="mt-1 font-sketch text-3xl font-bold">
            sharpen your cases before finals
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            CaseCompHub also has a mock case library, timed practice arena, and
            team matching — built for the stretch between registration and
            presentation day.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/practice"
              className="sketch-btn sketch-btn-filled px-6 py-3 text-base font-bold"
            >
              start practicing →
            </Link>
            <Link href="/teams" className="sketch-btn px-6 py-3 text-base font-bold">
              find teammates
            </Link>
          </div>
        </SketchBox>
      </section>
    </div>
  );
}