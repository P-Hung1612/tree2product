import { ChemicalEntry as PrismaChemicalEntry } from "@prisma/client";
import { ChemicalEntry } from "@core/domain/entities/ChemicalEntry";

export class ChemicalEntryMapper {
    //Prisma DB-> Domain Entity
    public static toDomain(raw: PrismaChemicalEntry): ChemicalEntry {
        return ChemicalEntry.create(
            {
                chemicalId: raw.chemicalId,
                amount: raw.amount,
                tankId: raw.tankId,
                processInstanceId: raw.processInstanceId,
                addedBy: raw.addedBy,
                addedAt: raw.addedAt,

            },
            raw.entryId
        )
    }
    //Domain Entity -> Prisma DB (save)
    public static toPersistence(entity: ChemicalEntry): any {
        return {
            entryId: entity.id,
            chemicalId: entity.chemicalId,
            amount: entity.amount,
            tankId: entity.tankId,
            processInstanceId: entity.processInstanceId,
            addedBy: entity.addedBy,
            addedAt: entity.addedAt,
        }
    }
}