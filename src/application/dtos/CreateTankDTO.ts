import z from "zod";

export const CreateTankSchema = z.object({
    tankCode: z.string(),
    capacity: z.number().positive(),
    latexType: z.enum(['NUOC']).default('NUOC'),
    currentLevel: z.number().nonnegative().default(0)
})

export type CreateTankDTO = z.infer<typeof CreateTankSchema>;