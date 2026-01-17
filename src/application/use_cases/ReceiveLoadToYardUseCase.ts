import { AppError } from "@core/shared/AppError";
import {MaterialEntry} from "@core/domain/entities/MaterialEntry";
import { TraceLink } from "@core/domain/entities/TraceLink";
import {ReceiveLoadToYardDTO} from "@application/dtos/ReceiveLoadToYardDTO";
import { IVehicleLoadRepository } from "@core/domain/interfaces/IVehicleLoadRepository";
import { IYardRepository } from "@core/domain/interfaces/IYardRepository";
import { IMaterialEntryRepository } from "@core/domain/interfaces/IMaterialEntryRepository";
import { ITraceLinkRepository } from "@core/domain/interfaces/ITraceLinkRepository";

export class ReceiveLoadToYardUseCase {
    constructor(
        private traceLinkRepo: ITraceLinkRepository,
        private yardRepo: IYardRepository,
        private materialEntryRepo: IMaterialEntryRepository,
        private vehicleLoadRepo: IVehicleLoadRepository
    ) { }
    public async execute(dto: ReceiveLoadToYardDTO): Promise<MaterialEntry> {
        //Load DATA
        const load = await this.vehicleLoadRepo.findById(dto.loadId);
        const yard = await this.yardRepo.findByYardId(dto.yardId);

        //Validation 
        if (!load) throw new AppError('Vehicle load not found', 404);
        if (!yard) throw new AppError('Yard not found', 404);

        //Kiểm tra nghiệp vụ
        //Kiểm tra tình trạng hàng trên xe
        if (load.status === "ARRIVED") {
            throw new AppError('This load has already unloaded!', 400);
        }

        //Thực thi thay đổi trạng thái
        //Tạo phiếu Material Entry
        const materialEntry = MaterialEntry.create({
            yardId: dto.yardId,
            receivedBy: dto.workerId,
            netWeight: dto.weight,
            receivedAt: new Date(),
        }, load.latexType);

        //Update status cho xe
        load.unload();

        //Tạo trace link
        const traceLink = TraceLink.create({
            fromEntityId: load.id,
            fromEntityType: 'VehicleLoad',
            toEntityId: materialEntry.id,
            toEntityType: 'MaterialEntry',
            createdAt: new Date()
        });

        //Lưu DB
        await this.materialEntryRepo.save(materialEntry);
        await this.yardRepo.save(yard);
        await this.traceLinkRepo.save(traceLink);
        await this.vehicleLoadRepo.save(load);

        return materialEntry;
    }
}