import { ITraceLinkRepository } from "@core/domain/interfaces/ITraceLinkRepository";
import { IMaterialEntryRepository } from "@core/domain/interfaces/IMaterialEntryRepository";
import { ITankRepository } from "@core/domain/interfaces/ITankRepository";
import { IVehicleLoadRepository } from "@core/domain/interfaces/IVehicleLoadRepository";
import { ReceiveLoadToTankDTO } from "@application/dtos/ReceiveLoadToTankDTO";
// import { Tank } from "@core/domain/entities/Tank";
import { MaterialEntry } from "@core/domain/entities/MaterialEntry";
import { TraceLink } from "@core/domain/entities/TraceLink";
import { AppError } from "@core/shared/AppError";

export class ReceiveLoadToTankUseCase {
    constructor(
        private traceLinkRepo: ITraceLinkRepository,
        private tankRepo: ITankRepository,
        private materialEntryRepo: IMaterialEntryRepository,
        private vehicleLoadRepo: IVehicleLoadRepository,
        
    ) { }
    public async execute(dto: ReceiveLoadToTankDTO): Promise<MaterialEntry> {
        //Load DATA
        const load = await this.vehicleLoadRepo.findById(dto.loadId);
        const tank = await this.tankRepo.findByTankId(dto.tankId);

        //Validation 
        if (!load) throw new AppError('Vehicle load not found', 404);
        if (!tank) throw new AppError('Tank not found', 404);
        

        //Kiểm tra nghiệp vụ
        //Kiểm tra tình trạng hàng trên xe
        if (load.status === "ARRIVED") {
            throw new AppError('This load has already unloaded!', 400);
        }
        //Kiểm tra tình trạng tank
        if (tank.status !== "AVAILABLE" && tank.status !== "ACCUMULATING") {
            throw new AppError('Tank not ready to receive load', 400);
        }
        //Kiểm tra sức chứa
        if (!tank.canReceive(dto.weight)) {
            throw new AppError('Tank overflow', 400);
        }
        //Cộng dồn mủ
        tank.accumulateLatex(dto.weight);
        //Tạo phiếu Material Entry
        const materialEntry = MaterialEntry.create({
            tankId: dto.tankId,
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
        await this.tankRepo.save(tank);
        await this.traceLinkRepo.save(traceLink);
        await this.vehicleLoadRepo.save(load);

        return materialEntry;
    }
}