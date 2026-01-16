/*
  Warnings:

  - Added the required column `netWeight` to the `MaterialEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MaterialEntry" ADD COLUMN     "netWeight" DOUBLE PRECISION NOT NULL;
