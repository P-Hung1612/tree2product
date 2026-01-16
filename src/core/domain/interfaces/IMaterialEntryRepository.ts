import { MaterialEntry } from '../entities/MaterialEntry'; 

export interface IMaterialEntryRepository {
  save(entry: MaterialEntry): Promise<void>;
  findById(id: string): Promise<MaterialEntry | null>;
  // exists(id: string): Promise<boolean>;
  // Thêm các method khác tùy nhu cầu nghiệp vụ, ví dụ:
  // findByWorkerId(workerId: string): Promise<MaterialEntry[]>;
}