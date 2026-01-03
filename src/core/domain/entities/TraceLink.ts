// src/core/domain/entities/TraceLink.ts
import { Entity } from '../../shared/Entity';
import { AppError } from '../../shared/AppError';

// Định nghĩa Props (Dữ liệu thô)
export interface TraceLinkProps {
    fromEntityType: string; // Loại thực thể nguồn (ví dụ: "Worker", "Shift", "TappingArea")
    fromEntityId: string;   // ID của thực thể nguồn
    toEntityType: string;   // Loại thực thể đích (ví dụ: "Product", "Batch")
    toEntityId: string;     // ID của thực thể đích
    createdAt: Date;        // Ngày tạo
}

export class TraceLink extends Entity<TraceLinkProps> {
    // Factory method: Cách tạo mới một TraceLink chuẩn business
    public static create(props: TraceLinkProps, id?: string): TraceLink {

        // Validate: fromEntityId và toEntityId không được rỗng
        if (id !== undefined && id.trim() === '') {
            throw new AppError('ID cannot be an empty string');
        }//có thừa không nhỉ?

        if (!props.fromEntityId || !props.toEntityId) {
            throw new AppError('fromEntityId and toEntityId are required');
        }

        //Validate: không được link với chính nó
        if (
            props.fromEntityType === props.toEntityType &&
            props.fromEntityId === props.toEntityId
        ) {
            throw new AppError('Cannot link an entity to itself');
        }

        return new TraceLink(props, id);
    }

    // Getters
    get fromEntityType() { return this.props.fromEntityType; }
    get fromEntityId() { return this.props.fromEntityId; }
    get toEntityType() { return this.props.toEntityType; }
    get toEntityId() { return this.props.toEntityId; }
    get createdAt() { return this.props.createdAt; }

    // Business Logic Methods (Domain Service sẽ gọi cái này)
    public linkEntities() {
        // Logic để liên kết các thực thể
        // Ví dụ: Ghi log, gửi sự kiện, v.v.
    }
}