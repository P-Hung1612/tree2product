import { Tank } from "@core/domain/entities/Tank";

export interface ITankRepository {
    save(tank: Tank): Promise<void>;
    findByTankCode(tankCode: string): Promise<Tank | null>;
    exists(tankCode: string): Promise<boolean>;
    findByTankId(tankId: string): Promise<Tank | null>;
    // Thêm các method khác tùy nhu cầu nghiệp vụ, ví dụ:
    // findByLicensePlate(licensePlate: string): Promise<Tank | null>;
}