import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { cases, forumPosts } from "../src/lib/data";

const competitions = [
  {
    slug: "hul-lime-2026",
    title: "HUL L.I.M.E. Season XIV",
    organizer: "Hindustan Unilever Limited",
    description:
      "India's premier B-school case competition spanning Leadership, Innovation, Marketing & Entrepreneurship. Campus rounds followed by national semi-finals and a grand finale in Mumbai.",
    domain: "Marketing",
    format: "Campus Round → Zonal Semi-Finals → National Finale",
    registrationDeadline: new Date("2026-07-15"),
    preliminaryDate: new Date("2026-08-20"),
    eventDate: new Date("2026-10-18"),
    location: "Mumbai (Finale)",
    mode: "HYBRID",
    teamSizeMin: 2,
    teamSizeMax: 3,
    prizePool: "₹10 Lakhs + Pre-placement interviews",
    registrationUrl: "https://www.hul.co.in/careers/lime/",
    eligibility: "Full-time MBA/PGDM students from AICTE-approved B-schools",
    status: "REGISTRATION_OPEN",
    isFeatured: true,
    tags: ["corporate", "marketing", "flagship", "pre-placement"],
    hostCollege: null,
  },
  {
    slug: "flipkart-wired-2026",
    title: "Flipkart Wired 2026",
    organizer: "Flipkart",
    description:
      "E-commerce and supply chain case competition challenging teams to solve real business problems in retail, logistics, and customer experience.",
    domain: "Operations",
    format: "Online Qualifier → Virtual Semi-Finals → On-campus Finale",
    registrationDeadline: new Date("2026-07-25"),
    preliminaryDate: new Date("2026-08-28"),
    eventDate: new Date("2026-09-20"),
    location: "Bangalore (Finale)",
    mode: "HYBRID",
    teamSizeMin: 2,
    teamSizeMax: 4,
    prizePool: "₹8 Lakhs + PPI opportunities",
    registrationUrl: "https://www.flipkartcareers.com/wired",
    eligibility: "MBA students from top 50 B-schools in India",
    status: "REGISTRATION_OPEN",
    isFeatured: true,
    tags: ["e-commerce", "operations", "corporate"],
    hostCollege: null,
  },
  {
    slug: "amazon-ace-2026",
    title: "Amazon Ace 2026",
    organizer: "Amazon India",
    description:
      "Customer obsession meets case cracking. Teams analyze real Amazon business scenarios across retail, AWS, and operations.",
    domain: "Strategy",
    format: "Online Case → Virtual Finals",
    registrationDeadline: new Date("2026-08-01"),
    preliminaryDate: new Date("2026-09-05"),
    eventDate: new Date("2026-09-27"),
    location: "Online",
    mode: "ONLINE",
    teamSizeMin: 2,
    teamSizeMax: 3,
    prizePool: "₹5 Lakhs + Amazon internships",
    registrationUrl: "https://www.amazon.jobs/en/teams/student-programs",
    eligibility: "1st and 2nd year MBA students",
    status: "REGISTRATION_OPEN",
    isFeatured: true,
    tags: ["corporate", "strategy", "technology"],
    hostCollege: null,
  },
  {
    slug: "mahindra-war-room-2026",
    title: "Mahindra War Room Season 12",
    organizer: "Mahindra Group",
    description:
      "Multi-domain case competition covering automotive, farm equipment, IT, and financial services. Known for rigorous analysis and CXO jury panels.",
    domain: "Strategy",
    format: "Campus → Regional → National Grand Finale",
    registrationDeadline: new Date("2026-08-10"),
    preliminaryDate: new Date("2026-09-12"),
    eventDate: new Date("2026-11-08"),
    location: "Mumbai",
    mode: "HYBRID",
    teamSizeMin: 3,
    teamSizeMax: 4,
    prizePool: "₹12 Lakhs + Mahindra Group PPIs",
    registrationUrl: "https://www.mahindra.com/war-room",
    eligibility: "MBA/PGDM students, all years",
    status: "UPCOMING",
    isFeatured: true,
    tags: ["corporate", "strategy", "flagship"],
    hostCollege: null,
  },
  {
    slug: "tata-innovista-2026",
    title: "Tata Innovista 2026",
    organizer: "Tata Group",
    description:
      "The Tata Group's flagship B-school competition focusing on innovation, sustainability, and group synergy across Tata companies.",
    domain: "Strategy",
    format: "Online Submission → National Finals at Tata HQ",
    registrationDeadline: new Date("2026-08-20"),
    preliminaryDate: new Date("2026-09-25"),
    eventDate: new Date("2026-10-25"),
    location: "Mumbai",
    mode: "HYBRID",
    teamSizeMin: 2,
    teamSizeMax: 4,
    prizePool: "₹7 Lakhs + Tata group exposure",
    registrationUrl: "https://www.tata.com/innovista",
    eligibility: "MBA students from recognized Indian B-schools",
    status: "UPCOMING",
    isFeatured: false,
    tags: ["corporate", "sustainability", "innovation"],
    hostCollege: null,
  },
  {
    slug: "reckitt-kickstart-2026",
    title: "Reckitt Kickstart 2026",
    organizer: "Reckitt Benckiser",
    description:
      "Marketing and brand strategy competition for FMCG enthusiasts. Cases focus on health, hygiene, and home care brands like Dettol and Harpic.",
    domain: "Marketing",
    format: "Online Qualifier → Virtual Finals",
    registrationDeadline: new Date("2026-07-30"),
    preliminaryDate: new Date("2026-08-22"),
    eventDate: new Date("2026-09-14"),
    location: "Gurgaon (Finale)",
    mode: "HYBRID",
    teamSizeMin: 2,
    teamSizeMax: 3,
    prizePool: "₹4 Lakhs + RB PPIs",
    registrationUrl: "https://www.reckitt.com/careers/kickstart",
    eligibility: "MBA marketing majors preferred, all welcome",
    status: "REGISTRATION_OPEN",
    isFeatured: false,
    tags: ["FMCG", "marketing", "corporate"],
    hostCollege: null,
  },
  {
    slug: "asian-pact-2026",
    title: "Asian Pact 2026",
    organizer: "Asian Paints",
    description:
      "India's longest-running marketing case competition. Teams tackle real Asian Paints business challenges in decorative paints and home décor.",
    domain: "Marketing",
    format: "Campus Round → Zonal → National Finale",
    registrationDeadline: new Date("2026-08-05"),
    preliminaryDate: new Date("2026-09-08"),
    eventDate: new Date("2026-10-04"),
    location: "Mumbai",
    mode: "HYBRID",
    teamSizeMin: 2,
    teamSizeMax: 3,
    prizePool: "₹6 Lakhs",
    registrationUrl: "https://www.asianpaints.com/asian-pact",
    eligibility: "MBA/PGDM students nationwide",
    status: "REGISTRATION_OPEN",
    isFeatured: false,
    tags: ["marketing", "FMCG", "heritage"],
    hostCollege: null,
  },
  {
    slug: "itc-interrobang-2026",
    title: "ITC Interrobang 2026",
    organizer: "ITC Limited",
    description:
      "Multi-round competition spanning FMCG, hotels, agri-business, and paperboards. Tests versatility across ITC's diverse business portfolio.",
    domain: "Strategy",
    format: "Online + Campus → National Finals",
    registrationDeadline: new Date("2026-08-15"),
    preliminaryDate: new Date("2026-09-18"),
    eventDate: new Date("2026-10-11"),
    location: "Kolkata",
    mode: "HYBRID",
    teamSizeMin: 2,
    teamSizeMax: 4,
    prizePool: "₹5 Lakhs + ITC PPIs",
    registrationUrl: "https://www.itcportal.com/careers/interrobang",
    eligibility: "MBA students from premier B-schools",
    status: "UPCOMING",
    isFeatured: false,
    tags: ["corporate", "FMCG", "diversified"],
    hostCollege: null,
  },
  {
    slug: "mondelez-canvas-2026",
    title: "Mondelez Canvas 2026",
    organizer: "Mondelez International",
    description:
      "Brand management and innovation challenge for confectionery and snacking brands including Cadbury and Oreo.",
    domain: "Marketing",
    format: "Virtual Case → On-campus Finale",
    registrationDeadline: new Date("2026-09-01"),
    preliminaryDate: new Date("2026-09-22"),
    eventDate: new Date("2026-10-17"),
    location: "Mumbai",
    mode: "HYBRID",
    teamSizeMin: 2,
    teamSizeMax: 3,
    prizePool: "₹3.5 Lakhs",
    registrationUrl: "https://www.mondelezinternational.com/canvas",
    eligibility: "MBA students, marketing focus preferred",
    status: "UPCOMING",
    isFeatured: false,
    tags: ["FMCG", "branding", "innovation"],
    hostCollege: null,
  },
  {
    slug: "bajaj-finserv-olympiad-2026",
    title: "Bajaj Finserv Olympiad 2026",
    organizer: "Bajaj Finserv",
    description:
      "Finance and analytics focused competition covering lending, insurance, and fintech innovation in Indian financial services.",
    domain: "Finance",
    format: "Online Qualifier → National Finale",
    registrationDeadline: new Date("2026-08-25"),
    preliminaryDate: new Date("2026-09-28"),
    eventDate: new Date("2026-10-24"),
    location: "Pune",
    mode: "HYBRID",
    teamSizeMin: 2,
    teamSizeMax: 4,
    prizePool: "₹5 Lakhs + Bajaj Finserv internships",
    registrationUrl: "https://www.bajajfinserv.in/olympiad",
    eligibility: "MBA finance/analytics students",
    status: "UPCOMING",
    isFeatured: false,
    tags: ["finance", "fintech", "analytics"],
    hostCollege: null,
  },
  {
    slug: "deloitte-ironman-2026",
    title: "Deloitte Ironman 2026",
    organizer: "Deloitte India",
    description:
      "Consulting case competition simulating real client engagements. Emphasis on structured problem-solving and executive presentation.",
    domain: "Strategy",
    format: "Campus → Regional → National",
    registrationDeadline: new Date("2026-09-05"),
    preliminaryDate: new Date("2026-10-03"),
    eventDate: new Date("2026-11-01"),
    location: "Hyderabad",
    mode: "HYBRID",
    teamSizeMin: 3,
    teamSizeMax: 4,
    prizePool: "₹4 Lakhs + Deloitte consulting PPIs",
    registrationUrl: "https://www2.deloitte.com/in/en/careers/ironman",
    eligibility: "MBA students interested in consulting",
    status: "UPCOMING",
    isFeatured: false,
    tags: ["consulting", "strategy", "corporate"],
    hostCollege: null,
  },
  {
    slug: "zs-case-challenge-2026",
    title: "ZS Associates Case Challenge 2026",
    organizer: "ZS Associates",
    description:
      "Healthcare and pharma consulting case competition. Teams solve data-driven problems for life sciences clients.",
    domain: "Analytics",
    format: "Online Case → Virtual Finals",
    registrationDeadline: new Date("2026-07-20"),
    preliminaryDate: new Date("2026-08-15"),
    eventDate: new Date("2026-09-06"),
    location: "Online",
    mode: "ONLINE",
    teamSizeMin: 2,
    teamSizeMax: 3,
    prizePool: "₹3 Lakhs + ZS internship offers",
    registrationUrl: "https://www.zs.com/careers/case-challenge",
    eligibility: "MBA students with analytics or pharma interest",
    status: "REGISTRATION_OPEN",
    isFeatured: false,
    tags: ["consulting", "healthcare", "analytics"],
    hostCollege: null,
  },
  {
    slug: "vista-iimb-2026",
    title: "Vista 2026 — Case Competition Track",
    organizer: "IIM Bangalore",
    description:
      "National B-school fest case competition track hosted by Vista, IIMB's annual business festival. Open to teams across India.",
    domain: "Strategy",
    format: "Online Prelims → On-campus Finals at IIMB",
    registrationDeadline: new Date("2026-08-30"),
    preliminaryDate: new Date("2026-09-26"),
    eventDate: new Date("2026-10-10"),
    location: "Bangalore",
    mode: "HYBRID",
    teamSizeMin: 2,
    teamSizeMax: 4,
    prizePool: "₹2 Lakhs",
    registrationUrl: "https://www.iimb-vista.com/case-comp",
    eligibility: "All B-school students in India",
    status: "UPCOMING",
    isFeatured: false,
    tags: ["B-school-fest", "national", "strategy"],
    hostCollege: "IIM Bangalore",
  },
  {
    slug: "confluence-iima-2026",
    title: "Confluence Case Masters 2026",
    organizer: "IIM Ahmedabad",
    description:
      "Part of Confluence, IIMA's annual management symposium. High-intensity cases judged by faculty and industry leaders.",
    domain: "Strategy",
    format: "On-campus at IIMA",
    registrationDeadline: new Date("2026-09-10"),
    eventDate: new Date("2026-10-17"),
    location: "Ahmedabad",
    mode: "OFFLINE",
    teamSizeMin: 2,
    teamSizeMax: 3,
    prizePool: "₹1.5 Lakhs",
    registrationUrl: "https://www.iimaconfluence.com",
    eligibility: "Invited and registered B-school teams",
    status: "UPCOMING",
    isFeatured: false,
    tags: ["B-school-fest", "strategy"],
    hostCollege: "IIM Ahmedabad",
  },
  {
    slug: "fms-case-wars-2026",
    title: "FMS Case Wars 2026",
    organizer: "FMS Delhi",
    description:
      "Delhi-NCR's premier inter-B-school case competition. Fast-paced rounds with live Q&A from industry jury. Ideal for pilot cohort.",
    domain: "Strategy",
    format: "Campus Qualifier → FMS Delhi Finale",
    registrationDeadline: new Date("2026-07-10"),
    preliminaryDate: new Date("2026-08-01"),
    eventDate: new Date("2026-08-22"),
    location: "New Delhi",
    mode: "OFFLINE",
    teamSizeMin: 2,
    teamSizeMax: 4,
    prizePool: "₹1 Lakh",
    registrationUrl: "https://www.fms.edu/case-wars",
    eligibility: "MBA students from Delhi-NCR B-schools",
    status: "REGISTRATION_OPEN",
    isFeatured: true,
    tags: ["Delhi-NCR", "B-school", "pilot"],
    hostCollege: "FMS Delhi",
  },
  {
    slug: "mdi-national-case-2026",
    title: "MDI National Case Competition 2026",
    organizer: "MDI Gurgaon",
    description:
      "National-level case competition as part of MDI's annual business conclave. Strong corporate participation from Gurgaon NCR.",
    domain: "Strategy",
    format: "Online Prelims → MDI Campus Finals",
    registrationDeadline: new Date("2026-08-08"),
    preliminaryDate: new Date("2026-09-01"),
    eventDate: new Date("2026-09-19"),
    location: "Gurgaon",
    mode: "HYBRID",
    teamSizeMin: 2,
    teamSizeMax: 4,
    prizePool: "₹1.5 Lakhs",
    registrationUrl: "https://www.mdi.ac.in/national-case-comp",
    eligibility: "MBA/PGDM students across India",
    status: "REGISTRATION_OPEN",
    isFeatured: false,
    tags: ["Delhi-NCR", "B-school", "national"],
    hostCollege: "MDI Gurgaon",
  },
  {
    slug: "iim-delhi-intra-2026",
    title: "IIM Delhi Case Championship 2026",
    organizer: "IIM Delhi",
    description:
      "Annual intra and inter-college case championship. Open to Delhi-NCR colleges for the inter-college track.",
    domain: "Strategy",
    format: "Intra rounds → Inter-college Finale",
    registrationDeadline: new Date("2026-07-05"),
    preliminaryDate: new Date("2026-07-25"),
    eventDate: new Date("2026-08-15"),
    location: "New Delhi",
    mode: "OFFLINE",
    teamSizeMin: 2,
    teamSizeMax: 4,
    prizePool: "₹75,000",
    registrationUrl: "https://www.iimdelhi.ac.in/case-championship",
    eligibility: "IIM Delhi students + invited Delhi-NCR colleges",
    status: "REGISTRATION_OPEN",
    isFeatured: false,
    tags: ["Delhi-NCR", "B-school", "pilot"],
    hostCollege: "IIM Delhi",
  },
  {
    slug: "colgate-transcend-2026",
    title: "Colgate Transcend 2026",
    organizer: "Colgate-Palmolive",
    description:
      "Brand and marketing strategy competition focused on oral care and personal care categories in the Indian market.",
    domain: "Marketing",
    format: "Online → Campus Finale",
    registrationDeadline: new Date("2026-09-15"),
    preliminaryDate: new Date("2026-10-08"),
    eventDate: new Date("2026-11-15"),
    location: "Mumbai",
    mode: "HYBRID",
    teamSizeMin: 2,
    teamSizeMax: 3,
    prizePool: "₹3 Lakhs",
    registrationUrl: "https://www.colgatepalmolive.co.in/transcend",
    eligibility: "MBA students nationwide",
    status: "UPCOMING",
    isFeatured: false,
    tags: ["FMCG", "marketing", "branding"],
    hostCollege: null,
  },
  {
    slug: "pg-cto-challenge-2026",
    title: "P&G CTO Challenge 2026",
    organizer: "Procter & Gamble",
    description:
      "Chief Technology Officer challenge focusing on supply chain, operations, and product innovation for P&G brands.",
    domain: "Operations",
    format: "Online Qualifier → P&G Office Finale",
    registrationDeadline: new Date("2026-08-18"),
    preliminaryDate: new Date("2026-09-15"),
    eventDate: new Date("2026-10-04"),
    location: "Mumbai",
    mode: "HYBRID",
    teamSizeMin: 2,
    teamSizeMax: 4,
    prizePool: "₹4 Lakhs + P&G PPIs",
    registrationUrl: "https://www.pgcareers.com/cto-challenge",
    eligibility: "MBA students, operations/supply chain focus",
    status: "UPCOMING",
    isFeatured: false,
    tags: ["FMCG", "operations", "corporate"],
    hostCollege: null,
  },
  {
    slug: "yes-bank-transformation-2026",
    title: "YES Bank Transformation Series 2026",
    organizer: "YES Bank",
    description:
      "Banking and fintech case competition addressing digital transformation, financial inclusion, and retail banking innovation.",
    domain: "Finance",
    format: "Online → National Finale",
    registrationDeadline: new Date("2026-06-30"),
    preliminaryDate: new Date("2026-07-18"),
    eventDate: new Date("2026-08-08"),
    location: "Mumbai",
    mode: "HYBRID",
    teamSizeMin: 2,
    teamSizeMax: 3,
    prizePool: "₹2.5 Lakhs",
    registrationUrl: "https://www.yesbank.in/transformation-series",
    eligibility: "MBA finance students",
    status: "REGISTRATION_OPEN",
    isFeatured: false,
    tags: ["banking", "fintech", "finance"],
    hostCollege: null,
  },
  {
    slug: "nivea-marathon-2026",
    title: "NIVEA Marathon 2026",
    organizer: "Beiersdorf (NIVEA)",
    description:
      "Skincare and personal care marketing competition. Teams develop go-to-market strategies for NIVEA product lines in India.",
    domain: "Marketing",
    format: "Virtual Case → Finale",
    registrationDeadline: new Date("2026-05-15"),
    eventDate: new Date("2026-06-14"),
    location: "Mumbai",
    mode: "HYBRID",
    teamSizeMin: 2,
    teamSizeMax: 3,
    prizePool: "₹2 Lakhs",
    registrationUrl: "https://www.nivea.in/marathon",
    eligibility: "MBA students",
    status: "COMPLETED",
    isFeatured: false,
    tags: ["FMCG", "marketing", "skincare"],
    hostCollege: null,
  },
  {
    slug: "rb-mavericks-2026",
    title: "RB Mavericks 2026",
    organizer: "Reckitt (RB)",
    description:
      "Innovation and brand building competition for health and nutrition brands. Fast-paced virtual format.",
    domain: "Marketing",
    format: "48-hour Virtual Case Marathon",
    registrationDeadline: new Date("2026-04-30"),
    eventDate: new Date("2026-05-24"),
    location: "Online",
    mode: "ONLINE",
    teamSizeMin: 2,
    teamSizeMax: 3,
    prizePool: "₹1.5 Lakhs",
    registrationUrl: "https://www.reckitt.com/mavericks",
    eligibility: "MBA students",
    status: "COMPLETED",
    isFeatured: false,
    tags: ["FMCG", "innovation", "virtual"],
    hostCollege: null,
  },
];

