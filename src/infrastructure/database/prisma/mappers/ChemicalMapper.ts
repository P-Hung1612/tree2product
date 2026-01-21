import { Chemical as PrismaChemical } from "@prisma/client";
import { Chemical } from "@core/domain/entities/Chemical";

export class ChemicalMapper {
    // Convert từ Prisma DB Model -> Domain Entity
    public static toDomain(raw: PrismaChemical): Chemical {
        return Chemical.create(
            {
                chemCode: raw.chemCode,
                chemName: raw.chemName,
                unit: raw.unit,
                pricePerUnit: raw.pricePerUnit,
            },
            raw.chemicalId // Map ID của DB vào ID của Entity
        );
    }

    // Convert từ Domain Entity -> Prisma DB Model (để save)
    public static toPersistence(entity: Chemical): any {
        // Trả về object khớp với Prisma Input
        return {
            chemicalId: entity.id,
            chemCode: entity.chemCode,
            chemName: entity.chemName,
            unit: entity.unit,
            pricePerUnit: entity.pricePerUnit,
        };
    }
}