import z from "zod";

export const CreateChemicalSchema = z.object({
    chemCode: z.string(),
    chemName: z.string(),
    unit: z.string(),
    pricePerUnit: z.number().positive(),
})

export type CreateChemicalDTO = z.infer<typeof CreateChemicalSchema>;