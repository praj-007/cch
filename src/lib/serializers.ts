import type {
  Badge,
  CaseStudy,
  Competition,
  ForumPost,
  LeaderboardEntry,
  Team,
  TeamMember,
  User,
} from "@/types";

type DbCase = {
  id: string;
  slug: string;
  title: string;
  company: string;
  domain: string;
  difficulty: string;
  duration: number;
  tags: string;
  problemStatement: string;
  frameworks: string;
  keyQuestions: string;
  modelSolutionSummary: string;
  hasVideoWalkthrough: boolean;
  isCaseOfTheWeek: boolean;
};

type DbCompetition = {
  id: string;
  slug: string;
  title: string;
  organizer: string;
  description: string;
  domain: string;
  format: string;
  registrationDeadline: Date;
  eventDate: Date;
  preliminaryDate: Date | null;
  location: string;
  mode: string;
  teamSizeMin: number;
  teamSizeMax: number;
  prizePool: string | null;
  registrationUrl: string | null;
  eligibility: string | null;
  status: string;
  isFeatured: boolean;
  tags: string;
  hostCollege: string | null;
};

type DbUser = {
  id: string;
  name: string;
  college: string;
  program: string;
  points: number;
  streak: number;
  casesCompleted: number;
  isPracticeCertified: boolean;
  badges?: Array<{
    earnedAt: Date;
    badge: { id: string; name: string; description: string; icon: string };
  }>;
};

type DbForumPost = {
  id: string;
  title: string;
  content: string;
  type: string;
  replies: number;
  upvotes: number;
  tags: string;
  createdAt: Date;
  author: { name: string; college: string };
};

type DbTeam = {
  id: string;
  name: string;
  college: string;
  maxMembers: number;
  lookingFor: string;
  caseId: string | null;
  members: Array<{ id: string }>;
};

type DbTeamMember = {
  id: string;
  role: string;
  status: string;
  user: { id: string; name: string; college: string };
};

function parseJsonArray<T>(value: string): T[] {
  return JSON.parse(value) as T[];
}

export function serializeCase(c: DbCase): CaseStudy {
  return {
    id: c.id,
    slug: c.slug,
    title: c.title,
    company: c.company,
    domain: c.domain as CaseStudy["domain"],
    difficulty: c.difficulty as CaseStudy["difficulty"],
    duration: c.duration,
    tags: parseJsonArray<string>(c.tags),
    problemStatement: c.problemStatement,
    frameworks: parseJsonArray<string>(c.frameworks),
    keyQuestions: parseJsonArray<string>(c.keyQuestions),
    modelSolutionSummary: c.modelSolutionSummary,
    hasVideoWalkthrough: c.hasVideoWalkthrough,
    isCaseOfTheWeek: c.isCaseOfTheWeek,
  };
}

export function serializeCompetition(c: DbCompetition): Competition {
  return {
    id: c.id,
    slug: c.slug,
    title: c.title,
    organizer: c.organizer,
    description: c.description,
    domain: c.domain as Competition["domain"],
    format: c.format,
    registrationDeadline: c.registrationDeadline.toISOString(),
    eventDate: c.eventDate.toISOString(),
    preliminaryDate: c.preliminaryDate?.toISOString() ?? null,
    location: c.location,
    mode: c.mode as Competition["mode"],
    teamSizeMin: c.teamSizeMin,
    teamSizeMax: c.teamSizeMax,
    prizePool: c.prizePool,
    registrationUrl: c.registrationUrl,
    eligibility: c.eligibility,
    status: c.status as Competition["status"],
    isFeatured: c.isFeatured,
    tags: parseJsonArray<string>(c.tags),
    hostCollege: c.hostCollege,
  };
}

export function serializeUser(
  u: DbUser,
  rank?: number
): User {
  return {
    id: u.id,
    name: u.name,
    college: u.college,
    program: u.program,
    points: u.points,
    streak: u.streak,
    casesCompleted: u.casesCompleted,
    isPracticeCertified: u.isPracticeCertified,
    rank: rank ?? 0,
    badges:
      u.badges?.map((ub) => ({
        id: ub.badge.id,
        name: ub.badge.name,
        description: ub.badge.description,
        icon: ub.badge.icon,
        earnedAt: ub.earnedAt.toISOString().split("T")[0],
      })) ?? [],
  };
}

export function serializeBadge(b: {
  id: string;
  name: string;
  description: string;
  icon: string;
}): Badge {
  return {
    id: b.id,
    name: b.name,
    description: b.description,
    icon: b.icon,
  };
}

export function serializeForumPost(p: DbForumPost): ForumPost {
  return {
    id: p.id,
    author: p.author.name,
    college: p.author.college,
    title: p.title,
    content: p.content,
    type: p.type as ForumPost["type"],
    replies: p.replies,
    upvotes: p.upvotes,
    createdAt: p.createdAt.toISOString().split("T")[0],
    tags: parseJsonArray<string>(p.tags),
  };
}

export function serializeTeam(t: DbTeam): Team {
  return {
    id: t.id,
    name: t.name,
    college: t.college,
    members: t.members.length,
    maxMembers: t.maxMembers,
    lookingFor: parseJsonArray<string>(t.lookingFor),
    caseId: t.caseId ?? undefined,
  };
}

export function serializeTeamMember(m: DbTeamMember): TeamMember {
  return {
    id: m.user.id,
    name: m.user.name,
    college: m.user.college,
    role: m.role as TeamMember["role"],
    status: m.status as TeamMember["status"],
  };
}

export function serializeLeaderboardEntry(e: {
  rank: number;
  userName: string;
  college: string;
  points: number;
  casesCompleted: number;
  streak: number;
  badges: number;
}): LeaderboardEntry {
  return {
    rank: e.rank,
    name: e.userName,
    college: e.college,
    points: e.points,
    casesCompleted: e.casesCompleted,
    streak: e.streak,
    badges: e.badges,
  };
}