import z from "zod";

export const AddChemicalToProcessSchema = z.object({
    chemicalId: z.string(),
    amount: z.number().positive(),
    workerId: z.string(),
    tankId: z.string(),
})

export type AddChemicalToProcessDTO = z.infer<typeof AddChemicalToProcessSchema>;