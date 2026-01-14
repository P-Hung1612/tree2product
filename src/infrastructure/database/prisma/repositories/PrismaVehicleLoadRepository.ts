// src/infrastructure/database/prisma/repositories/PrismaVehicleLoadRepository.ts
import { PrismaClient } from '@prisma/client';
import { IVehicleLoadRepository } from '@core/domain/interfaces/IVehicleLoadRepository';
import { VehicleLoad } from '@core/domain/entities/VehicleLoad';
import { VehicleLoadMapper } from '../mappers/VehicleLoadMapper';

export class PrismaVehicleLoadRepository implements IVehicleLoadRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(load: VehicleLoad): Promise<void> {
    const data = VehicleLoadMapper.toPersistence(load);

    // Upsert: Nếu có ID thì update, chưa có thì create
    await this.prisma.vehicleLoad.upsert({
      where: { loadId: load.id },
      update: data,
      create: data,
    });
  }

  async findById(id: string): Promise<VehicleLoad | null> {
    const raw = await this.prisma.vehicleLoad.findUnique({
      where: { loadId: id },
    });

    if (!raw) return null;

    return VehicleLoadMapper.toDomain(raw);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.vehicleLoad.count({
      where: { loadId: id },
    });
    return count > 0;
  }
}