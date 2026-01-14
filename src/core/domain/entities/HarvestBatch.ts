// src/core/domain/entities/HarvestBatch.ts
import { Entity } from '../../shared/Entity';
import { AppError } from '../../shared/AppError';

// Định nghĩa Props (Dữ liệu thô)
export interface HarvestBatchProps {
    latexType: string; // Tốt nhất nên là Enum của Domain
    status: string;
    workerId?: string | null;
    shiftId?: string | null;
    tappingAreaId?: string | null;
    createdAt: Date;
    confirmedAt?: Date | null;
}

export class HarvestBatch extends Entity<HarvestBatchProps> {
    // Factory method: Cách tạo mới một Batch chuẩn business
    public static create(props: HarvestBatchProps, id?: string): HarvestBatch {
        // Validate logic nghiệp vụ ngay khi tạo
        if (!props.latexType) {
            throw new AppError('Latex Type is required', 400);
        }

        // Set default status nếu chưa có
        const status = props.status || 'CREATED';

        return new HarvestBatch({ ...props, status }, id);
    }

    // Getters
    get status() { return this.props.status; }
    get latexType() { return this.props.latexType; }
    get workerId() { return this.props.workerId; }
    get shiftId() { return this.props.shiftId; }
    get tappingAreaId() { return this.props.tappingAreaId; }
    get createdAt() { return this.props.createdAt; }
    get confirmedAt() { return this.props.confirmedAt; }

    // Business Logic Methods (Domain Service sẽ gọi cái này)
    public confirm() {
        if (this.props.status === 'CONFIRMED') {
            throw new AppError('Batch is already confirmed');
        }

        if (this.props.status !== 'WEIGHED') {
            throw new AppError(
                `Chỉ có thể xác nhận lô hàng đã được cân. Trạng thái hiện tại: ${this.props.status}`,
                400);
        }
        
        this.props.status = 'CONFIRMED';
        this.props.confirmedAt = new Date();
    }

    //Kiểm tra trạng thái có thể cân hay không
    public canBeWeighed(): boolean {
        const allowedStates = ['CREATED', 'CONFIRMED', 'WEIGHED'];
        return allowedStates.includes(this.props.status);
    }
    
    //Method chuyển trạng thái
    public markAsWeighed() {
        if (!this.canBeWeighed()) {
            throw new AppError(`Không thể cân lô hàng đang ở trạng thái ${this.props.status}`);
        }
        this.props.status = 'WEIGHED';
    }

    //Method chuyển trạng thái
    public markAsReadyForTransport() {
        if (this.props.status !== 'CONFIRMED') {
            throw new AppError(`Chỉ có thể chuyển lô hàng sang trạng thái SẴN SÀNG VẬN CHUYỂN khi nó đang ở trạng thái CONFIRMED. Trạng thái hiện tại: ${this.props.status}`);
        }
        this.props.status = 'READY_FOR_TRANSPORT';
    }

}