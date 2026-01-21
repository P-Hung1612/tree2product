import { ChemicalEntry} from "../entities/ChemicalEntry";

export interface IChemicalEntryRepository {
    save(entry: ChemicalEntry): Promise<void>;
    findById(id: string): Promise<ChemicalEntry | null>;
    // exists(id: string): Promise<boolean>;
    // Thêm các method khác tùy nhu cầu nghiệp vụ, ví dụ:
    // findByChemicalId(chemicalId: string): Promise<ChemicalEntry[]>;
}