// src/core/domain/interfaces/IHarvestBatchRepository.ts
import { HarvestBatch } from '../entities/HarvestBatch'; 

export interface IHarvestBatchRepository {
  save(batch: HarvestBatch): Promise<void>;
  findById(id: string): Promise<HarvestBatch | null>;
  exists(id: string): Promise<boolean>;
  // Thêm các method khác tùy nhu cầu nghiệp vụ, ví dụ:
  // findByWorkerId(workerId: string): Promise<HarvestBatch[]>;
}