const users = [
  {
    email: "arjun.patel@iimdelhi.ac.in",
    name: "Arjun Patel",
    college: "IIM Delhi",
    program: "MBA (2nd Year)",
    points: 2840,
    streak: 12,
    casesCompleted: 18,
    isPracticeCertified: false,
    badgeSlugs: ["first-case", "seven-day-streak", "team-player"],
  },
  {
    email: "priya.nair@fms.edu",
    name: "Priya Nair",
    college: "FMS Delhi",
    program: "MBA (2nd Year)",
    points: 4200,
    streak: 21,
    casesCompleted: 28,
    isPracticeCertified: true,
    badgeSlugs: ["first-case", "seven-day-streak", "strategy-master", "practice-certified", "top-10"],
  },
  {
    email: "rohan.gupta@iimdelhi.ac.in",
    name: "Rohan Gupta",
    college: "IIM Delhi",
    program: "MBA (1st Year)",
    points: 3850,
    streak: 15,
    casesCompleted: 25,
    isPracticeCertified: true,
    badgeSlugs: ["first-case", "seven-day-streak", "team-player", "strategy-master"],
  },
  {
    email: "sneha.reddy@xlri.ac.in",
    name: "Sneha Reddy",
    college: "XLRI Jamshedpur",
    program: "PGDM (2nd Year)",
    points: 3620,
    streak: 18,
    casesCompleted: 22,
    isPracticeCertified: true,
    badgeSlugs: ["first-case", "seven-day-streak", "team-player", "strategy-master"],
  },
  {
    email: "vikram.singh@mdi.ac.in",
    name: "Vikram Singh",
    college: "MDI Gurgaon",
    program: "PGPM (2nd Year)",
    points: 2900,
    streak: 14,
    casesCompleted: 18,
    isPracticeCertified: false,
    badgeSlugs: ["first-case", "seven-day-streak", "team-player"],
  },
  {
    email: "karthik.menon@iimdelhi.ac.in",
    name: "Karthik Menon",
    college: "IIM Delhi",
    program: "MBA (2nd Year)",
    points: 3100,
    streak: 10,
    casesCompleted: 20,
    isPracticeCertified: false,
    badgeSlugs: ["first-case", "team-player", "strategy-master"],
  },
  {
    email: "ananya.joshi@iift.edu",
    name: "Ananya Joshi",
    college: "IIFT Delhi",
    program: "MBA (IB)",
    points: 2950,
    streak: 8,
    casesCompleted: 19,
    isPracticeCertified: false,
    badgeSlugs: ["first-case", "seven-day-streak", "team-player"],
  },
  {
    email: "meera.krishnan@fms.edu",
    name: "Meera Krishnan",
    college: "FMS Delhi",
    program: "MBA (1st Year)",
    points: 2650,
    streak: 6,
    casesCompleted: 16,
    isPracticeCertified: false,
    badgeSlugs: ["first-case", "team-player"],
  },
  {
    email: "aditya.shah@iimb.ac.in",
    name: "Aditya Shah",
    college: "IIM Bangalore",
    program: "MBA (2nd Year)",
    points: 5100,
    streak: 25,
    casesCompleted: 32,
    isPracticeCertified: true,
    badgeSlugs: ["first-case", "seven-day-streak", "team-player", "strategy-master", "practice-certified", "top-10"],
  },
  {
    email: "neha.verma@isb.edu",
    name: "Neha Verma",
    college: "ISB Hyderabad",
    program: "PGP (1 Year)",
    points: 4800,
    streak: 22,
    casesCompleted: 30,
    isPracticeCertified: true,
    badgeSlugs: ["first-case", "seven-day-streak", "team-player", "strategy-master", "practice-certified"],
  },
  {
    email: "dr.priya.sharma@iimdelhi.ac.in",
    name: "Dr. Priya Sharma",
    college: "IIM Delhi",
    program: "Faculty",
    points: 0,
    streak: 0,
    casesCompleted: 0,
    isPracticeCertified: false,
    badgeSlugs: [],
  },
  {
    email: "rahul.mehra@industry.com",
    name: "Rahul Mehra",
    college: "Industry Expert",
    program: "Competition Organizer",
    points: 0,
    streak: 0,
    casesCompleted: 0,
    isPracticeCertified: false,
    badgeSlugs: [],
  },
];

