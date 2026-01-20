import { Tank as PrismaTank } from '@prisma/client'; // Type của Prisma
import { Tank } from '@core/domain/entities/Tank';   // Type của Domain

export class TankMapper {
    // Convert từ Prisma DB Model -> Domain Entity
    public static toDomain(raw: PrismaTank): Tank {
        return Tank.create(
            {
                tankCode: raw.tankCode,
                latexType: raw.latexType,
                capacity: raw.capacity,
                currentLevel: raw.currentLevel,
                status: raw.status,
                currentProcessId: raw.currentProcessId as string,
            },
            raw.tankId // Map ID của DB vào ID của Entity
        );
    }

    // Convert từ Domain Entity -> Prisma DB Model (để save)
    public static toPersistence(entity: Tank): any {
        // Trả về object khớp với Prisma Input
        return {
            tankId: entity.id,
            tankCode: entity.tankCode,
            latexType: entity.latexType as any, // Cần ép kiểu về Prisma Enum
            capacity: entity.capacity,
            currentLevel: entity.currentLevel,
            status: entity.status,
            currentProcessId: entity.currentProcessId as string,
        };
    }
}