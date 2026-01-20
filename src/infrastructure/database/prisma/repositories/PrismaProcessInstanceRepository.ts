import { PrismaClient } from "@prisma/client";
import { IProcessInstanceRepository } from "@core/domain/interfaces/IProcessInstanceRepository";
import { ProcessInstance } from "@core/domain/entities/ProcessInstance";
import { ProcessInstanceMapper } from "../mappers/ProcessInstanceMapper";

export class PrismaProcessInstanceRepository implements IProcessInstanceRepository {
    constructor(private readonly prisma: PrismaClient) { }
    public async findById(processInstanceId: string): Promise<ProcessInstance | null> {
        const raw = await this.prisma.processInstance.findUnique({
            where: { processInstanceId }
        });
        return raw ? ProcessInstanceMapper.toDomain(raw) : null;
    }

    public async save(processInstance: ProcessInstance): Promise<void> {
        await this.prisma.processInstance.upsert({
            where: { processInstanceId: processInstance.id },
            update: ProcessInstanceMapper.toPersistence(processInstance),
            create: ProcessInstanceMapper.toPersistence(processInstance)
        });
    }

    public async exists(processInstanceId: string): Promise<boolean> {
        const count = await this.prisma.processInstance.count({
            where: { processInstanceId }
        });
        return count > 0;
    }
}