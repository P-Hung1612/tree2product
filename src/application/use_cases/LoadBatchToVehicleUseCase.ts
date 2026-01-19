import { IHarvestBatchRepository } from "@core/domain/interfaces/IHarvestBatchRepository";
import { IVehicleLoadRepository } from "@core/domain/interfaces/IVehicleLoadRepository";
import { ITraceLinkRepository } from "@core/domain/interfaces/ITraceLinkRepository";
import { VehicleLoad } from "@core/domain/entities/VehicleLoad";
import { TraceLink } from "@core/domain/entities/TraceLink";
import { AppError } from "@core/shared/AppError";

export class LoadBatchToVehicleUseCase {
    constructor(
        private loadRepo: IVehicleLoadRepository,
        private batchRepo: IHarvestBatchRepository,
        private traceLinkRepo: ITraceLinkRepository
    ) { }

    public async execute(dto: any): Promise<VehicleLoad> {
        //kiểm tra batch
        const batch = await this.batchRepo.findById(dto.batchId);
        if (!batch) throw new AppError("Batch not found");
        if (batch.status !== 'CONFIRMED') {
            throw new AppError("Only CONFIRMED batches can be loaded. Current status: " + batch.status);
        }

        //tạo chuyến hàng
        const vehicleLoad = VehicleLoad.create({
            vehicleId: dto.vehicleId,
            compartmentCode: dto.compartmentCode,
            latexType: batch.latexType,
            status: 'CREATED',
            loadedAt: new Date(),
            loadedBy: '795fcdea-36ca-4de9-8ff4-c957ce466565'//TODO: lấy từ token user đăng nhập
        });

        //tạo trace link
        const link = TraceLink.create({
            fromEntityId: batch.id,
            fromEntityType: 'HarvestBatch',
            toEntityId: vehicleLoad.id,
            toEntityType: 'VehicleLoad',
            createdAt: new Date(),
        });
        // 4. Update trạng thái Batch
        batch.markAsConsumed();

        // 5. Lưu tất cả (Persistence)
        // Lưu ý: Ở đây ta đang gọi save rời rạc. 
        // Bài học sau tôi sẽ chỉ bạn dùng Transaction để gói 3 lệnh này lại.
        await this.loadRepo.save(vehicleLoad);
        await this.traceLinkRepo.save(link);
        await this.batchRepo.save(batch);
        return vehicleLoad;
    }
}