import { Entity } from "@core/shared/Entity";
import { AppError } from "@core/shared/AppError";

export interface MaterialEntryProps {
    tankId?: string,
    yardId?: string,
    receivedAt: Date,
    receivedBy: string,
    netWeight: number
}
export class MaterialEntry extends Entity<MaterialEntryProps> {
    public static create(props: MaterialEntryProps, latexType: string, id?: string): MaterialEntry {
        //Validate logic nghiệp vụ ngay khi tạo
        if (props.netWeight <= 0) {
            throw new AppError('Netweight must be positive', 400);
        }
        //Phân loại đích đến theo loại latex
        if (latexType === 'NUOC') {
            if (!props.tankId) {
                throw new AppError(`Latex ${latexType} phải có đích đến là Tank`, 400);
            }
            if (props.yardId) {
                throw new AppError(`Latex ${latexType} không được có đích đến là Yard`, 400);
            }
        } else {
            if (!props.yardId) {
                throw new AppError(`Latex ${latexType} phải có đích đến là Yard`, 400);
            }
            if (props.tankId) {
                throw new AppError(`Latex ${latexType} không được có đích đến là Tank`, 400);
            }
        }
        //Phải có đích đến
        const hasDestination = props.yardId || props.tankId;
        if (!hasDestination) {
            throw new AppError('Phải có đích đến (Tank, Yard)', 400);
        }
        const entryProps = {
            ...props,
            receivedAt: props.receivedAt || new Date()
        }
        return new MaterialEntry(entryProps, id);
    }

    //Getters
    get tankId() { return this.props.tankId; }
    get yardId() { return this.props.yardId; }
    get receivedAt() { return this.props.receivedAt; }
    get receivedBy() { return this.props.receivedBy; }
    get netWeight() { return this.props.netWeight; }

}