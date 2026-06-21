import "dotenv/config";
import { buildCompetitionsFromUnstop } from "../prisma/build-competitions";
import { prisma } from "../src/lib/prisma";

async function main() {
  const competitions = await buildCompetitionsFromUnstop();
  const activeUnstopIds = competitions.map((comp) => comp.unstopId);

  const removed = await prisma.competition.deleteMany({
    where: { unstopId: { notIn: activeUnstopIds } },
  });
  if (removed.count > 0) {
    console.log(`Removed ${removed.count} stale competitions`);
  }

  for (const comp of competitions) {
    const { tags, ...rest } = comp;
    await prisma.competition.upsert({
      where: { unstopId: comp.unstopId },
      create: {
        ...rest,
        tags: JSON.stringify(tags),
      },
      update: {
        title: rest.title,
        description: rest.description,
        registrationOpensAt: rest.registrationOpensAt,
        registrationDeadline: rest.registrationDeadline,
        preliminaryDate: rest.preliminaryDate,
        eventDate: rest.eventDate,
        prizePool: rest.prizePool,
        registrationUrl: rest.registrationUrl,
        status: rest.status,
        tags: JSON.stringify(tags),
      },
    });
  }

  console.log(`Synced ${competitions.length} competitions from Unstop`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });