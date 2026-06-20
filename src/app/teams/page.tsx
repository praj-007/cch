import Link from "next/link";
import { Plus, Search, UserPlus, Users } from "lucide-react";
import { prisma } from "@/lib/db";
import { serializeTeam, serializeTeamMember } from "@/lib/serializers";
import { getCaseById } from "@/lib/services/cases";

export default async function TeamsPage() {
  const [teams, members] = await Promise.all([
    prisma.team.findMany({
      include: { members: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.teamMember.findMany({
      include: { user: true },
      orderBy: { user: { name: "asc" } },
    }),
  ]);

  const openTeams = teams.map(serializeTeam);
  const availableMembers = members.map(serializeTeamMember);

  const caseIds = [...new Set(openTeams.map((t) => t.caseId).filter(Boolean))] as string[];
  const linkedCases = await Promise.all(caseIds.map((id) => getCaseById(id)));
  const caseMap = Object.fromEntries(
    linkedCases.filter(Boolean).map((c) => [c!.id, c!])
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Users className="h-5 w-5" />
            <span className="text-sm font-medium">Team Formation</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Find Your Team</h1>
          <p className="mt-2 text-muted">
            Match with teammates, assign roles, and practice together in a shared
            workspace.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-white hover:bg-primary-light"
        >
          <Plus className="h-4 w-4" />
          Create Team
        </button>
      </div>

      <div className="mb-10 grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 text-lg font-semibold">Open Teams</h2>
          <div className="space-y-4">
            {openTeams.map((team) => {
              const linkedCase = team.caseId ? caseMap[team.caseId] : undefined;
              return (
                <div
                  key={team.id}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {team.name}
                      </h3>
                      <p className="text-sm text-muted">{team.college}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium">
                      {team.members}/{team.maxMembers} members
                    </span>
                  </div>
                  {linkedCase && (
                    <p className="mb-3 text-sm text-slate-600">
                      Practicing:{" "}
                      <Link
                        href={`/practice/${linkedCase.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {linkedCase.title}
                      </Link>
                    </p>
                  )}
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="text-xs text-muted">Looking for:</span>
                    {team.lookingFor.map((role) => (
                      <span
                        key={role}
                        className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5"
                  >
                    <UserPlus className="h-4 w-4" />
                    Request to Join
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Available Members</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search by college or role..."
              className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-3">
            {availableMembers.map((member, i) => (
              <div
                key={`${member.id}-${member.role}-${i}`}
                className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3"
              >
                <div>
                  <p className="font-medium text-foreground">{member.name}</p>
                  <p className="text-sm text-muted">{member.college}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium">
                    {member.role}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      member.status === "available"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-muted"
                    }`}
                  >
                    {member.status === "available" ? "Available" : "In team"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-border bg-slate-50 p-6">
        <h2 className="mb-2 font-semibold">Team Workspace Features</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Shared Workspace",
              desc: "Collaborate on solution docs in real-time",
            },
            {
              title: "Role Assignment",
              desc: "Assign Lead, Analyst, Presenter, Researcher roles",
            },
            {
              title: "Team Chat",
              desc: "Coordinate during timed practice sessions",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-lg bg-surface p-4">
              <p className="font-medium text-foreground">{f.title}</p>
              <p className="text-sm text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}