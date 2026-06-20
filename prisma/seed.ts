import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { cases, forumPosts } from "../src/lib/data";
import { competitionsSeed } from "./competitions-seed";

const competitions = competitionsSeed;


const users = [
  {
    email: "arjun.patel@fms.edu",
    name: "Arjun Patel",
    college: "FMS Delhi",
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
    email: "rohan.gupta@mdi.ac.in",
    name: "Rohan Gupta",
    college: "MDI Gurgaon",
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
    email: "karthik.menon@iift.edu",
    name: "Karthik Menon",
    college: "IIFT Delhi",
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
    email: "dr.priya.sharma@fms.edu",
    name: "Dr. Priya Sharma",
    college: "FMS Delhi",
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

  const arjunId = userRecords["arjun.patel@fms.edu"];
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
    "Dr. Priya Sharma": userRecords["dr.priya.sharma@fms.edu"],
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
      college: "FMS Delhi",
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
    { userId: userRecords["rohan.gupta@mdi.ac.in"], teamId: team1.id, role: "Presenter", status: "in-team" },
    { userId: userRecords["priya.nair@fms.edu"], teamId: team1.id, role: "Analyst", status: "in-team" },
    { userId: userRecords["priya.nair@fms.edu"], teamId: team2.id, role: "Lead", status: "in-team" },
    { userId: userRecords["meera.krishnan@fms.edu"], teamId: team2.id, role: "Researcher", status: "in-team" },
    { userId: userRecords["vikram.singh@mdi.ac.in"], teamId: team3.id, role: "Analyst", status: "in-team" },
    { userId: userRecords["vikram.singh@mdi.ac.in"], teamId: null, role: "Lead", status: "available" },
    { userId: userRecords["sneha.reddy@xlri.ac.in"], teamId: null, role: "Researcher", status: "available" },
    { userId: userRecords["karthik.menon@iift.edu"], teamId: null, role: "Researcher", status: "available" },
    { userId: userRecords["ananya.joshi@iift.edu"], teamId: null, role: "Analyst", status: "in-team" },
    { userId: userRecords["rohan.gupta@mdi.ac.in"], teamId: null, role: "Presenter", status: "available" },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.create({ data: member });
  }

  const collegeUsers = await prisma.user.findMany({
    where: { college: { in: ["FMS Delhi", "MDI Gurgaon", "IIFT Delhi"] } },
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
  const fms = await prisma.competition.findUnique({
    where: { slug: "fms-fiesta-conquest-2026" },
  });
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