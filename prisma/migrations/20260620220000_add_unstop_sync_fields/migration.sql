-- AlterTable
ALTER TABLE "Competition" ADD COLUMN "unstopId" INTEGER;
ALTER TABLE "Competition" ADD COLUMN "registrationOpensAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Competition_unstopId_key" ON "Competition"("unstopId");