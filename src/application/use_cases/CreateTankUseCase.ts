import { ITankRepository } from "@core/domain/interfaces/ITankRepository";
import { Tank } from "@core/domain/entities/Tank";
import { CreateTankDTO } from "../dtos/CreateTankDTO";

//logic: check tankId có tồn tại chưa, nếu chưa thì tạo mới

export class CreateTankUseCase {
    constructor(private tankRepo: ITankRepository) { }

    public async execute(request: CreateTankDTO): Promise<Tank> {
        // Kiểm tra xem tank đã tồn tại chưa
        const existingTank = await this.tankRepo.findByTankCode(request.tankCode);
        if (existingTank) {
            throw new Error('Tank already exists');
        }

        // Tạo Tank mới
        const newTank = Tank.create({
            tankCode: request.tankCode,
            capacity: request.capacity,
            latexType: request.latexType,
            currentLevel: request.currentLevel
        });
        await this.tankRepo.save(newTank);
        return newTank;
    }
}