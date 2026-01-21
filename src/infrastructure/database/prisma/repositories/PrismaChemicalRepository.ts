import { IChemicalRepository } from "@core/domain/interfaces/IChemicalRepository";
import { Chemical } from "@core/domain/entities/Chemical";
import { ChemicalMapper } from "../mappers/ChemicalMapper";
import { PrismaClient } from "@prisma/client";

export class PrismaChemicalRepository implements IChemicalRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async save(chemical: Chemical): Promise<void> {
        const data = ChemicalMapper.toPersistence(chemical);

        // Upsert: Nếu có ID thì update, chưa có thì create
        await this.prisma.chemical.upsert({
            where: { chemicalId: chemical.id },
            update: data,
            create: data,
        });
    }

    async findByChemCode(chemCode: string): Promise<Chemical | null> {
        const raw = await this.prisma.chemical.findUnique({
            where: { chemCode: chemCode },
        });

        if (!raw) return null;

        return ChemicalMapper.toDomain(raw);
    }

    async exists(chemicalId: string): Promise<boolean> {
        const count = await this.prisma.chemical.count({
            where: { chemicalId: chemicalId },
        });
        return count > 0;
    }
    
    async findByChemicalId(chemicalId: string): Promise<Chemical | null> {
        const raw = await this.prisma.chemical.findUnique({
            where: { chemicalId: chemicalId }
        });
        if (!raw) return null;
        return ChemicalMapper.toDomain(raw);
    }
}