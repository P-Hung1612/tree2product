import { Entity } from '../../shared/Entity';
import { AppError } from '../../shared/AppError';

//Định nghĩa Props
export interface TankProps {
    tankCode: string;
    latexType: string; //default("NUOC")
    capacity: number;
    currentLevel: number;
    status: string;
    currentBatchId?: string;
    currentProcessId?: string;
}

export class Tank extends Entity<TankProps> {
    //Tạo Tank theo chuẩn
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
    //Assign trạng thái tank
    public assignProcessInstance(processDefinitionId: string): void {
        this.props.status = 'PLANNED';
        this.props.currentProcessId = processDefinitionId;
    }
    //Kiểm tra tank có sẵn sàng để sử dụng
    public isAvailable(): boolean {
        return this.props.status === 'AVAILABLE';
    }
    //Getters
    get tankCode() { return this.props.tankCode; }
    get latexType() { return this.props.latexType; }
    get capacity() { return this.props.capacity; }
    get currentLevel() { return this.props.currentLevel; }
    get status() { return this.props.status; }
    get currentProcessId() { return this.props.currentProcessId; }
}
