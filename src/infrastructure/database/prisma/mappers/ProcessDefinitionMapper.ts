import { ProcessDefinition as PrismaProcessDefinition } from "@prisma/client";
import { ProcessDefinition } from "@core/domain/entities/ProcessDefinition";

export class ProcessDefinitionMapper {
    // Convert từ Prisma DB Model -> Domain Entity
    public static toDomain(
        raw: PrismaProcessDefinition & { steps: any[] }
    ): ProcessDefinition {
        return ProcessDefinition.create(
            {
                productType: raw.productType,
                isActive: raw.isActive?? false,
                steps: raw.steps // Giả sử steps là một mảng đơn giản, có thể cần mapping thêm nếu phức tạp
            },
            raw.processId // Map ID của DB vào ID của Entity
        );
    }

    // Convert từ Domain Entity -> Prisma DB Model (để save)
    public static toPersistence(
        entity: ProcessDefinition
    ): any {
        // Trả về object khớp với Prisma Input
        return {
            processDefinitionId: entity.id,
            productType: entity.productType as any, // Cần ép kiểu về Prisma Enum
            isActive: entity.isActive
            // Chưa bao gồm steps, cần xử lý riêng nếu có
        };
    }
}