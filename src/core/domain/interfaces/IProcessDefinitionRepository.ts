import { ProcessDefinition } from "../entities/ProcessDefinition";

export interface IProcessDefinitionRepository {
    findActiveByProductType(type: string): Promise<ProcessDefinition | null>;
    // save(processDefinition: ProcessDefinition): Promise<void>;
    // findById(id: string): Promise<ProcessDefinition | null>;
    // exists(id: string): Promise<boolean>;
}
