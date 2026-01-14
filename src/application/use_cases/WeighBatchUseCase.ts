import { IHarvestBatchRepository } from "@core/domain/interfaces/IHarvestBatchRepository";
import { IWeighedRecordRepository } from "@core/domain/interfaces/IWeighedRecordRepository";
import { WeighBatchDTO } from "../dtos/WeighBatchDTO";
import { WeightRecord } from "@core/domain/entities/WeightRecord";
import { AppError } from "@core/shared/AppError";

export class WeighBatchUseCase {
    constructor(
        private batchRepo: IHarvestBatchRepository,
        private weightRepo: IWeighedRecordRepository
    ) { }

    public async execute(request: WeighBatchDTO): Promise<WeightRecord> {
        // 1. Lấy Batch từ DB
        const batch = await this.batchRepo.findById(request.batchId);
        if (!batch) {
            throw new AppError('Harvest Batch not found', 404);
        }

        // 2. Domain Logic Check: Có được phép cân không?
        // Logic nằm trong Entity, UseCase chỉ việc gọi -> Code rất sạch/dễ đọc
        batch.markAsWeighed();

        // 3. Tạo Weight Record
        const weightRecord = WeightRecord.create({
            batchId: request.batchId,
            netWeight: request.netWeight,
            weighedBy: request.weighedBy,
            weighedAt: new Date()
        });

        // 4. Persistence (Lưu xuống DB)
        // TODO: Lý tưởng là dùng Transaction ở đây để đảm bảo cả 2 cùng thành công
        await this.weightRepo.save(weightRecord);
        await this.batchRepo.save(batch); // Save batch để cập nhật status mới
        return weightRecord;
    }
}