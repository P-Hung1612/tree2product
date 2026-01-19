/*
  Warnings:

  - The values [READY_FOR_TRANSPORT] on the enum `BatchStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[currentBatchId]` on the table `Tank` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TankStatus" AS ENUM ('AVAILABLE', 'FERMENTING', 'PROCESSING', 'MAINTENANCE');

-- AlterEnum
BEGIN;
CREATE TYPE "BatchStatus_new" AS ENUM ('CREATED', 'WEIGHED', 'CONFIRMED', 'CONSUMED');
ALTER TABLE "public"."HarvestBatch" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "HarvestBatch" ALTER COLUMN "status" TYPE "BatchStatus_new" USING ("status"::text::"BatchStatus_new");
ALTER TYPE "BatchStatus" RENAME TO "BatchStatus_old";
ALTER TYPE "BatchStatus_new" RENAME TO "BatchStatus";
DROP TYPE "public"."BatchStatus_old";
ALTER TABLE "HarvestBatch" ALTER COLUMN "status" SET DEFAULT 'CREATED';
COMMIT;

-- AlterTable
ALTER TABLE "Tank" ADD COLUMN     "currentBatchId" TEXT,
ADD COLUMN     "status" "TankStatus" NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "Yard" ALTER COLUMN "latexType" DROP DEFAULT;

-- CreateTable
CREATE TABLE "ChemicalEntry" (
    "chemId" UUID NOT NULL,
    "tankId" UUID NOT NULL,
    "chemName" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "addedBy" UUID NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChemicalEntry_pkey" PRIMARY KEY ("chemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tank_currentBatchId_key" ON "Tank"("currentBatchId");

-- AddForeignKey
ALTER TABLE "ChemicalEntry" ADD CONSTRAINT "ChemicalEntry_tankId_fkey" FOREIGN KEY ("tankId") REFERENCES "Tank"("tankId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChemicalEntry" ADD CONSTRAINT "ChemicalEntry_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "Worker"("workerId") ON DELETE RESTRICT ON UPDATE CASCADE;
