export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational; // True = lỗi logic biết trước, False = lỗi hệ thống crash
        Error.captureStackTrace(this, this.constructor);
    }
}