import { prisma } from "@/lib/db";

const DEMO_USER_EMAIL = "arjun.patel@iimdelhi.ac.in";

export async function getCurrentUser() {
  return prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    include: {
      badges: {
        include: { badge: true },
        orderBy: { earnedAt: "asc" },
      },
      competitionRegs: {
        include: { competition: true },
      },
    },
  });
}

export async function getCurrentUserId(): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { id: true },
  });
  if (!user) throw new Error("Demo user not found. Run npm run db:seed");
  return user.id;
}