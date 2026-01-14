import { Entity } from "@core/shared/Entity";
import { AppError } from "@core/shared/AppError";

//Định nghĩa Props
export interface VehicleLoadProps {
    vehicleId: string; //ID xe
    compartmentCode: string; //ID ngăn xe
    latexType: string; //Loại mủ
    status: string //CREATED, IN_TRANSIT, ARRIVED
    loadedAt: Date; //Thời gian tải
    loadedBy: string; //Người tải
}

export class VehicleLoad extends Entity<VehicleLoadProps> {
    private constructor(props: VehicleLoadProps, id?: string) {
        super(props, id);
    }

    //Phương thức khởi tạo 
    public static create(props: VehicleLoadProps, id?: string): VehicleLoad {
        //Kiểm tra cơ bản
        if (!props.vehicleId) {
            throw new AppError("VehicleLoad must have a vehicleId");
        }
        //Default status
        const status = props.status || "CREATED";
        return new VehicleLoad({ ...props, status }, id);
    }

    //Business logic: Chuyển trạng thái xe bắt đầu chạy
    public dispatch() {
        if (this.props.status !== "CREATED" && this.props.status !== "LOADED") {
            throw new AppError("Chỉ có thể xuất bến khi xe đang ở trạng thái CREATED hoặc LOADED");
        }
        this.props.status = "IN_TRANSIT";
    }

    //Getter cho các thuộc tính
    get vehicleId(): string {
        return this.props.vehicleId;
    }

    get compartmentCode(): string {
        return this.props.compartmentCode;
    }

    get latexType(): string {
        return this.props.latexType;
    }

    get status(): string {
        return this.props.status;
    }

    get loadedAt(): Date {
        return this.props.loadedAt;
    }

    get loadedBy(): string {
        return this.props.loadedBy;
    }
}   