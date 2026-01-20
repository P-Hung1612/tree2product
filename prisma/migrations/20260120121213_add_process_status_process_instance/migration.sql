/*
  Warnings:

  - The `status` column on the `ProcessInstance` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProcessStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "ProcessInstance" DROP COLUMN "status",
ADD COLUMN     "status" "ProcessStatus" NOT NULL DEFAULT 'PLANNED';
