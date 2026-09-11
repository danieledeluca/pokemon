import z from 'zod';

export const TcgRouterParams = z.object({
    id: z.string(),
});

export const PokemonRouterParams = z.object({
    id: z.coerce.number(),
});

export const CardsSchema = z.object({
    name: z.string().trim().optional(),
    page: z.coerce.number().optional().default(1),
});

export const PokemonSchema = z.object({
    name: z.string().trim().optional(),
    page: z.coerce.number().optional().default(1),
    shiny: z.coerce.boolean().optional().default(false),
    variant: z.enum(spriteVariants).optional().default('default'),
});

export type TcgRouterParams = z.infer<typeof TcgRouterParams>;
export type PokemonRouterParams = z.infer<typeof PokemonRouterParams>;
export type CardsSchema = z.infer<typeof CardsSchema>;
export type PokemonSchema = z.infer<typeof PokemonSchema>;
