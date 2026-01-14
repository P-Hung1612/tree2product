import { IHarvestBatchRepository } from "@core/domain/interfaces/IHarvestBatchRepository";
import { CreateHarvestBatchDTO } from "../dtos/CreateHarvestBatchDTO";
import { HarvestBatch } from "@core/domain/entities/HarvestBatch"; // Import Domain Entity

export class CreateHarvestBatchUseCase {
    constructor(private readonly harvestBatchRepo: IHarvestBatchRepository) { }
    public async execute(request: CreateHarvestBatchDTO): Promise<HarvestBatch> {
        // Validate input cơ bản (thủ công - đã chuyển sang dùng Zod ở DTO)
        // if (!['NUOC', 'DONG', 'DAY', 'CHEN'].includes(request.latexType)) {
        //     throw new AppError('Invalid latex type provided', 400);
        // }
        //Tạo domain entity HarvestBatch
        const batch = HarvestBatch.create({
            workerId: request.workerId,
            shiftId: request.shiftId,
            latexType: request.latexType,
            tappingAreaId: request.tappingAreaId || null,
            status: 'CREATED',//mặc định là CREATED
            createdAt: new Date(),
        });

        // Lưu vào repository
        await this.harvestBatchRepo.save(batch);

        return batch;
    }
}