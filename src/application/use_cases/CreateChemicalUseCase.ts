import { IChemicalRepository } from "@core/domain/interfaces/IChemicalRepository";
import { Chemical } from "@core/domain/entities/Chemical";
import { CreateChemicalDTO } from "../dtos/CreateChemicalDTO";

//logic: check chemicalId có tồn tại chưa, nếu chưa thì tạo mới

export class CreateChemicalUseCase {
    constructor(private chemRepo: IChemicalRepository) { }

    public async execute(request: CreateChemicalDTO): Promise<Chemical> {
        // Kiểm tra xem chemical đã tồn tại chưa
        const existingChemical = await this.chemRepo.findByChemCode(request.chemCode);
        if (existingChemical) {
            throw new Error('Chemical already exists');
        }

        // Tạo Chemical mới
        const newChemical = Chemical.create({
            chemCode: request.chemCode,
            chemName: request.chemName,
            unit: request.unit,
            pricePerUnit: request.pricePerUnit,
        });
        await this.chemRepo.save(newChemical);
        return newChemical;
    }
}