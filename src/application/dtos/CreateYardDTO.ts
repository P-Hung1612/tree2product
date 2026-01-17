import z from "zod";

export const CreateYardSchema = z.object({
    yardCode: z.string(),
    location: z.string(),
    latexType: z.enum(['TAP']).default('TAP'),
})

export type CreateYardDTO = z.infer<typeof CreateYardSchema>;