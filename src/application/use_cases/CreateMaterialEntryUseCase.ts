import { IMaterialEntryRepository } from "@core/domain/interfaces/IMaterialEntryRepository";
import { MaterialEntry } from "@core/domain/entities/MaterialEntry";
import { CreateMaterialEntryDTO } from "@application/dtos/CreateMaterialEntryDTO";

export class CreateMaterialEntryUseCase {
    constructor(private materialEntryRepo: IMaterialEntryRepository) { }
    public async execute(request: CreateMaterialEntryDTO): Promise<MaterialEntry> {
        const newMaterialEntry = MaterialEntry.create({
            receivedBy: request.receivedBy,
            receivedAt: new Date(),
            netWeight: request.netWeight,
            tankId: request.tankId,
            yardId: request.yardId,

        }, request.latexType);
        await this.materialEntryRepo.save(newMaterialEntry);
        return newMaterialEntry;
    }
}