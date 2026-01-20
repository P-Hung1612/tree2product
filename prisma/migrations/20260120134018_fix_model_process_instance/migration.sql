/*
  Warnings:

  - Made the column `processId` on table `ProcessInstance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startedAt` on table `ProcessInstance` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ProcessInstance" DROP CONSTRAINT "ProcessInstance_processId_fkey";

-- AlterTable
ALTER TABLE "ProcessInstance" ALTER COLUMN "processId" SET NOT NULL,
ALTER COLUMN "startedAt" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ProcessInstance" ADD CONSTRAINT "ProcessInstance_processId_fkey" FOREIGN KEY ("processId") REFERENCES "ProcessDefinition"("processId") ON DELETE RESTRICT ON UPDATE CASCADE;
