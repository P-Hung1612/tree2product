import { PrismaClient } from "@prisma/client";
import { MaterialEntry } from "@core/domain/entities/MaterialEntry";
import { MaterialEntryMapper } from "@infrastructure/database/prisma/mappers/MaterialEntryMapper";
import { IMaterialEntryRepository } from "@core/domain/interfaces/IMaterialEntryRepository";

export class PrismaMaterialEntryRepository implements IMaterialEntryRepository {
    constructor(private readonly prisma: PrismaClient) { }
    async findById(id: string): Promise<MaterialEntry | null> {
        const raw = await this.prisma.materialEntry.findUnique({
            where: { entryId: id }
        });
        if (!raw) return null;
        return MaterialEntryMapper.toDomain(raw);
    }
    async save(materialEntry: MaterialEntry): Promise<void> {
        const data = MaterialEntryMapper.toPersistence(materialEntry);

        // Upsert: Có ID -> update, chưa -> create
        await this.prisma.materialEntry.upsert({
            where: { entryId: materialEntry.id },
            update: data,
            create: data,
        });
    }
}