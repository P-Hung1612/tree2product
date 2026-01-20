import { Entity } from "@core/shared/Entity";
import { AppError } from "@core/shared/AppError";

//Định nghĩa Props
export interface ProcessDefinitionProps {
    productType: string;
    isActive: boolean;
    steps: string[]; //array of step IDs
}

export class ProcessDefinition extends Entity<ProcessDefinitionProps> {
    //Tạo ProcessDefinition theo chuẩn
    public static create(props: ProcessDefinitionProps, id?: string): ProcessDefinition {
        //Validate logic nghiệp vụ ngay khi tạo
        if (props.steps.length === 0) {
            throw new AppError("ProcessDefinition must have at least one step", 400);
        }
        return new ProcessDefinition(props, id);
    }
    //methods nghiệp vụ (nếu có)

    //Getters
    get productType() { return this.props.productType; }
    get isActive() { return this.props.isActive; }
    get steps() { return this.props.steps; }
}