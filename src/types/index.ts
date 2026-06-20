export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Domain =
  | "Strategy"
  | "Marketing"
  | "Operations"
  | "Finance"
  | "Analytics";
export type PracticeMode = "solo" | "team";
export type ArenaMode = "full" | "quick";
export type CompetitionMode = "ONLINE" | "OFFLINE" | "HYBRID";
export type CompetitionStatus =
  | "REGISTRATION_OPEN"
  | "UPCOMING"
  | "CLOSED"
  | "COMPLETED";

export interface CaseStudy {
  id: string;
  slug?: string;
  title: string;
  company: string;
  domain: Domain;
  difficulty: Difficulty;
  duration: number;
  tags: string[];
  problemStatement: string;
  frameworks: string[];
  keyQuestions: string[];
  modelSolutionSummary: string;
  hasVideoWalkthrough: boolean;
  isCaseOfTheWeek?: boolean;
}

export interface User {
  id: string;
  name: string;
  college: string;
  program: string;
  points: number;
  streak: number;
  casesCompleted: number;
  badges: Badge[];
  isPracticeCertified: boolean;
  rank: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  college: string;
  role: "Analyst" | "Presenter" | "Researcher" | "Lead";
  status: "available" | "in-team";
}

export interface Team {
  id: string;
  name: string;
  college: string;
  members: number;
  maxMembers: number;
  lookingFor: string[];
  caseId?: string;
}

export interface ForumPost {
  id: string;
  author: string;
  college: string;
  title: string;
  content: string;
  type: "discussion" | "question" | "answer";
  replies: number;
  upvotes: number;
  createdAt: string;
  tags: string[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  college: string;
  points: number;
  casesCompleted: number;
  streak: number;
  badges: number;
}

export interface RubricItem {
  id: string;
  criterion: string;
  description: string;
}

export interface AIFeedback {
  strengths: string[];
  improvements: string[];
  score: number;
  summary: string;
}

export interface Competition {
  id: string;
  slug: string;
  title: string;
  organizer: string;
  description: string;
  domain: Domain;
  format: string;
  registrationDeadline: string;
  eventDate: string;
  preliminaryDate: string | null;
  location: string;
  mode: CompetitionMode;
  teamSizeMin: number;
  teamSizeMax: number;
  prizePool: string | null;
  registrationUrl: string | null;
  eligibility: string | null;
  status: CompetitionStatus;
  isFeatured: boolean;
  tags: string[];
  hostCollege: string | null;
}