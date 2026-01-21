import { Chemical } from "../entities/Chemical";

export interface IChemicalRepository {
    save(chemical: Chemical): Promise<void>;
    findByChemicalId(id: string): Promise<Chemical | null>;
    exists(id: string): Promise<boolean>;
    findByChemCode(chemCode: string): Promise<Chemical | null>;
}