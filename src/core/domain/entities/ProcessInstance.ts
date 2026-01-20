import { Entity } from "@core/shared/Entity";
import { AppError } from "@core/shared/AppError";

//Định nghĩa Props
export interface ProcessInstanceProps {
    processId: string;
    startedAt: Date;
    endedAt?: Date;
    status: string;
}

export class ProcessInstance extends Entity<ProcessInstanceProps> {
    //Tạo ProcessInstance theo chuẩn
    public static create(props: ProcessInstanceProps, id?: string): ProcessInstance {
        //Validate logic nghiệp vụ ngay khi tạo
        if (props.startedAt > new Date()) {
            throw new AppError("startedAt cannot be in the future", 400);
        }
        return new ProcessInstance(props, id);
    }
    //methods nghiệp vụ (nếu có)

    //Getters
    get processId() { return this.props.processId; }
    get startedAt() { return this.props.startedAt; }
    get endedAt() { return this.props.endedAt; }
    get status() { return this.props.status; }
}  