import { IChemicalRepository } from "@core/domain/interfaces/IChemicalRepository";
import { ITankRepository } from "@core/domain/interfaces/ITankRepository";
import { IProcessInstanceRepository } from "@core/domain/interfaces/IProcessInstanceRepository";
import { ChemicalEntry } from "@core/domain/entities/ChemicalEntry";
import { AppError } from "@core/shared/AppError";
import { AddChemicalToProcessDTO } from "@application/dtos/AddChemicalToProcessDTO";
import { IChemicalEntryRepository } from "@core/domain/interfaces/IChemicalEntryRepository";

export class AddChemicalToProcessUseCase {
    constructor(
        private chemicalRepo: IChemicalRepository,
        private tankRepo: ITankRepository,
        private processInstanceRepo: IProcessInstanceRepository,
        private chemicalEntryRepo: IChemicalEntryRepository,
    ) {}

    public async execute(dto: AddChemicalToProcessDTO): Promise<ChemicalEntry> {
        // Kiểm tra Tank
        const tank = await this.tankRepo.findByTankId(dto.tankId);
        if (!tank) {
            throw new AppError("Tank not found", 404);
        }
        if(!tank.currentProcessId) {
            throw new AppError("Tank is not in a process", 400);
        }
        // Kiểm tra Chemical
        const chemical = await this.chemicalRepo.findByChemicalId(dto.chemicalId);
        if (!chemical) {
            throw new AppError("Chemical not found", 404);
        }
        // Kiểm tra ProcessInstance
        const process = await this.processInstanceRepo.findById(tank.currentProcessId);
        if (!process) {
            throw new AppError("Process Instance not found", 404);
        }
        // Tạo Record ChemicalEntry
        const chemicalEntry = ChemicalEntry.create({
            chemicalId: dto.chemicalId,
            amount: dto.amount,
            tankId: dto.tankId,
            processInstanceId: process.id,
            addedBy: dto.workerId,
            addedAt: new Date(),
        });
        // Status Transition
        tank.startFermenting();
        process.startProcessing();
        // Lưu vào DB
        await this.chemicalEntryRepo.save(chemicalEntry);
        await this.tankRepo.save(tank);
        await this.processInstanceRepo.save(process);
        return chemicalEntry;
    }
}