/*
  Warnings:

  - A unique constraint covering the columns `[workDate,shiftCode]` on the table `Shift` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endTime` to the `Shift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shift" ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shift_workDate_shiftCode_key" ON "Shift"("workDate", "shiftCode");
