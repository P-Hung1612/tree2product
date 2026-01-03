-- CreateEnum
CREATE TYPE "LatexType" AS ENUM ('NUOC', 'DONG', 'DAY', 'CHEN');

-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('CREATED', 'WEIGHED', 'CONFIRMED', 'READY_FOR_TRANSPORT', 'CONSUMED');

-- CreateEnum
CREATE TYPE "VehicleLoadStatus" AS ENUM ('CREATED', 'LOADED', 'IN_TRANSIT', 'ARRIVED');

-- CreateEnum
CREATE TYPE "QcResult" AS ENUM ('PASS', 'FAIL');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('CREATE', 'WEIGH', 'CONFIRM', 'APPROVE', 'REJECT', 'LOAD', 'DISPATCH', 'ARRIVE', 'START', 'COMPLETE');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('LY_TAM', 'SVR3L', 'SVRCV', 'RSS', 'SVR10');

-- CreateEnum
CREATE TYPE "ProcessStepStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'APPROVED');

-- CreateTable
CREATE TABLE "Worker" (
    "workerId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "employeeCode" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("workerId")
);

-- CreateTable
CREATE TABLE "Shift" (
    "shiftId" UUID NOT NULL,
    "workDate" DATE NOT NULL,
    "shiftCode" TEXT NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("shiftId")
);

-- CreateTable
CREATE TABLE "HarvestBatch" (
    "batchId" UUID NOT NULL,
    "workerId" UUID,
    "shiftId" UUID,
    "latexType" "LatexType" NOT NULL,
    "tappingAreaId" UUID,
    "status" "BatchStatus" NOT NULL DEFAULT 'CREATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3),

    CONSTRAINT "HarvestBatch_pkey" PRIMARY KEY ("batchId")
);

-- CreateTable
CREATE TABLE "WeightRecord" (
    "weightId" UUID NOT NULL,
    "batchId" UUID,
    "netWeight" DECIMAL(10,2) NOT NULL,
    "weighedBy" UUID,
    "weighedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeightRecord_pkey" PRIMARY KEY ("weightId")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "vehicleId" UUID NOT NULL,
    "plateNumber" TEXT NOT NULL,
    "capacity" DECIMAL(10,2),

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("vehicleId")
);

-- CreateTable
CREATE TABLE "VehicleLoad" (
    "loadId" UUID NOT NULL,
    "vehicleId" UUID,
    "compartmentCode" TEXT NOT NULL,
    "latexType" "LatexType" NOT NULL,
    "status" "VehicleLoadStatus" NOT NULL DEFAULT 'CREATED',
    "loadedAt" TIMESTAMP(3),
    "loadedBy" UUID,

    CONSTRAINT "VehicleLoad_pkey" PRIMARY KEY ("loadId")
);

-- CreateTable
CREATE TABLE "Tank" (
    "tankId" UUID NOT NULL,
    "tankCode" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Tank_pkey" PRIMARY KEY ("tankId")
);

-- CreateTable
CREATE TABLE "Yard" (
    "yardId" UUID NOT NULL,
    "yardCode" TEXT NOT NULL,
    "location" TEXT,

    CONSTRAINT "Yard_pkey" PRIMARY KEY ("yardId")
);

-- CreateTable
CREATE TABLE "FermentationTank" (
    "tankId" UUID NOT NULL,
    "tankCode" TEXT NOT NULL,
    "capacity" DECIMAL(10,2),

    CONSTRAINT "FermentationTank_pkey" PRIMARY KEY ("tankId")
);

-- CreateTable
CREATE TABLE "MaterialEntry" (
    "entryId" UUID NOT NULL,
    "receivedAt" TIMESTAMP(3),
    "receivedBy" UUID,
    "tankId" UUID,
    "yardId" UUID,
    "fermentId" UUID,

    CONSTRAINT "MaterialEntry_pkey" PRIMARY KEY ("entryId")
);

-- CreateTable
CREATE TABLE "Channel" (
    "channelId" UUID NOT NULL,
    "channelCode" TEXT NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("channelId")
);

-- CreateTable
CREATE TABLE "ChannelFlow" (
    "channelFlowId" UUID NOT NULL,
    "channelId" UUID,
    "flowedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChannelFlow_pkey" PRIMARY KEY ("channelFlowId")
);

