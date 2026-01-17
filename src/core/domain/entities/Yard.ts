import { Entity } from "@core/shared/Entity";
import { AppError } from "@core/shared/AppError";

//Định nghĩa Props
export interface YardProps {
    yardCode: string;
    latexType: string; //(!NUOC)
    location?: string|null;
}

export class Yard extends Entity<YardProps> {
    //Tạo Yard theo chuẩn
    public static create(props: YardProps, id?: string): Yard {
        //Kiểm tra tính hợp lệ của dữ liệu
        if (!props.yardCode || props.yardCode.trim().length === 0) {
            throw new AppError('yardCode is required', 400);
        }
        if (props.latexType === "NUOC") {
            throw new AppError('latexType must not be NUOC', 400);
        }
        return new Yard(props, id);
    }
    //Getters
    get yardCode() { return this.props.yardCode; }
    get latexType() { return this.props.latexType; }
    get location() { return this.props.location; }
}