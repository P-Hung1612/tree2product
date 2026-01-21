import { Entity } from "@core/shared/Entity";
import { AppError } from "@core/shared/AppError";

// Định nghĩa Props (Dữ liệu thô)
export interface ChemicalEntryProps {
    chemicalId: string;
    amount: number;
    tankId: string;
    processInstanceId: string;
    addedBy: string;
    addedAt: Date;
}

export class ChemicalEntry extends Entity<ChemicalEntryProps> {
    //Tạo mới một ChemicalEntry theo chuẩn business
    public static create(props: ChemicalEntryProps, id?: string): ChemicalEntry {
        // Validate logic nghiệp vụ ngay khi tạo
        if (props.amount <= 0) {
            throw new AppError('Amount must be positive', 400);
        }
        if (!props.tankId) {
            throw new AppError('ChemicalEntry must have a tankId', 400);
        }
        if (!props.chemicalId) {
            throw new AppError('ChemicalEntry must have a chemicalId', 400);
        }
        if (!props.processInstanceId) {
            throw new AppError('ChemicalEntry must be associated with a processInstanceId', 400);
        }
        const entryProps = {
            ...props,
            addedAt: props.addedAt || new Date()
        };

        return new ChemicalEntry(entryProps, id);
    }

    // Getters
    get chemicalId(): string {
        return this.props.chemicalId;
    }

    get amount(): number {
        return this.props.amount;
    }

    get tankId(): string {
        return this.props.tankId;
    }

    get processInstanceId(): string {
        return this.props.processInstanceId;
    }

    get addedBy(): string {
        return this.props.addedBy;
    }

    get addedAt(): Date {
        return this.props.addedAt;
    }

    // Business Logic Methods can be added here as needed
}