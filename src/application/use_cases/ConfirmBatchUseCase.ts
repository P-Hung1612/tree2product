import { IHarvestBatchRepository } from "@core/domain/interfaces/IHarvestBatchRepository";
import { AppError } from "@core/shared/AppError";
import {ConfirmBatchDTO } from "../dtos/ConfirmBatchDTO";
import { HarvestBatch } from "@core/domain/entities/HarvestBatch";

export class ConfirmBatchUseCase {
    constructor(
        private batchRepo: IHarvestBatchRepository,
    ) { }

    public async execute(request:ConfirmBatchDTO): Promise<HarvestBatch> {
        // 1. Lấy Batch từ DB
        const batch = await this.batchRepo.findById(request.batchId);
        if (!batch) {
            throw new AppError('Harvest Batch not found', 404);
        }

        // 2. Domain Logic Check: Có được phép xác nhận không?
        // Logic nằm trong Entity, UseCase chỉ việc gọi -> Code rất sạch/dễ đọc
        batch.confirm();

        // 4. Persistence (Lưu xuống DB)
        // TODO: Lý tưởng là dùng Transaction ở đây để đảm bảo cả 2 cùng thành công
        await this.batchRepo.save(batch); // Save batch để cập nhật status mới
        return batch;
    }
}