-- CreateTable
CREATE TABLE "SheetRolling" (
    "rollingId" UUID NOT NULL,
    "rollingDate" DATE NOT NULL,
    "type" "ProductType" NOT NULL,

    CONSTRAINT "SheetRolling_pkey" PRIMARY KEY ("rollingId")
);

-- CreateTable
CREATE TABLE "GongStack" (
    "gongId" UUID NOT NULL,
    "gongNumber" TEXT NOT NULL,

    CONSTRAINT "GongStack_pkey" PRIMARY KEY ("gongId")
);

-- CreateTable
CREATE TABLE "Furnace" (
    "furnaceId" UUID NOT NULL,
    "furnaceCode" TEXT NOT NULL,

    CONSTRAINT "Furnace_pkey" PRIMARY KEY ("furnaceId")
);

-- CreateTable
CREATE TABLE "FurnaceRun" (
    "furnaceRunId" UUID NOT NULL,
    "furnaceId" UUID,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "FurnaceRun_pkey" PRIMARY KEY ("furnaceRunId")
);

-- CreateTable
CREATE TABLE "Container" (
    "containerId" UUID NOT NULL,
    "containerCode" TEXT NOT NULL,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("containerId")
);

-- CreateTable
CREATE TABLE "ContainerFill" (
    "fillId" UUID NOT NULL,
    "containerId" UUID,
    "filledAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContainerFill_pkey" PRIMARY KEY ("fillId")
);

-- CreateTable
CREATE TABLE "ProductLot" (
    "lotId" UUID NOT NULL,
    "productType" "ProductType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductLot_pkey" PRIMARY KEY ("lotId")
);

-- CreateTable
CREATE TABLE "Warehouse" (
    "warehouseId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("warehouseId")
);

-- CreateTable
CREATE TABLE "WarehouseLocation" (
    "locationId" UUID NOT NULL,
    "warehouseId" UUID,
    "code" TEXT NOT NULL,

    CONSTRAINT "WarehouseLocation_pkey" PRIMARY KEY ("locationId")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "inventoryId" UUID NOT NULL,
    "lotId" UUID,
    "locationId" UUID,
    "storedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("inventoryId")
);

-- CreateTable
CREATE TABLE "ProcessDefinition" (
    "processId" UUID NOT NULL,
    "productType" "ProductType" NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT true,

    CONSTRAINT "ProcessDefinition_pkey" PRIMARY KEY ("processId")
);

-- CreateTable
CREATE TABLE "ProcessStepDefinition" (
    "stepId" UUID NOT NULL,
    "processId" UUID,
    "stepOrder" INTEGER NOT NULL,
    "entityType" TEXT NOT NULL,
    "requiresApproval" BOOLEAN DEFAULT true,

    CONSTRAINT "ProcessStepDefinition_pkey" PRIMARY KEY ("stepId")
);

-- CreateTable
CREATE TABLE "ProcessInstance" (
    "processInstanceId" UUID NOT NULL,
    "processId" UUID,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "status" TEXT,

    CONSTRAINT "ProcessInstance_pkey" PRIMARY KEY ("processInstanceId")
);

-- CreateTable
CREATE TABLE "ProcessStepInstance" (
    "stepInstanceId" UUID NOT NULL,
    "processInstanceId" UUID,
    "stepId" UUID,
    "entityType" TEXT NOT NULL,
    "entityId" UUID NOT NULL,
    "status" "ProcessStepStatus" NOT NULL DEFAULT 'PENDING',
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "ProcessStepInstance_pkey" PRIMARY KEY ("stepInstanceId")
);

-- CreateTable
CREATE TABLE "QcRecord" (
    "qcId" UUID NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" UUID NOT NULL,
    "qcType" TEXT,
    "result" "QcResult" NOT NULL,
    "inspectedBy" UUID,
    "inspectedAt" TIMESTAMP(3) NOT NULL,
    "remark" TEXT,

    CONSTRAINT "QcRecord_pkey" PRIMARY KEY ("qcId")
);

-- CreateTable
CREATE TABLE "ActionRecord" (
    "actionId" UUID NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" UUID NOT NULL,
    "action" "ActionType" NOT NULL,
    "performedBy" UUID,
    "performedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT,

    CONSTRAINT "ActionRecord_pkey" PRIMARY KEY ("actionId")
);

