/*
  Warnings:

  - You are about to drop the column `fermentId` on the `MaterialEntry` table. All the data in the column will be lost.
  - You are about to drop the `FermentationTank` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MaterialEntry" DROP CONSTRAINT "MaterialEntry_fermentId_fkey";

-- AlterTable
ALTER TABLE "MaterialEntry" DROP COLUMN "fermentId";

-- DropTable
DROP TABLE "FermentationTank";
