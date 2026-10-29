import z from 'zod';

export const BaseStateSchema = z.object({
    name: z.string().trim().optional(),
});

export const PokemonFiltersStateSchema = z.object({
    variant: z.enum(spriteVariants).optional().default('default'),
    shiny: z.coerce.boolean().optional().default(false),
});

export type BaseState = z.infer<typeof BaseStateSchema>;
export type PokemonFiltersState = z.infer<typeof PokemonFiltersStateSchema>;
