import z from "zod";

export const CreateMaterialEntrySchema = z.object({
    receivedBy: z.string(),
    netWeight: z.number().positive(),
    tankId: z.string(),
    yardId: z.string(),
    fermentId: z.string(),
    latexType: z.enum(['NUOC', 'DONG', 'CHEN', "DAY"]),
})

export type CreateMaterialEntryDTO = z.infer<typeof CreateMaterialEntrySchema>;