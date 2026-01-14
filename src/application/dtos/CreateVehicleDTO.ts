import { z } from "zod";

export const CreateVehicleSchema = z.object({
    plateNumber: z.string().min(2).max(20),
    capacity: z.number().positive(),
});

//Export Type tự động từ Schema
export type CreateVehicleDTO = z.infer<typeof CreateVehicleSchema>;