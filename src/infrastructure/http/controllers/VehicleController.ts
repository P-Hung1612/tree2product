import { BaseController } from "./BaseController";
import { Request, Response } from "express";
import { CreateVehicleUseCase } from "@application/use_cases/CreateVehicleUseCase";
import { CreateVehicleSchema } from "@application/dtos/CreateVehicleDTO";


export class CreateVehicleController extends BaseController {
    constructor(private useCase: CreateVehicleUseCase) {
        super();
    }
    public async execute(req: Request, res: Response): Promise<any> {
        try {
            // 1. Validation Layer (Zod)
            const payload = {
                batchId: req.params['id'],
                ...req.body
            };
            // req.body từ Express là 'any', đưa vào Zod để lọc
            const validationResult = CreateVehicleSchema.safeParse(payload);
            if (!validationResult.success) {
                // Nếu sai, trả về lỗi chuẩn hóa ngay lập tức
                return this.validationError(res, validationResult.error);
            }

            // 2. Application Layer (Use Case)
            // Lúc này validationResult.data đã sạch sẽ và đúng kiểu DTO
            const result = await this.useCase.execute(validationResult.data);

            // 3. Response
            return this.ok(res, { vehicleId: result.id }); // Chỉ trả về ID hoặc full object tùy nhu cầu

        } catch (err: any) {
            // Bắt các lỗi AppError ném ra từ Domain (ví dụ: Batch đã tồn tại...)
            return this.fail(res, err);
        }
    }
}