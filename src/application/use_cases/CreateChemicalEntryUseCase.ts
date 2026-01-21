import { IChemicalEntryRepository } from "@core/domain/interfaces/IChemicalEntryRepository";
import { ChemicalEntry } from "@core/domain/entities/ChemicalEntry";
import { CreateChemicalEntryDTO } from "@application/dtos/CreateChemicalEntryDTO";

export class CreateChemicalEntryUseCase {
    constructor(private chemicalEntryRepo: IChemicalEntryRepository) { }
    public async execute(request: CreateChemicalEntryDTO): Promise<ChemicalEntry> {
        const newChemicalEntry = ChemicalEntry.create({
            chemicalId: request.chemicalId,
            tankId: request.tankId,
            amount: request.amount,
            processInstanceId: request.processInstanceId,
            addedAt: new Date(),
            addedBy: request.addedBy,
        });
        await this.chemicalEntryRepo.save(newChemicalEntry);
        return newChemicalEntry;
    }
}