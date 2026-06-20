import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ExternalLink, MapPin, Users } from "lucide-react";
import { RegisterButton } from "@/components/register-button";
import { SketchBox } from "@/components/sketch-box";
import { getCompIcon } from "@/lib/comp-icons";
import { getCurrentUser } from "@/lib/auth";
import { getCompetitionBySlug } from "@/lib/services/competitions";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function CompetitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [competition, user] = await Promise.all([
    getCompetitionBySlug(slug),
    getCurrentUser(),
  ]);

  if (!competition) notFound();

  const icon = getCompIcon(competition.slug, competition.organizer);
  const isRegistered = user?.competitionRegs.some(
    (r) => r.competitionId === competition.id
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/calendar"
        className="mb-6 inline-flex items-center gap-1 font-bold text-muted hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        back to calendar
      </Link>

      <SketchBox variant="highlight" className="mb-8 p-6 sm:p-8">
        <div className="flex flex-wrap items-start gap-4">
          <span className="comp-icon-btn flex h-16 w-16 items-center justify-center text-4xl sm:h-20 sm:w-20 sm:text-5xl">
            {icon.emoji}
          </span>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              <span className="sketch-tag px-3 py-1 text-xs font-bold">
                {competition.domain}
              </span>
              <span className="sketch-tag px-3 py-1 text-xs font-bold">
                {competition.mode}
              </span>
              {competition.isFeatured && (
                <span className="sketch-tag sketch-tag-active px-3 py-1 text-xs font-bold">
                  ★ featured
                </span>
              )}
            </div>
            <h1 className="mt-3 font-sketch text-3xl font-bold sm:text-4xl">
              {competition.title}
            </h1>
            <p className="mt-1 font-sketch text-xl">{competition.organizer}</p>
          </div>
        </div>
        <p className="mt-6 leading-relaxed">{competition.description}</p>
      </SketchBox>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {[
          {
            icon: Calendar,
            label: "Registration Deadline",
            value: formatDate(competition.registrationDeadline),
            bold: true,
          },
          {
            icon: Calendar,
            label: "Event Date",
            value: formatDate(competition.eventDate),
          },
          ...(competition.preliminaryDate
            ? [
                {
                  icon: Calendar,
                  label: "Preliminary Round",
                  value: formatDate(competition.preliminaryDate),
                },
              ]
            : []),
          {
            icon: MapPin,
            label: "Location",
            value: competition.location,
          },
          {
            icon: Users,
            label: "Team Size",
            value: `${competition.teamSizeMin}–${competition.teamSizeMax} members`,
          },
        ].map((item) => (
          <SketchBox key={item.label} className="p-5">
            <div className="mb-1 flex items-center gap-2 text-sm text-muted">
              <item.icon className="h-4 w-4" strokeWidth={2.5} />
              {item.label}
            </div>
            <p className={item.bold ? "font-sketch text-lg font-bold" : "font-bold"}>
              {item.value}
            </p>
          </SketchBox>
        ))}
        {competition.prizePool && (
          <SketchBox variant="dark" className="p-5 sm:col-span-2">
            <p className="text-sm text-white/70">prize pool</p>
            <p className="font-sketch text-2xl font-bold text-white">
              {competition.prizePool}
            </p>
          </SketchBox>
        )}
      </div>

      <SketchBox className="mb-8 p-6">
        <h2 className="font-sketch text-2xl font-bold">format</h2>
        <p className="mt-2">{competition.format}</p>
        {competition.eligibility && (
          <>
            <h2 className="mt-4 font-sketch text-2xl font-bold">eligibility</h2>
            <p className="mt-2">{competition.eligibility}</p>
          </>
        )}
        {competition.hostCollege && (
          <>
            <h2 className="mt-4 font-sketch text-2xl font-bold">host</h2>
            <p className="mt-2">{competition.hostCollege}</p>
          </>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {competition.tags.map((tag) => (
            <span key={tag} className="sketch-tag px-2.5 py-1 text-xs font-bold">
              {tag}
            </span>
          ))}
        </div>
      </SketchBox>

      <div className="flex flex-wrap gap-3">
        <RegisterButton slug={slug} initialRegistered={!!isRegistered} />
        {competition.registrationUrl && (
          <a
            href={competition.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sketch-btn inline-flex items-center gap-2 px-5 py-2.5 font-bold"
          >
            official site
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        <Link
          href="/practice"
          className="sketch-btn sketch-btn-filled px-5 py-2.5 font-bold"
        >
          practice for this →
        </Link>
      </div>
    </div>
  );
}