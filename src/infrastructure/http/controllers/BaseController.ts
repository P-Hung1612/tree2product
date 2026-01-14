import { Response } from 'express';

export abstract class BaseController {

    // Trả về 200 OK (Create thành công dùng 201)
    protected ok<T>(res: Response, dto?: T) {
        if (!!dto) {
            return res.status(200).json(dto);
        } else {
            return res.sendStatus(200);
        }
    }

    protected created(res: Response) {
        return res.sendStatus(201);
    }

    // Trả về 400 Bad Request (Lỗi do Client gửi sai)
    protected clientError(res: Response, message?: string) {
        return res.status(400).json({
            success: false,
            message: message || 'Bad Request'
        });
    }

    // Trả về 422 Unprocessable Entity (Lỗi Validation Zod)
    protected validationError(res: Response, error: any) {
        return res.status(422).json({
            success: false,
            type: 'ValidationError',
            details: error
        });
    }

    // Trả về 500 Internal Server Error (Lỗi hệ thống)
    protected fail(res: Response, error: Error | string) {
        console.log(error); // Log lại để debug
        return res.status(500).json({
            success: false,
            message: error.toString()
        });
    }
}