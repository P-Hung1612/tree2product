import { PrismaClient } from "@prisma/client";
import { IProcessDefinitionRepository } from "@core/domain/interfaces/IProcessDefinitionRepository";
import { ProcessDefinition } from "@core/domain/entities/ProcessDefinition";
import { ProcessDefinitionMapper } from "../mappers/ProcessDefinitionMapper";

export class PrismaProcessDefinitionRepository implements IProcessDefinitionRepository {
    constructor(private readonly prisma: PrismaClient) {}
    public async findActiveByProductType(type:string): Promise<ProcessDefinition|null> {
        const raw = await this.prisma.processDefinition.findFirst({
            where: {
                productType: type as any,
                isActive: true
            },
            include: {steps: true}
        });
        if (!raw) throw null;
        return ProcessDefinitionMapper.toDomain(raw);
    }
}
