// src/infrastructure/database/prisma/mappers/HarvestBatchMapper.ts
import { HarvestBatch as PrismaHarvestBatch } from '@prisma/client'; // Type của Prisma
import { HarvestBatch } from '@core/domain/entities/HarvestBatch';   // Type của Domain

export class HarvestBatchMapper {
    // Convert từ Prisma DB Model -> Domain Entity
    public static toDomain(raw: PrismaHarvestBatch): HarvestBatch {
        return HarvestBatch.create(
            {
                latexType: raw.latexType, // Prisma Enum tự map sang String
                status: raw.status,
                workerId: raw.workerId,
                shiftId: raw.shiftId,
                tappingAreaId: raw.tappingAreaId,
                createdAt: raw.createdAt,
                confirmedAt: raw.confirmedAt,
            },
            raw.batchId // Map ID của DB vào ID của Entity
        );
    }

    // Convert từ Domain Entity -> Prisma DB Model (để save)
    public static toPersistence(entity: HarvestBatch): any {
        // Trả về object khớp với Prisma Input
        return {
            batchId: entity.id,
            latexType: entity.latexType as any, // Cần ép kiểu về Prisma Enum
            status: entity.status as any,
            workerId: entity.workerId,
            shiftId: entity.shiftId,
            tappingAreaId: entity.tappingAreaId,
            createdAt: entity.createdAt,
            confirmedAt: entity.confirmedAt,
        };
    }
}