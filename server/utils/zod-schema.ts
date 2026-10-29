import z from 'zod';

export const CardsQuerySchema = z.object({
    name: z.string().trim().optional(),
});

export const PokemonQuerySchema = z.object({
    name: z.string().trim().optional(),
});

export const TcgDetailPageRouterParamsSchema = z.object({
    id: z.string(),
});

export const PokemonDetailPageRouterParamsSchema = z.object({
    id: z.coerce.number(),
});
