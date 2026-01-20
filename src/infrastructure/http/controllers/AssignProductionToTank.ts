import {Request, Response} from 'express';
import {BaseController} from './BaseController';
import {AssignProductionToTankUseCase} from '@application/use_cases/AssignProductionToTankUseCase';
import {AssignProductionToTankSchema} from '@application/dtos/AssignProductionToTankDTO';

export class AssignProductionToTankController extends BaseController {
    constructor(private useCase: AssignProductionToTankUseCase) {
        super();
    }

    public async execute(req: Request, res: Response): Promise<any> {
        try {
            // 1. Gộp dữ liệu
            const payload = {
                tankId: req.params['id'], // Lấy ID production từ URL
                ...req.body
            };

            // 2. Validate
            const result = AssignProductionToTankSchema.safeParse(payload);
            if (!result.success) {
                return this.validationError(res, result.error);
            }

            // 3. Gọi UseCase
            // Giả lập workerId nếu chưa có Auth (Sau này lấy từ req.user.id)
            const dto = {
                ...result.data,
                workerId: result.data.workerId || '00000000-0000-0000-0000-000000000000'
            };

            const assignment = await this.useCase.execute(dto);

            // 4. Trả về
            return this.ok(res, {
                message: "Gán sản phẩm vào bồn thành công",
                assignmentId: assignment.id
            });

        } catch (error: any) {
            return this.fail(res, error);
        }
    }
}   