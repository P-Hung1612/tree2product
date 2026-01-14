import { Vehicle as PrismaVehicle } from '@prisma/client'; // Type của Prisma
import { Vehicle } from '@core/domain/entities/Vehicle';   // Type của Domain

export class VehicleMapper {
    // Convert từ Prisma DB Model -> Domain Entity
    public static toDomain(raw: PrismaVehicle): Vehicle {
        return Vehicle.create(
            {
                plateNumber: raw.plateNumber,
                capacity: raw.capacity as any,
            },
            raw.vehicleId // Map ID của DB vào ID của Entity
        );
    }

    // Convert từ Domain Entity -> Prisma DB Model (để save)
    public static toPersistence(entity: Vehicle): any {
        // Trả về object khớp với Prisma Input
        return {
            vehicleId: entity.id,
            plateNumber: entity.plateNumber,
            capacity: entity.capacity,
        };
    }
};