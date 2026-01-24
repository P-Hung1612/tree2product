/*
  Warnings:

  - The values [PLANNED,MAINTENANCE] on the enum `TankStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "QcStage" AS ENUM ('VEHICLE_RECEIVING', 'RECEPTION_TANK', 'TRANSFER_TANK', 'FINISHED_TANK');

-- CreateEnum
CREATE TYPE "TreatmentDecision" AS ENUM ('APPROVED', 'ADJUST_IN_PLACE', 'PLAN_REQUIRED', 'MIX_WITH_OTHER', 'REPROCESS_VFA');

-- AlterEnum
BEGIN;
CREATE TYPE "TankStatus_new" AS ENUM ('AVAILABLE', 'ACCUMULATING', 'AWAITING_QC', 'PENDING_TREATMENT', 'FERMENTING', 'FILLING', 'CLOSED', 'TREATING', 'PENDING_DECISION', 'PENDING_MIX', 'READY_TO_STORE', 'STORED', 'REPROCESS');
ALTER TABLE "public"."Tank" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Tank" ALTER COLUMN "status" TYPE "TankStatus_new" USING ("status"::text::"TankStatus_new");
ALTER TYPE "TankStatus" RENAME TO "TankStatus_old";
ALTER TYPE "TankStatus_new" RENAME TO "TankStatus";
DROP TYPE "public"."TankStatus_old";
ALTER TABLE "Tank" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;

-- AlterTable
ALTER TABLE "QcRecord" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedBy" UUID,
ADD COLUMN     "decision" "TreatmentDecision",
ADD COLUMN     "decisionNote" TEXT,
ADD COLUMN     "testMetrics" JSONB;
