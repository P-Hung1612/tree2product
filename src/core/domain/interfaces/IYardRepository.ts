import { Yard } from "@core/domain/entities/Yard";

export interface IYardRepository {
    save(yard: Yard): Promise<void>;
    findByYardCode(yardCode: string): Promise<Yard | null>;
    exists(yardId: string): Promise<boolean>;
    findByYardId(yardId: string): Promise<Yard | null>;
}