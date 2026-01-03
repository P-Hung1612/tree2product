-- CreateTable
CREATE TABLE "StateHistory" (
    "historyId" UUID NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" UUID NOT NULL,
    "fromState" TEXT NOT NULL,
    "toState" TEXT NOT NULL,
    "changedBy" UUID,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT,

    CONSTRAINT "StateHistory_pkey" PRIMARY KEY ("historyId")
);

-- AddForeignKey
ALTER TABLE "StateHistory" ADD CONSTRAINT "StateHistory_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "Worker"("workerId") ON DELETE SET NULL ON UPDATE CASCADE;
