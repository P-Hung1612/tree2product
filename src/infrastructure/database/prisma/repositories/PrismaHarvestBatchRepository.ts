// src/infrastructure/database/prisma/repositories/PrismaHarvestBatchRepository.ts
import { PrismaClient } from '@prisma/client';
import { IHarvestBatchRepository } from '@core/domain/interfaces/IHarvestBatchRepository';
import { HarvestBatch } from '@core/domain/entities/HarvestBatch';
import { HarvestBatchMapper } from '../mappers/HarvestBatchMapper';

export class PrismaHarvestBatchRepository implements IHarvestBatchRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(batch: HarvestBatch): Promise<void> {
    const data = HarvestBatchMapper.toPersistence(batch);

    // Upsert: Nếu có ID thì update, chưa có thì create
    await this.prisma.harvestBatch.upsert({
      where: { batchId: batch.id },
      update: data,
      create: data,
    });
  }

  async findById(id: string): Promise<HarvestBatch | null> {
    const raw = await this.prisma.harvestBatch.findUnique({
      where: { batchId: id },
    });

    if (!raw) return null;

    return HarvestBatchMapper.toDomain(raw);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.harvestBatch.count({
      where: { batchId: id },
    });
    return count > 0;
  }
}