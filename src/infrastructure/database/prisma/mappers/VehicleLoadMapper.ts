import { VehicleLoad as SchemaVehicleLoad } from "@prisma/client";
import { VehicleLoad } from "@core/domain/entities/VehicleLoad";

export class VehicleLoadMapper {
    // Convert từ Prisma DB Model -> Domain Entity
    public static toDomain(raw: SchemaVehicleLoad): VehicleLoad {
        return VehicleLoad.create(
            {
                vehicleId: raw.vehicleId|| '',
                compartmentCode: raw.compartmentCode,
                latexType: raw.latexType,
                status: raw.status,
                loadedAt: raw.loadedAt|| new Date(),
                loadedBy: raw.loadedBy|| '',
            },
            raw.loadId // Map ID của DB vào ID của Entity
        );
    }

    // Convert từ Domain Entity -> Prisma DB Model (để save)
    public static toPersistence(entity: VehicleLoad): any {
        // Trả về object khớp với Prisma Input
        return {
            loadId: entity.id,
            vehicleId: entity.vehicleId,
            compartmentCode: entity.compartmentCode,
            latexType: entity.latexType,
            status: entity.status,
            loadedAt: entity.loadedAt,
            loadedBy: entity.loadedBy,
        };
    }
};
