/*
  Warnings:

  - A unique constraint covering the columns `[fromEntityId,toEntityId]` on the table `TraceLink` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TraceLink_fromEntityId_toEntityId_key" ON "TraceLink"("fromEntityId", "toEntityId");
