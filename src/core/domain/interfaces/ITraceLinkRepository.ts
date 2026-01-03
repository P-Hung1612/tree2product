// src/core/domain/interfaces/IHarvestBatchRepository.ts
import { TraceLink } from '../entities/TraceLink'; // Chúng ta sẽ tạo entity này ngay sau đây

export interface ITraceLinkRepository {
  save(traceLink: TraceLink): Promise<void>;
  findById(id: string): Promise<TraceLink | null>;
  exists(id: string): Promise<boolean>;
  // Thêm các method khác tùy nhu cầu nghiệp vụ, ví dụ:
  // findByWorkerId(workerId: string): Promise<TraceLink[]>;
}