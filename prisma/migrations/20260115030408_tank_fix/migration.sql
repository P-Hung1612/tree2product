/*
  Warnings:

  - You are about to drop the column `type` on the `Tank` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tank" DROP COLUMN "type",
ADD COLUMN     "capacity" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "currentLevel" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "latexType" TEXT NOT NULL DEFAULT 'NUOC';
