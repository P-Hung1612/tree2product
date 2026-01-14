// src/core/domain/interfaces/IVehicleLoadRepository.ts
import { VehicleLoad } from '../entities/VehicleLoad'; 

export interface IVehicleLoadRepository {
  save(load: VehicleLoad): Promise<void>;
  findById(id: string): Promise<VehicleLoad | null>;
  exists(id: string): Promise<boolean>;
  // Thêm các method khác tùy nhu cầu nghiệp vụ, ví dụ:
  // findByWorkerId(workerId: string): Promise<VehicleLoad[]>;
}