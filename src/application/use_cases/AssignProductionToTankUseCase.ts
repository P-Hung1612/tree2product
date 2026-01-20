import { ITankRepository } from "@core/domain/interfaces/ITankRepository";
import { IProcessDefinitionRepository } from "@core/domain/interfaces/IProcessDefinitionRepository";
import { IProcessInstanceRepository } from "@core/domain/interfaces/IProcessInstanceRepository";
import { AppError } from "@core/shared/AppError";
import { AssignProductionToTankDTO } from "../dtos/AssignProductionToTankDTO";
// import { ProcessDefinition } from "@core/domain/entities/ProcessDefinition";
import { ProcessInstance } from "@core/domain/entities/ProcessInstance";


export class AssignProductionToTankUseCase {
    constructor(
        private tankRepo: ITankRepository,
        private processDefRepo: IProcessDefinitionRepository,
        private processInsRepo: IProcessInstanceRepository,
    ) { }

    public async execute(dto: AssignProductionToTankDTO): Promise<ProcessInstance> {
        //Validate tank
        const tank = await this.tankRepo.findByTankId(dto.tankId);
        if (!tank || !tank.isAvailable() || tank.currentLevel <= 0) {
            throw new AppError('Tank không đủ điều kiện sản xuất', 404);
        }
        //Tìm quy trình mẫu
        const definition = await this.processDefRepo.findActiveByProductType(dto.productType);
        if (!definition) {
            throw new AppError('Không tìm thấy quy trình sản xuất phù hợp', 404);
        }
        //Create process instance
        const processInstance = ProcessInstance.create({
            processId: dto.processId,
            status:'PLANNED',
            startedAt: new Date(),
        });
        tank.assignProcessInstance(processInstance.id);
        //Lưu thay đổi
        await this.processInsRepo.save(processInstance);
        await this.tankRepo.save(tank);
        return processInstance;
    }
};