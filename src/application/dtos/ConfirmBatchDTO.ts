import z from "zod";

export const ConfirmBatchSchema = z.object({
    batchId: z.string(),
});

// Export Type tự động từ Schema
export type ConfirmBatchDTO = z.infer<typeof ConfirmBatchSchema>;