/*
  Warnings:

  - You are about to drop the column `endTime` on the `Shift` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Shift` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shiftCode]` on the table `Shift` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Shift_workDate_shiftCode_key";

-- AlterTable
ALTER TABLE "Shift" DROP COLUMN "endTime",
DROP COLUMN "startTime";

-- CreateIndex
CREATE UNIQUE INDEX "Shift_shiftCode_key" ON "Shift"("shiftCode");
