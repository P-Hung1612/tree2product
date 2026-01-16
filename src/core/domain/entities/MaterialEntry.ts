import { Entity } from "@core/shared/Entity";
import { AppError } from "@core/shared/AppError";

export interface MaterialEntryProps {
    tankId?: string,
    yardId?: string,
    fermentId?: string,
    receivedAt: Date,
    receivedBy: string,
    netWeight: number
}
export class MaterialEntry extends Entity<MaterialEntryProps> {
    public static create(props: MaterialEntryProps, id?: string): MaterialEntry {
        //Validate logic nghiệp vụ ngay khi tạo
        if (props.netWeight <= 0) {
            throw new AppError('Netweight must be positive', 400);
        }
        //Phải có đích đến
        const hasDestination = props.fermentId|| props.yardId|| props.tankId;
        if (!hasDestination) {
            throw new AppError ('Phải có đích đến (Tank, Yard, Ferment)', 400);
        }
        const entryProps = {
            ...props,
            receivedAt: props.receivedAt||new Date()
        }
        return new MaterialEntry(entryProps, id);
    }

    //Getters
    get tankId() { return this.props.tankId; }
    get yardId() { return this.props.yardId; }
    get fermentId() { return this.props.fermentId; }
    get receivedAt() { return this.props.receivedAt; }
    get receivedBy() { return this.props.receivedBy; }
    get netWeight() { return this.props.netWeight; }

}