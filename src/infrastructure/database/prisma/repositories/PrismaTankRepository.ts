import { PrismaClient } from '@prisma/client';
import { ITankRepository } from '@core/domain/interfaces/ITankRepository';
import { Tank } from '@core/domain/entities/Tank';
import { TankMapper } from '../mappers/TankMapper';

export class PrismaTankRepository implements ITankRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async save(tank: Tank): Promise<void> {
        const data = TankMapper.toPersistence(tank);

        // Upsert: Nếu có ID thì update, chưa có thì create
        await this.prisma.tank.upsert({
            where: { tankId: tank.id },
            update: data,
            create: data,
        });
    }

    async findByTankCode(tankCode: string): Promise<Tank | null> {
        const raw = await this.prisma.tank.findUnique({
            where: { tankCode: tankCode },
        });

        if (!raw) return null;

        return TankMapper.toDomain(raw);
    }

    async exists(tankCode: string): Promise<boolean> {
        const count = await this.prisma.tank.count({
            where: { tankCode: tankCode },
        });
        return count > 0;
    }
    
    async findByTankId(tankId: string): Promise<Tank | null> {
        const raw = await this.prisma.tank.findUnique({
            where: { tankId: tankId }
        });
        if (!raw) return null;
        return TankMapper.toDomain(raw);
    }
}