const badgeSeed = [
  { slug: "first-case", name: "First Case", description: "Completed your first mock case", icon: "🎯" },
  { slug: "seven-day-streak", name: "7-Day Streak", description: "Practiced 7 days in a row", icon: "🔥" },
  { slug: "team-player", name: "Team Player", description: "Completed 3 team practice sessions", icon: "🤝" },
  { slug: "strategy-master", name: "Strategy Master", description: "Complete 5 strategy cases with 4+ rating", icon: "♟️" },
  { slug: "practice-certified", name: "Practice Certified", description: "Complete 20 cases with good peer ratings", icon: "✅" },
  { slug: "top-10", name: "Top 10", description: "Reach top 10 on national leaderboard", icon: "🏆" },
];

function slugify(title: string, id: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base}-${id.replace("c", "")}`;
}

async function main() {
  console.log("Seeding database...");

  await prisma.competitionRegistration.deleteMany();
  await prisma.practiceSession.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.team.deleteMany();
  await prisma.forumPost.deleteMany();
  await prisma.userBadge.deleteMany();
  await prisma.leaderboardSnapshot.deleteMany();
  await prisma.caseStudy.deleteMany();
  await prisma.competition.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.user.deleteMany();

  for (const badge of badgeSeed) {
    await prisma.badge.create({ data: badge });
  }

  const badgeMap = Object.fromEntries(
    (await prisma.badge.findMany()).map((b) => [b.slug, b.id])
  );

  const userRecords: Record<string, string> = {};
  for (const user of users) {
    const created = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        college: user.college,
        program: user.program,
        points: user.points,
        streak: user.streak,
        casesCompleted: user.casesCompleted,
        isPracticeCertified: user.isPracticeCertified,
      },
    });
    userRecords[user.email] = created.id;

    for (const slug of user.badgeSlugs) {
      await prisma.userBadge.create({
        data: { userId: created.id, badgeId: badgeMap[slug] },
      });
    }
  }

  const arjunId = userRecords["arjun.patel@iimdelhi.ac.in"];
  const caseRecords: Record<string, string> = {};

  for (const c of cases) {
    const created = await prisma.caseStudy.create({
      data: {
        slug: slugify(c.title, c.id),
        title: c.title,
        company: c.company,
        domain: c.domain,
        difficulty: c.difficulty,
        duration: c.duration,
        tags: JSON.stringify(c.tags),
        problemStatement: c.problemStatement,
        frameworks: JSON.stringify(c.frameworks),
        keyQuestions: JSON.stringify(c.keyQuestions),
        modelSolutionSummary: c.modelSolutionSummary,
        hasVideoWalkthrough: c.hasVideoWalkthrough,
        isCaseOfTheWeek: c.isCaseOfTheWeek ?? false,
      },
    });
    caseRecords[c.id] = created.id;
  }

  for (const comp of competitions) {
    const { tags, ...rest } = comp;
    await prisma.competition.create({
      data: {
        ...rest,
        tags: JSON.stringify(tags),
      },
    });
  }

  const forumAuthorMap: Record<string, string> = {
    "Sneha Kapoor": userRecords["sneha.reddy@xlri.ac.in"],
    "Rahul Mehra": userRecords["rahul.mehra@industry.com"],
    "Arjun Patel": arjunId,
    "Dr. Priya Sharma": userRecords["dr.priya.sharma@iimdelhi.ac.in"],
    "Vikram Rao": userRecords["vikram.singh@mdi.ac.in"],
  };

  for (const post of forumPosts) {
    const authorId = forumAuthorMap[post.author];
    if (!authorId) continue;
    await prisma.forumPost.create({
      data: {
        authorId,
        title: post.title,
        content: post.content,
        type: post.type,
        replies: post.replies,
        upvotes: post.upvotes,
        tags: JSON.stringify(post.tags),
        createdAt: new Date(post.createdAt),
      },
    });
  }

  const team1 = await prisma.team.create({
    data: {
      name: "Case Crushers",
      college: "IIM Delhi",
      maxMembers: 4,
      lookingFor: JSON.stringify(["Presenter"]),
      caseId: caseRecords["c1"],
    },
  });

  const team2 = await prisma.team.create({
    data: {
      name: "Strategy Squad",
      college: "FMS Delhi",
      maxMembers: 4,
      lookingFor: JSON.stringify(["Analyst", "Researcher"]),
      caseId: caseRecords["c14"],
    },
  });

  const team3 = await prisma.team.create({
    data: {
      name: "The Consultants",
      college: "MDI Gurgaon",
      maxMembers: 4,
      lookingFor: JSON.stringify(["Lead"]),
      caseId: caseRecords["c9"],
    },
  });

  const teamMembers = [
    { userId: arjunId, teamId: team1.id, role: "Lead", status: "in-team" },
    { userId: userRecords["rohan.gupta@iimdelhi.ac.in"], teamId: team1.id, role: "Presenter", status: "in-team" },
    { userId: userRecords["priya.nair@fms.edu"], teamId: team1.id, role: "Analyst", status: "in-team" },
    { userId: userRecords["priya.nair@fms.edu"], teamId: team2.id, role: "Lead", status: "in-team" },
    { userId: userRecords["meera.krishnan@fms.edu"], teamId: team2.id, role: "Researcher", status: "in-team" },
    { userId: userRecords["vikram.singh@mdi.ac.in"], teamId: team3.id, role: "Analyst", status: "in-team" },
    { userId: userRecords["vikram.singh@mdi.ac.in"], teamId: null, role: "Lead", status: "available" },
    { userId: userRecords["sneha.reddy@xlri.ac.in"], teamId: null, role: "Researcher", status: "available" },
    { userId: userRecords["karthik.menon@iimdelhi.ac.in"], teamId: null, role: "Researcher", status: "available" },
    { userId: userRecords["ananya.joshi@iift.edu"], teamId: null, role: "Analyst", status: "in-team" },
    { userId: userRecords["rohan.gupta@iimdelhi.ac.in"], teamId: null, role: "Presenter", status: "available" },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.create({ data: member });
  }

  const collegeUsers = await prisma.user.findMany({
    where: { college: { in: ["IIM Delhi", "FMS Delhi", "MDI Gurgaon", "IIFT Delhi"] } },
    orderBy: { points: "desc" },
  });

  for (let i = 0; i < collegeUsers.length; i++) {
    const u = collegeUsers[i];
    const badgeCount = await prisma.userBadge.count({ where: { userId: u.id } });
    await prisma.leaderboardSnapshot.create({
      data: {
        scope: "college",
        rank: i + 1,
        userName: u.name,
        college: u.college,
        points: u.points,
        casesCompleted: u.casesCompleted,
        streak: u.streak,
        badges: badgeCount,
        userId: u.id,
      },
    });
  }

  const nationalUsers = await prisma.user.findMany({
    where: { points: { gt: 0 } },
    orderBy: { points: "desc" },
    take: 10,
  });

  for (let i = 0; i < nationalUsers.length; i++) {
    const u = nationalUsers[i];
    const badgeCount = await prisma.userBadge.count({ where: { userId: u.id } });
    await prisma.leaderboardSnapshot.create({
      data: {
        scope: "national",
        rank: i + 1,
        userName: u.name,
        college: u.college,
        points: u.points,
        casesCompleted: u.casesCompleted,
        streak: u.streak,
        badges: badgeCount,
        userId: u.id,
      },
    });
  }

  const lime = await prisma.competition.findUnique({ where: { slug: "hul-lime-2026" } });
  const fms = await prisma.competition.findUnique({ where: { slug: "fms-case-wars-2026" } });
  if (lime) {
    await prisma.competitionRegistration.create({
      data: { userId: arjunId, competitionId: lime.id },
    });
  }
  if (fms) {
    await prisma.competitionRegistration.create({
      data: { userId: arjunId, competitionId: fms.id },
    });
  }

  console.log(`Seeded ${cases.length} cases, ${competitions.length} competitions, ${users.length} users`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });