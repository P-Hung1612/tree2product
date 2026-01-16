import { MaterialEntry as PrismaMaterialEntry } from "@prisma/client";
import { MaterialEntry } from "@core/domain/entities/MaterialEntry";

export class MaterialEntryMapper {
    //Prisma DB-> Domain Entity
    public static toDomain(raw: PrismaMaterialEntry): MaterialEntry {
        return MaterialEntry.create(
            {
                receivedAt: raw.receivedAt ?? new Date(),
                receivedBy: raw.receivedBy,
                netWeight: raw.netWeight,
                tankId: raw.tankId ?? "",
                yardId: raw.yardId ?? "",
                fermentId: raw.fermentId ?? ""
            },
            raw.entryId
        )
    }
    //Domain Entity -> Prisma DB (save)
    public static toPersistence(entity: MaterialEntry): any {
        return {
            entryId: entity.id,
            receivedAt: entity.receivedAt,
            receivedBy: entity.receivedBy,
            netWeight: entity.netWeight,
            tankId: entity.tankId,
            yardId: entity.yardId,
            fermentId: entity.fermentId
        }
    }
}