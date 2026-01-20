/*
  Warnings:

  - The values [FERMENTING] on the enum `TankStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TankStatus_new" AS ENUM ('AVAILABLE', 'PLANNED', 'PROCESSING', 'MAINTENANCE');
ALTER TABLE "public"."Tank" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Tank" ALTER COLUMN "status" TYPE "TankStatus_new" USING ("status"::text::"TankStatus_new");
ALTER TYPE "TankStatus" RENAME TO "TankStatus_old";
ALTER TYPE "TankStatus_new" RENAME TO "TankStatus";
DROP TYPE "public"."TankStatus_old";
ALTER TABLE "Tank" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;
