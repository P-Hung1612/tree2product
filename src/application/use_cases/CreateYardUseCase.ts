import { IYardRepository } from "@core/domain/interfaces/IYardRepository";
import { Yard } from "@core/domain/entities/Yard";
import { CreateYardDTO } from "../dtos/CreateYardDTO";

//logic: check yardId có tồn tại chưa, nếu chưa thì tạo mới
export class CreateYardUseCase {
    constructor(private yardRepo: IYardRepository) { }

    public async execute(request: CreateYardDTO): Promise<Yard> {
        // Kiểm tra xem yard đã tồn tại chưa
        const existingYard = await this.yardRepo.findByYardCode(request.yardCode);
        if (existingYard) {
            throw new Error('Yard already exists');
        }

        // Tạo Yard mới
        const newYard = Yard.create({
            yardCode: request.yardCode,
            location: request.location,
            latexType: request.latexType
        });
        await this.yardRepo.save(newYard);
        return newYard;
    }
}