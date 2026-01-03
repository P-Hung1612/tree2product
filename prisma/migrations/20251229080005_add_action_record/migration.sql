/*
  Warnings:

  - You are about to drop the column `action` on the `ActionRecord` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `ActionRecord` table. All the data in the column will be lost.
  - Added the required column `actionType` to the `ActionRecord` table without a default value. This is not possible if the table is not empty.
  - Made the column `performedBy` on table `ActionRecord` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ActionRecord" DROP CONSTRAINT "ActionRecord_performedBy_fkey";

-- AlterTable
ALTER TABLE "ActionRecord" DROP COLUMN "action",
DROP COLUMN "note",
ADD COLUMN     "actionType" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "metadata" JSONB,
ALTER COLUMN "performedBy" SET NOT NULL,
ALTER COLUMN "performedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "ActionRecord" ADD CONSTRAINT "ActionRecord_performedBy_fkey" FOREIGN KEY ("performedBy") REFERENCES "Worker"("workerId") ON DELETE RESTRICT ON UPDATE CASCADE;
