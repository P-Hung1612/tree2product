import { Entity } from '../../shared/Entity';
import { AppError } from '../../shared/AppError';

//Định nghĩa Props
export interface VehicleProps {
    plateNumber: string; //biển số xe(unique)
    capacity: number;//tải trọng tối đa
}

export class Vehicle extends Entity<VehicleProps> {
    //Factory method: Cách tạo mới một Vehicle chuẩn business
    public static create(props: VehicleProps, id?: string): Vehicle {
        //Validate logic nghiệp vụ ngay khi tạo
        if (!props.plateNumber) {
            throw new AppError('Plate Number is required', 400);
        }
        if (props.capacity <= 0) {
            throw new AppError('Capacity must be greater than zero', 400);
        }

        return new Vehicle(props, id);
    }

    //Getters
    get plateNumber() { return this.props.plateNumber; }
    get capacity() { return this.props.capacity; }
}