import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { CreateTankUseCase } from '@application/use_cases/CreateTankUseCase';
import { CreateTankSchema } from '@application/dtos/CreateTankDTO';

export class CreateTankController extends BaseController {
  // Inject UseCase vào Controller
  constructor(private useCase: CreateTankUseCase) {
    super();
  }

  public async execute(req: Request, res: Response): Promise<any> {
    try {
      // 1. Validation Layer (Zod)
      // req.body từ Express là 'any', đưa vào Zod để lọc
      const validationResult = CreateTankSchema.safeParse(req.body);

      if (!validationResult.success) {
        // Nếu sai, trả về lỗi chuẩn hóa ngay lập tức
        return this.validationError(res, validationResult.error);
      }

      // 2. Application Layer (Use Case)
      
      const result = await this.useCase.execute(validationResult.data);

      // 3. Response
      return this.ok(res, { tankId: result.id }); // Chỉ trả về ID hoặc full object tùy trường hợp

    } catch (err: any) {
      // Bắt các lỗi AppError ném ra từ Domain
      return this.fail(res, err);
    }
  }
}