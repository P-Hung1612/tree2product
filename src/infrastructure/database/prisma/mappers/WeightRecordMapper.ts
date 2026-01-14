import { WeightRecord as PrismaWeightRecord } from "@prisma/client"; // Type của Prisma
import { WeightRecord } from "@core/domain/entities/WeightRecord";  // Type của Domain

export class WeightRecordMapper {
    // Convert từ Prisma DB Model -> Domain Entity
    public static toDomain(raw: PrismaWeightRecord): WeightRecord {
        return WeightRecord.create(
            {
                batchId: raw.batchId as any,
                netWeight: raw.netWeight.toNumber(),
                weighedBy: raw.weighedBy as any,
                weighedAt: raw.weighedAt,
            },
            raw.weightId // Map ID của DB vào ID của Entity
        );
    }

    // Convert từ Domain Entity -> Prisma DB Model (để save)
    public static toPersistence(entity: WeightRecord): any {
        // Trả về object khớp với Prisma Input
        return {
            weightId: entity.id,
            netWeight: entity.netWeight,
            weighedAt: entity.weighedAt,
            weighedBy: entity.weighedBy,
            batchId: entity.batchId,
        };
    }
}