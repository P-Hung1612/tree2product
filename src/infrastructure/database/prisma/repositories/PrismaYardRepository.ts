import { PrismaClient } from "@prisma/client";
import { IYardRepository } from "@core/domain/interfaces/IYardRepository";
import { Yard } from "@core/domain/entities/Yard";
import { YardMapper } from "../mappers/YardMapper";

export class PrismaYardRepository implements IYardRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async save(yard: Yard): Promise<void> {
        const data = YardMapper.toPersistence(yard);

        // Upsert: Nếu có ID thì update, chưa có thì create
        await this.prisma.yard.upsert({
            where: { yardId: yard.id },
            update: data,
            create: data,
        });
    }

    async findByYardCode(yardCode: string): Promise<Yard | null> {
        const raw = await this.prisma.yard.findUnique({
            where: { yardCode: yardCode },
        });

        if (!raw) return null;

        return YardMapper.toDomain(raw);
    }

    async exists(yardCode: string): Promise<boolean> {
        const count = await this.prisma.yard.count({
            where: { yardCode: yardCode },
        });
        return count > 0;
    }
    
    async findByYardId(yardId: string): Promise<Yard | null> {
        const raw = await this.prisma.yard.findUnique({
            where: { yardId: yardId }
        });
        if (!raw) return null;
        return YardMapper.toDomain(raw);
    }
}