import {ProcessInstance as PrismaProcessInstance} from "@prisma/client";
import {ProcessInstance} from "@core/domain/entities/ProcessInstance";

export class ProcessInstanceMapper {
    // Convert từ Prisma DB Model -> Domain Entity
    public static toDomain(
        raw: PrismaProcessInstance
    ): ProcessInstance {
        return ProcessInstance.create(
            {
                processId: raw.processId,
                status: raw.status,
                startedAt: raw.startedAt,
                
            },
            raw.processInstanceId // Map ID của DB vào ID của Entity
        );
    }

    // Convert từ Domain Entity -> Prisma DB Model (để save)
    public static toPersistence(
        entity: ProcessInstance
    ): any {
        // Trả về object khớp với Prisma Input
        return {
            processInstanceId: entity.id,
            processId: entity.processId,
            status: entity.status,
            startedAt: entity.startedAt,
            
        };
    }
}   