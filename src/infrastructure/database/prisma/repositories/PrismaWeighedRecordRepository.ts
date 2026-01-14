import { PrismaClient } from "@prisma/client";
import { WeightRecordMapper } from "../mappers/WeightRecordMapper";
import { IWeighedRecordRepository } from "@core/domain/interfaces/IWeighedRecordRepository";
import { WeightRecord } from "@core/domain/entities/WeightRecord";

export class PrismaWeighedRecordRepository implements IWeighedRecordRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async save(record: WeightRecord): Promise<void> {
        const data = WeightRecordMapper.toPersistence(record);

        // Upsert: Nếu có ID thì update, chưa có thì create
        await this.prisma.weightRecord.upsert({
            where: { weightId: record.id },
            update: data,
            create: data,
        });
    }
}