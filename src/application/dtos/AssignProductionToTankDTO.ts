import z from "zod";

export const AssignProductionToTankSchema = z.object({
    processId: z.string(),
    tankId: z.string(),
    productType: z.enum(['LY_TAM','SVR3L','SVRCV','RSS','SVR10'], {
        error: 'Invalid product type provided',
    }),
    workerId: z.string(),
});

// Export Type tự động từ Schema
export type AssignProductionToTankDTO = z.infer<typeof AssignProductionToTankSchema>;