/*
  Warnings:

  - Made the column `receivedBy` on table `MaterialEntry` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MaterialEntry" DROP CONSTRAINT "MaterialEntry_receivedBy_fkey";

-- AlterTable
ALTER TABLE "MaterialEntry" ALTER COLUMN "receivedBy" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "MaterialEntry" ADD CONSTRAINT "MaterialEntry_receivedBy_fkey" FOREIGN KEY ("receivedBy") REFERENCES "Worker"("workerId") ON DELETE RESTRICT ON UPDATE CASCADE;
