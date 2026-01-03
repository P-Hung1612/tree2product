import { PrismaClient } from "@prisma/client"; // Import Prisma Client
import { ITraceLinkRepository } from "@core/domain/interfaces/ITraceLinkRepository"; // Import Interface Repository
import { TraceLink } from "@core/domain/entities/TraceLink"; // Import Domain Entity
import { TraceLinkMapper } from "../mappers/TraceLinkMapper"; // Import Mapper

export class PrismaTraceLinkRepository implements ITraceLinkRepository {
    constructor(private readonly prisma: PrismaClient) { }

    // Lưu TraceLink vào DB
    async save(traceLink: TraceLink): Promise<void> {
        const data = TraceLinkMapper.toPersistence(traceLink);

        // Upsert: Nếu có ID thì update, chưa có thì create
        await this.prisma.traceLink.upsert({
            where: { traceId: traceLink.id },
            update: data,
            create: data,
        });
    }

    // Tìm TraceLink theo ID
    async findById(id: string): Promise<TraceLink | null> {
        const raw = await this.prisma.traceLink.findUnique({
            where: { traceId: id },
        });

        if (!raw) return null;

        return TraceLinkMapper.toDomain(raw);
    }
    //Tìm kiếm tất cả các trace dựa vào 1 entity cụ thể
    async findByFromEntity(entityType: string, entityId: string): Promise<TraceLink[]> {
        const raws = await this.prisma.traceLink.findMany({
            where: {
                OR: [
                    { fromEntityType: entityType, fromEntityId: entityId },
                    { toEntityType: entityType, toEntityId: entityId },
                ],
            },
        });

        return raws.map(TraceLinkMapper.toDomain);
    } 

    // Kiểm tra sự tồn tại của TraceLink theo ID
    async exists(id: string): Promise<boolean> {
        const count = await this.prisma.traceLink.count({
            where: { traceId: id },
        });
        return count > 0;
    }
}   