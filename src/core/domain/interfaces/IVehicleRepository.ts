import { Vehicle } from "@core/domain/entities/Vehicle";

export interface IVehicleRepository {
    save(vehicle: Vehicle): Promise<void>;
    findByPlateNumber(plateNumber: string): Promise<Vehicle | null>;
    exists(plateNumber: string): Promise<boolean>;
    // Thêm các method khác tùy nhu cầu nghiệp vụ, ví dụ:
    // findByLicensePlate(licensePlate: string): Promise<Vehicle | null>;
}