import { ProcessInstance } from "../entities/ProcessInstance";

export interface IProcessInstanceRepository {
    findById(processInstanceId: string): Promise<ProcessInstance | null>;
    save(process: ProcessInstance): Promise<void>;
    exists(processInstanceId: string): Promise<boolean>;
}