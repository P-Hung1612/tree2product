/*
  Warnings:

  - The values [PROCESSING] on the enum `TankStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `currentBatchId` on the `Tank` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[currentProcessId]` on the table `Tank` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TankStatus_new" AS ENUM ('AVAILABLE', 'PLANNED', 'FERMENTING', 'MAINTENANCE');
ALTER TABLE "public"."Tank" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Tank" ALTER COLUMN "status" TYPE "TankStatus_new" USING ("status"::text::"TankStatus_new");
ALTER TYPE "TankStatus" RENAME TO "TankStatus_old";
ALTER TYPE "TankStatus_new" RENAME TO "TankStatus";
DROP TYPE "public"."TankStatus_old";
ALTER TABLE "Tank" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;

-- DropIndex
DROP INDEX "Tank_currentBatchId_key";

-- AlterTable
ALTER TABLE "Tank" DROP COLUMN "currentBatchId",
ADD COLUMN     "currentProcessId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "Tank_currentProcessId_key" ON "Tank"("currentProcessId");

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_currentProcessId_fkey" FOREIGN KEY ("currentProcessId") REFERENCES "ProcessInstance"("processInstanceId") ON DELETE SET NULL ON UPDATE CASCADE;
