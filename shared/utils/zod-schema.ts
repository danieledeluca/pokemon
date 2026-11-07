import z from 'zod';

export const CardsFiltersSchema = z.object({
    name: z.string().trim().optional(),
    type: z.string().trim().optional(),
    retreat: z.coerce.number().optional(),
    illustrator: z.string().trim().optional(),
    hp: z.coerce.number().optional(),
    category: z.string().trim().optional(),
    energyType: z.string().trim().optional(),
    regulationMark: z.string().trim().optional(),
    stage: z.string().trim().optional(),
    suffix: z.string().trim().optional(),
    trainerType: z.string().trim().optional(),
});

export type CardsFilters = z.infer<typeof CardsFiltersSchema>;
