import { WeightRecord } from "../entities/WeightRecord";

export interface IWeighedRecordRepository {
    save(record: WeightRecord): Promise<void>;
    // Thêm các method khác tùy nhu cầu nghiệp vụ, ví dụ:
    // findByDateRange(startDate: Date, endDate: Date): Promise<WeightRecord[]>;
}