import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { ReceiveLoadToYardUseCase } from "@application/use_cases/ReceiveLoadToYardUseCase";
import { ReceiveLoadToYardSchema } from "@application/dtos/ReceiveLoadToYardDTO";

export class ReceiveLoadToYardController extends BaseController {
    constructor(private useCase: ReceiveLoadToYardUseCase) {
        super();
    }

    public async execute(req: Request, res: Response): Promise<any> {
        try {
            // 1. Gộp dữ liệu
            const payload = {
                loadId: req.params['id'], // Lấy ID yard từ URL
                ...req.body
            };

            // 2. Validate
            const result = ReceiveLoadToYardSchema.safeParse(payload);
            if (!result.success) {
                return this.validationError(res, result.error);
            }

            // 3. Gọi UseCase
            // Giả lập workerId nếu chưa có Auth (Sau này lấy từ req.user.id)
            const dto = {
                ...result.data,
                workerId: result.data.workerId || '00000000-0000-0000-0000-000000000000'
            };

            const entry = await this.useCase.execute(dto);

            // 4. Trả về
            return this.ok(res, {
                message: "Nhập kho thành công",
                entryId: entry.id
            });

        } catch (error: any) {
            return this.fail(res, error);
        }
    }
}