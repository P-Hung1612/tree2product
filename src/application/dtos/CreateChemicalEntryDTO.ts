import z from "zod";

export const CreateChemicalEntrySchema = z.object({
    chemicalId: z.string(),
    amount: z.number().positive(),
    tankId: z.string(),
    processInstanceId: z.string(),
    addedBy: z.string(),
})

export type CreateChemicalEntryDTO = z.infer<typeof CreateChemicalEntrySchema>;
    