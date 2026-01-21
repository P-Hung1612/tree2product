/*
  Warnings:

  - The primary key for the `ChemicalEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chemId` on the `ChemicalEntry` table. All the data in the column will be lost.
  - You are about to drop the column `chemName` on the `ChemicalEntry` table. All the data in the column will be lost.
  - Added the required column `chemicalId` to the `ChemicalEntry` table without a default value. This is not possible if the table is not empty.
  - The required column `entryId` was added to the `ChemicalEntry` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `processInstanceId` to the `ChemicalEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChemicalEntry" DROP CONSTRAINT "ChemicalEntry_pkey",
DROP COLUMN "chemId",
DROP COLUMN "chemName",
ADD COLUMN     "chemicalId" UUID NOT NULL,
ADD COLUMN     "entryId" UUID NOT NULL,
ADD COLUMN     "processInstanceId" UUID NOT NULL,
ADD CONSTRAINT "ChemicalEntry_pkey" PRIMARY KEY ("entryId");

-- CreateTable
CREATE TABLE "Chemical" (
    "chemicalId" UUID NOT NULL,
    "chemCode" TEXT NOT NULL,
    "chemName" TEXT NOT NULL,

    CONSTRAINT "Chemical_pkey" PRIMARY KEY ("chemicalId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chemical_chemCode_key" ON "Chemical"("chemCode");

-- AddForeignKey
ALTER TABLE "ChemicalEntry" ADD CONSTRAINT "ChemicalEntry_chemicalId_fkey" FOREIGN KEY ("chemicalId") REFERENCES "Chemical"("chemicalId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChemicalEntry" ADD CONSTRAINT "ChemicalEntry_processInstanceId_fkey" FOREIGN KEY ("processInstanceId") REFERENCES "ProcessInstance"("processInstanceId") ON DELETE RESTRICT ON UPDATE CASCADE;