-- CreateTable
CREATE TABLE "TraceLink" (
    "traceId" UUID NOT NULL,
    "fromEntityType" TEXT NOT NULL,
    "fromEntityId" UUID NOT NULL,
    "toEntityType" TEXT NOT NULL,
    "toEntityId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TraceLink_pkey" PRIMARY KEY ("traceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Worker_employeeCode_key" ON "Worker"("employeeCode");

-- CreateIndex
CREATE INDEX "HarvestBatch_status_idx" ON "HarvestBatch"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plateNumber_key" ON "Vehicle"("plateNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Tank_tankCode_key" ON "Tank"("tankCode");

-- CreateIndex
CREATE UNIQUE INDEX "Yard_yardCode_key" ON "Yard"("yardCode");

-- CreateIndex
CREATE UNIQUE INDEX "FermentationTank_tankCode_key" ON "FermentationTank"("tankCode");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_channelCode_key" ON "Channel"("channelCode");

-- CreateIndex
CREATE UNIQUE INDEX "Furnace_furnaceCode_key" ON "Furnace"("furnaceCode");

-- CreateIndex
CREATE UNIQUE INDEX "Container_containerCode_key" ON "Container"("containerCode");

-- CreateIndex
CREATE INDEX "idx_trace_from" ON "TraceLink"("fromEntityType", "fromEntityId");

-- CreateIndex
CREATE INDEX "idx_trace_to" ON "TraceLink"("toEntityType", "toEntityId");

-- AddForeignKey
ALTER TABLE "HarvestBatch" ADD CONSTRAINT "HarvestBatch_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("workerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HarvestBatch" ADD CONSTRAINT "HarvestBatch_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("shiftId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightRecord" ADD CONSTRAINT "WeightRecord_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "HarvestBatch"("batchId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightRecord" ADD CONSTRAINT "WeightRecord_weighedBy_fkey" FOREIGN KEY ("weighedBy") REFERENCES "Worker"("workerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleLoad" ADD CONSTRAINT "VehicleLoad_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("vehicleId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleLoad" ADD CONSTRAINT "VehicleLoad_loadedBy_fkey" FOREIGN KEY ("loadedBy") REFERENCES "Worker"("workerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialEntry" ADD CONSTRAINT "MaterialEntry_tankId_fkey" FOREIGN KEY ("tankId") REFERENCES "Tank"("tankId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialEntry" ADD CONSTRAINT "MaterialEntry_yardId_fkey" FOREIGN KEY ("yardId") REFERENCES "Yard"("yardId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialEntry" ADD CONSTRAINT "MaterialEntry_fermentId_fkey" FOREIGN KEY ("fermentId") REFERENCES "FermentationTank"("tankId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialEntry" ADD CONSTRAINT "MaterialEntry_receivedBy_fkey" FOREIGN KEY ("receivedBy") REFERENCES "Worker"("workerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelFlow" ADD CONSTRAINT "ChannelFlow_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("channelId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FurnaceRun" ADD CONSTRAINT "FurnaceRun_furnaceId_fkey" FOREIGN KEY ("furnaceId") REFERENCES "Furnace"("furnaceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContainerFill" ADD CONSTRAINT "ContainerFill_containerId_fkey" FOREIGN KEY ("containerId") REFERENCES "Container"("containerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseLocation" ADD CONSTRAINT "WarehouseLocation_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("warehouseId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "ProductLot"("lotId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "WarehouseLocation"("locationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessStepDefinition" ADD CONSTRAINT "ProcessStepDefinition_processId_fkey" FOREIGN KEY ("processId") REFERENCES "ProcessDefinition"("processId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessInstance" ADD CONSTRAINT "ProcessInstance_processId_fkey" FOREIGN KEY ("processId") REFERENCES "ProcessDefinition"("processId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessStepInstance" ADD CONSTRAINT "ProcessStepInstance_processInstanceId_fkey" FOREIGN KEY ("processInstanceId") REFERENCES "ProcessInstance"("processInstanceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessStepInstance" ADD CONSTRAINT "ProcessStepInstance_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "ProcessStepDefinition"("stepId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QcRecord" ADD CONSTRAINT "QcRecord_inspectedBy_fkey" FOREIGN KEY ("inspectedBy") REFERENCES "Worker"("workerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionRecord" ADD CONSTRAINT "ActionRecord_performedBy_fkey" FOREIGN KEY ("performedBy") REFERENCES "Worker"("workerId") ON DELETE SET NULL ON UPDATE CASCADE;
