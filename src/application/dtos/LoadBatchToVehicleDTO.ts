import z from "zod";

export const LoadBatchToVehicleSchema = z.object({
    batchId: z.string(),
    vehicleId: z.string(),
    compartmentCode: z.string(),
});

// Export Type tự động từ Schema
export type LoadBatchToVehicleDTO = z.infer<typeof LoadBatchToVehicleSchema>;