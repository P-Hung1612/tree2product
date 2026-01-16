import { Entity } from '../../shared/Entity';
import { AppError } from '../../shared/AppError';

//Định nghĩa Props
export interface TankProps {
    tankCode: string;
    latexType: string; //default("NUOC")
    capacity: number;
    currentLevel: number;
}

export class Tank extends Entity<TankProps> {
    //Factory method: Cách tạo mới một Vehicle chuẩn business
    public static create(props: TankProps, id?: string): Tank {
        //Validate logic nghiệp vụ ngay khi tạo
        if (props.capacity < 0) {
            throw new AppError('capacity must be greater 0', 400);
        }
        return new Tank(props, id);
    }
    //kiểm tra sức chứa
    public canReceive(amount: number): boolean {
        return (this.props.currentLevel + amount) <= this.props.capacity;
    }
    //tăng sức chứa
    public receive(weight: number): number {
        return this.props.currentLevel += weight;
    }

    //Getters
    get tankCode() { return this.props.tankCode; }
    get latexType() { return this.props.latexType; }
    get capacity() { return this.props.capacity; }
    get currentLevel() { return this.props.currentLevel; }
}