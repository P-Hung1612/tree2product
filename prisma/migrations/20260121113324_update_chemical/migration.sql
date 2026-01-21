/*
  Warnings:

  - Added the required column `pricePerUnit` to the `Chemical` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `Chemical` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chemical" ADD COLUMN     "pricePerUnit" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL;
