import z from "zod";

export const ReceiveLoadToTankSchema = z.object({
    loadId: z.string(),
    tankId: z.string(),
    weight: z.number().positive(),
    workerId: z.string()
})

export type ReceiveLoadToTankDTO = z.infer<typeof ReceiveLoadToTankSchema>;