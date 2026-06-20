export type CompetitionSource = {
  slug: string;
  unstopId: number;
  organizer: string;
  domain: "Strategy" | "Marketing" | "Operations" | "Finance" | "Analytics";
  format: string;
  location: string;
  mode?: "ONLINE" | "OFFLINE" | "HYBRID";
  teamSizeMin?: number;
  teamSizeMax?: number;
  eligibility?: string;
  isFeatured?: boolean;
  tags: string[];
  hostCollege?: string | null;
  /** Override when Unstop only exposes registration window */
  eventDate?: string;
  preliminaryDate?: string;
};

/** Curated Unstop listings — dates are fetched live from the API at seed/sync time. */
export const competitionSources: CompetitionSource[] = [
  {
    slug: "hul-lime-2025",
    unstopId: 1531679,
    organizer: "Hindustan Unilever Limited",
    domain: "Marketing",
    format: "Campus Round → Zonal Semi-Finals → National Finale",
    location: "Mumbai (Finale)",
    mode: "HYBRID",
    teamSizeMin: 3,
    teamSizeMax: 3,
    eligibility: "1st-year full-time MBA students",
    isFeatured: true,
    tags: ["corporate", "marketing", "flagship", "pre-placement"],
  },
  {
    slug: "amazon-ace-2025",
    unstopId: 1505288,
    organizer: "Amazon India",
    domain: "Strategy",
    format: "Online Case → Virtual Finals",
    location: "Online",
    mode: "ONLINE",
    teamSizeMin: 2,
    teamSizeMax: 3,
    isFeatured: true,
    tags: ["corporate", "strategy", "technology"],
  },
  {
    slug: "asian-paints-canvas-2025",
    unstopId: 1521608,
    organizer: "Asian Paints",
    domain: "Marketing",
    format: "Campus Round → Zonal → National Finale",
    location: "Mumbai",
    mode: "HYBRID",
    isFeatured: true,
    tags: ["marketing", "FMCG", "heritage"],
  },
  {
    slug: "tata-imagination-challenge-2025",
    unstopId: 1543000,
    organizer: "Tata Group",
    domain: "Strategy",
    format: "Online Submission → National Finals",
    location: "Mumbai",
    mode: "HYBRID",
    tags: ["corporate", "innovation", "strategy"],
  },
  {
    slug: "abg-stratos-2025",
    unstopId: 1525312,
    organizer: "Aditya Birla Group",
    domain: "Strategy",
    format: "Online Qualifier → National Finale",
    location: "Mumbai",
    mode: "HYBRID",
    tags: ["corporate", "strategy", "conglomerate"],
  },
  {
    slug: "marico-over-the-wall-2025",
    unstopId: 1531168,
    organizer: "Marico",
    domain: "Marketing",
    format: "Online Case → Finale",
    location: "Mumbai",
    mode: "HYBRID",
    tags: ["FMCG", "marketing", "corporate"],
  },
  {
    slug: "tvs-epic-2025",
    unstopId: 1510504,
    organizer: "TVS Credit",
    domain: "Finance",
    format: "Online Strategy Challenge → Finals",
    location: "Chennai",
    mode: "HYBRID",
    tags: ["finance", "strategy", "corporate"],
  },
  {
    slug: "hul-techtonic-2025",
    unstopId: 1525984,
    organizer: "Hindustan Unilever Limited",
    domain: "Analytics",
    format: "Online Challenge → Finale",
    location: "Online",
    mode: "ONLINE",
    tags: ["corporate", "technology", "analytics"],
  },
  {
    slug: "britannia-creatovate-2025",
    unstopId: 1539552,
    organizer: "Britannia Industries",
    domain: "Marketing",
    format: "Track-based Case Challenge → Finale",
    location: "Bangalore",
    mode: "HYBRID",
    tags: ["FMCG", "marketing", "innovation"],
  },
  {
    slug: "fms-conquest-2026",
    unstopId: 1634397,
    organizer: "FMS Delhi (University of Delhi)",
    domain: "Strategy",
    format: "Online Quiz → Case Submission → Finals Presentation",
    location: "New Delhi",
    mode: "HYBRID",
    teamSizeMin: 1,
    teamSizeMax: 4,
    eventDate: "2026-02-15",
    preliminaryDate: "2026-02-08",
    isFeatured: true,
    tags: ["Delhi-NCR", "B-school-fest", "consulting"],
    hostCollege: "FMS Delhi",
  },
  {
    slug: "fame-open-innovation-2025",
    unstopId: 1528448,
    organizer: "Multiple Partners",
    domain: "Strategy",
    format: "Open Innovation Challenge → Demo Day",
    location: "Online",
    mode: "ONLINE",
    tags: ["innovation", "startup", "open-innovation"],
  },
  {
    slug: "tvs-motor-ride-2025",
    unstopId: 1531504,
    organizer: "TVS Motor Company",
    domain: "Strategy",
    format: "Online Case → Finale",
    location: "Chennai",
    mode: "HYBRID",
    tags: ["automotive", "strategy", "corporate"],
  },
];