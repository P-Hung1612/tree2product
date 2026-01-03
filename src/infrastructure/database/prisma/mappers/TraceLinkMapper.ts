import { TraceLink as PrismaTraceLink } from "@prisma/client"; // Type của Prisma
import { TraceLink } from "@core/domain/entities/TraceLink"; // Type của Domain

export class TraceLinkMapper {
    // Convert từ Prisma DB Model -> Domain Entity
    public static toDomain(raw: PrismaTraceLink): TraceLink {
        return TraceLink.create(
            {
                fromEntityType: raw.fromEntityType,
                fromEntityId: raw.fromEntityId,
                toEntityType: raw.toEntityType,
                toEntityId: raw.toEntityId,
                createdAt: raw.createdAt,
            },
            raw.traceId // Map ID của DB vào ID của Entity
        );
    }

    // Convert từ Domain Entity -> Prisma DB Model (để save)
    public static toPersistence(entity: TraceLink): any {
        // Trả về object khớp với Prisma Input
        return {
            id: entity.id,
            fromEntityType: entity.fromEntityType,
            fromEntityId: entity.fromEntityId,
            toEntityType: entity.toEntityType,
            toEntityId: entity.toEntityId,
            createdAt: entity.createdAt,
        };
    }
}