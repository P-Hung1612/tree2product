import { Entity } from "@core/shared/Entity";
import { AppError } from "@core/shared/AppError";

// Định nghĩa Props (Dữ liệu thô)
export interface ChemicalProps {
    chemCode: string;
    chemName: string;
    unit: string;
    pricePerUnit: number;
}

export class Chemical extends Entity<ChemicalProps> {
    //Tạo mới một Chemical theo chuẩn business
    public static create(props: ChemicalProps, id?: string): Chemical {
        // Validate logic nghiệp vụ ngay khi tạo
        if (!props.chemCode) {
            throw new AppError('Chemical code is required', 400);
        }
        if (!props.chemName) {
            throw new AppError('Chemical name is required', 400);
        }
        if (!props.unit) {
            throw new AppError('Unit is required', 400);
        }
        if (props.pricePerUnit < 0) {
            throw new AppError('Price per unit must be a positive number', 400);
        }

        return new Chemical(props, id);
    }

    // Getters
    get chemCode(): string {
        return this.props.chemCode;
    }

    get chemName(): string {
        return this.props.chemName;
    }

    get unit(): string {
        return this.props.unit;
    }

    get pricePerUnit(): number {
        return this.props.pricePerUnit;
    }

    // Business Logic Methods can be added here as needed
}