import { IVehicleRepository } from "@core/domain/interfaces/IVehicleRepository";
import { Vehicle } from "@core/domain/entities/Vehicle";
import { CreateVehicleDTO } from "../dtos/CreateVehicleDTO";

//logic: check biển số có tồn tại chưa, nếu chưa thì tạo mới

export class CreateVehicleUseCase {
    constructor(private vehicleRepo: IVehicleRepository) { }

    public async execute(request: CreateVehicleDTO): Promise<Vehicle> {
        // Kiểm tra xem biển số đã tồn tại chưa
        const existingVehicle = await this.vehicleRepo.findByPlateNumber(request.plateNumber);
        if (existingVehicle) {
            throw new Error('Vehicle with this plate number already exists');
        }

        // Tạo mới phương tiện
        const newVehicle = Vehicle.create({
            plateNumber: request.plateNumber,
            capacity: request.capacity,
        });
        await this.vehicleRepo.save(newVehicle);
        return newVehicle;
    }
}