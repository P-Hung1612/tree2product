// src/infrastructure/database/prisma/repositories/PrismaVehicleRepository.ts
import { PrismaClient } from '@prisma/client';
import { IVehicleRepository } from '@core/domain/interfaces/IVehicleRepository';
import { Vehicle } from '@core/domain/entities/Vehicle';
import { VehicleMapper } from '../mappers/VehicleMapper';

export class PrismaVehicleRepository implements IVehicleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(vehicle: Vehicle): Promise<void> {
    const data = VehicleMapper.toPersistence(vehicle);

    // Upsert: Nếu có ID thì update, chưa có thì create
    await this.prisma.vehicle.upsert({
      where: { vehicleId: vehicle.id },
      update: data,
      create: data,
    });
  }

  async findByPlateNumber(plateNumber: string): Promise<Vehicle | null> {
    const raw = await this.prisma.vehicle.findUnique({
      where: { plateNumber },
    });

    if (!raw) return null;

    return VehicleMapper.toDomain(raw);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.vehicle.count({
      where: { vehicleId: id },
    });
    return count > 0;
  }
}