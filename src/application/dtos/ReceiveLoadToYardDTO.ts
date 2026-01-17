import z from "zod";

export const ReceiveLoadToYardSchema = z.object({
    loadId: z.string(),
    yardId: z.string(),
    weight: z.number().positive(),
    workerId: z.string()
})

export type ReceiveLoadToYardDTO = z.infer<typeof ReceiveLoadToYardSchema>;