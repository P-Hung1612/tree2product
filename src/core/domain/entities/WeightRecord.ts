import { Entity } from "@core/shared/Entity";
import { AppError } from "@core/shared/AppError";

// Định nghĩa Props (Dữ liệu thô)
export interface WeightRecordProps {
    batchId: string;      // ID của batch sản phẩm
    netWeight: number;         // Trọng lượng của sản phẩm (kg)
    weighedBy: string;      // wokerID
    weighedAt: Date;       // Ngày ghi nhận trọng lượng
}
export class WeightRecord extends Entity<WeightRecordProps> {
    private constructor(props: WeightRecordProps, id?: string) {
        super(props, id);
    }

    // Factory method để tạo một WeightRecord mới
    public static create(props: WeightRecordProps, id?: string): WeightRecord {
        // Kiểm tra tính hợp lệ của dữ liệu
        if (props.netWeight <= 0) {
            throw new AppError("Net weight must be greater than zero.");
        }
        if (!props.weighedBy || props.weighedBy.trim() === "") {
            throw new AppError("WeighedBy cannot be empty.");
        }
        if (props.weighedAt > new Date()) {
            throw new AppError("WeighedAt cannot be in the future.");
        }

        return new WeightRecord(props, id);
    }

    // Getter methods để truy cập các thuộc tính
    get batchId() { return this.props.batchId; }
    get netWeight() { return this.props.netWeight; }
    get weighedBy() { return this.props.weighedBy; }
    get weighedAt() { return this.props.weighedAt; }
}