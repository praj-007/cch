import "dotenv/config";
import { buildCompetitionsFromUnstop } from "../prisma/build-competitions";
import { prisma } from "../src/lib/prisma";

async function main() {
  const competitions = await buildCompetitionsFromUnstop();

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