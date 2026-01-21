import { PrismaClient } from "@prisma/client";
import { ChemicalEntry } from "@core/domain/entities/ChemicalEntry";
import { ChemicalEntryMapper } from "@infrastructure/database/prisma/mappers/ChemicalEntryMapper";
import { IChemicalEntryRepository } from "@core/domain/interfaces/IChemicalEntryRepository";

export class PrismaChemicalEntryRepository implements IChemicalEntryRepository {
    constructor(private readonly prisma: PrismaClient) { }
    async findById(id: string): Promise<ChemicalEntry | null> {
        const raw = await this.prisma.chemicalEntry.findUnique({
            where: { entryId: id }
        });
        if (!raw) return null;
        return ChemicalEntryMapper.toDomain(raw);
    }
    async save(chemicalEntry: ChemicalEntry): Promise<void> {
        const data = ChemicalEntryMapper.toPersistence(chemicalEntry);

        // Upsert: Có ID -> update, chưa -> create
        await this.prisma.chemicalEntry.upsert({
            where: { entryId: chemicalEntry.id },
            update: data,
            create: data,
        });
    }
}