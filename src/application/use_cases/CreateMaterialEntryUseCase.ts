import { IMaterialEntryRepository } from "@core/domain/interfaces/IMaterialEntryRepository";
import { MaterialEntry } from "@core/domain/entities/MaterialEntry";
import { CreateMaterialEntryDTO } from "@application/dtos/CreateMaterialEntryDTO";

export class CreateMaterialEntryUseCase {
    constructor(private materialEntryRepo: IMaterialEntryRepository) { }
    public async execute(request: CreateMaterialEntryDTO): Promise<MaterialEntry> {
        //cả 3 không được đồng thời nullable.
        const newMaterialEntry = MaterialEntry.create({
            receivedBy: request.receivedBy,
            receivedAt: new Date(),
            netWeight: request.netWeight,
            tankId: request.tankId,
            yardId: request.yardId,
            fermentId: request.fermentId
        });
        await this.materialEntryRepo.save(newMaterialEntry);
        return newMaterialEntry;
    }
}