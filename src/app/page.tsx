import Link from "next/link";
import { CaseCard } from "@/components/case-card";
import { CompetitionCard } from "@/components/competition-card";
import { SketchBox } from "@/components/sketch-box";
import { getCurrentUser } from "@/lib/auth";
import { listCases } from "@/lib/services/cases";
import { listCompetitions } from "@/lib/services/competitions";

const features = [
  {
    emoji: "📅",
    title: "Competition Calendar",
    description:
      "Interactive sketch calendar — every registration deadline marked with a comp icon.",
  },
  {
    emoji: "📚",
    title: "Mock Case Library",
    description: "25+ curated cases with frameworks, model solutions, and walkthroughs.",
  },
  {
    emoji: "⏱️",
    title: "Timed Practice Arena",
    description: "Full simulation or quick drills — solo or team mode.",
  },
  {
    emoji: "💬",
    title: "Multi-Layer Feedback",
    description: "Self-assessment, peer review, and AI feedback on every submission.",
  },
  {
    emoji: "🤝",
    title: "Team Formation",
    description: "Match teammates, assign roles, collaborate in shared workspace.",
  },
  {
    emoji: "🏆",
    title: "Gamification",
    description: "Leaderboards, badges, streaks, and a points system.",
  },
];

export default async function HomePage() {
  const [user, allCases, featuredComps, openComps] = await Promise.all([
    getCurrentUser(),
    listCases(),
    listCompetitions({ featured: true }),
    listCompetitions({ status: "REGISTRATION_OPEN" }),
  ]);

  const caseOfTheWeek = allCases.find((c) => c.isCaseOfTheWeek);
  const featuredCases = allCases.slice(0, 3);
  const upcomingComps = featuredComps.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="border-b-[3px] border-black">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="animate-fade-in">
              <p className="font-hand text-sm text-muted">
                ~ MVP pilot · Delhi-NCR · June 2026 ~
              </p>
              <h1 className="mt-2 font-sketch text-5xl font-bold leading-[1.1] sm:text-6xl lg:text-7xl">
                practice before you compete
              </h1>
              <p className="mt-6 max-w-lg text-base sm:text-lg">
                The dedicated practice ground for case competitions — with an
                interactive calendar that marks every registration deadline.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/calendar"
                  className="sketch-btn sketch-btn-filled px-6 py-3 text-base font-bold"
                >
                  📅 open calendar
                </Link>
                <Link
                  href="/practice"
                  className="sketch-btn px-6 py-3 text-base font-bold"
                >
                  start practicing →
                </Link>
              </div>
            </div>

            {/* Mini calendar preview */}
            <SketchBox variant="highlight" className="p-6">
              <p className="font-sketch text-2xl font-bold">deadlines this month</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {openComps.slice(0, 6).map((comp) => (
                  <Link
                    key={comp.id}
                    href={`/calendar/${comp.slug}`}
                    className="comp-icon-btn flex h-14 w-14 items-center justify-center text-2xl transition-transform hover:-rotate-6"
                    title={comp.title}
                  >
                    {comp.organizer.includes("HUL")
                      ? "🧴"
                      : comp.organizer.includes("Flipkart")
                        ? "🛒"
                        : comp.organizer.includes("Amazon")
                          ? "📦"
                          : comp.organizer.includes("Mahindra")
                            ? "🚜"
                            : "🏆"}
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">
                {openComps.length} comps with open registration →
              </p>
              <Link
                href="/calendar"
                className="mt-3 inline-block font-sketch text-xl font-bold underline"
              >
                see full interactive calendar
              </Link>
            </SketchBox>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b-2 border-dashed border-black/20 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { value: `${openComps.length}`, label: "open now" },
            { value: `${allCases.length}`, label: "practice cases" },
            { value: "22", label: "calendar events" },
            { value: "Aug '26", label: "pilot launch" },
          ].map((stat) => (
            <SketchBox key={stat.label} className="p-4 text-center">
              <p className="font-sketch text-3xl font-bold sm:text-4xl">
                {stat.value}
              </p>
              <p className="text-sm text-muted">{stat.label}</p>
            </SketchBox>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 font-sketch text-4xl font-bold">
          what you get ~
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <SketchBox key={f.title} className="p-5">
              <span className="text-3xl">{f.emoji}</span>
              <h3 className="mt-3 font-sketch text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.description}</p>
            </SketchBox>
          ))}
        </div>
      </section>

      {/* Upcoming comps */}
      <section className="border-y-2 border-dashed border-black/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-sketch text-4xl font-bold">upcoming comps</h2>
            <Link
              href="/calendar"
              className="sketch-btn px-4 py-2 text-sm font-bold"
            >
              full calendar →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingComps.map((comp) => (
              <CompetitionCard key={comp.id} competition={comp} compact />
            ))}
          </div>
        </div>
      </section>

      {caseOfTheWeek && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-sketch text-4xl font-bold">
            case of the week ~
          </h2>
          <div className="max-w-md">
            <CaseCard caseStudy={caseOfTheWeek} />
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-6 font-sketch text-4xl font-bold">popular cases</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCases.map((c) => (
            <CaseCard key={c.id} caseStudy={c} />
          ))}
        </div>
      </section>

      <section className="border-t-[3px] border-black">
        <SketchBox variant="dark" className="mx-auto max-w-7xl m-4 p-8 text-center sm:m-8">
          <h2 className="font-sketch text-4xl font-bold text-white">
            ready to level up?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/80">
            {user
              ? `${user.college} students are already practicing. Your next comp starts on the calendar.`
              : "Start practicing and never miss a registration deadline again."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/calendar"
              className="sketch-btn px-8 py-3 font-bold"
            >
              📅 explore calendar
            </Link>
            <Link
              href="/practice"
              className="sketch-btn border-white bg-transparent px-8 py-3 font-bold text-white"
            >
              practice cases
            </Link>
          </div>
        </SketchBox>
      </section>
    </div>
  );
}