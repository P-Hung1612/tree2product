import z from "zod";

export const ReceiveLoadSchema = z.object({
    loadId: z.string(),
    tankId: z.string(),
    weight: z.number().positive(),
    workerId: z.string()
})

export type ReceiveLoadDTO = z.infer<typeof ReceiveLoadSchema>;