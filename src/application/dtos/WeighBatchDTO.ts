import z from "zod";

export const WeighBatchSchema = z.object({
    batchId: z.string(),
    netWeight: z.number().positive({ message: "Net weight must be a positive number" }),
    weighedBy: z.string(),
});

// Export Type tự động từ Schema
export type WeighBatchDTO = z.infer<typeof WeighBatchSchema>;