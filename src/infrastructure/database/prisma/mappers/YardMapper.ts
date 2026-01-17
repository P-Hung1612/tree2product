import { Yard as PrismaYard } from '@prisma/client';
import { Yard } from '@core/domain/entities/Yard';

export class YardMapper {
    // Convert từ Prisma DB Model -> Domain Entity
    public static toDomain(raw: PrismaYard): Yard {
        return Yard.create(
            {
                yardCode: raw.yardCode,
                location: raw.location,
                latexType: raw.latexType
            },
            raw.yardId // Map ID của DB vào ID của Entity
        );
    }

    // Convert từ Domain Entity -> Prisma DB Model (để save)
    public static toPersistence(entity: Yard): any {
        // Trả về object khớp với Prisma Input
        return {
            yardId: entity.id,
            yardCode: entity.yardCode,
            location: entity.location,
            latexType: entity.latexType as any 
        };
    }
}