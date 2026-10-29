import { PokemonClient } from 'pokenode-ts';

export default defineEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, PokemonDetailPageRouterParamsSchema.safeParse);

    if (result.error) {
        return sendZodError(result.error);
    }

    const pokemonId = result.data.id;

    try {
        const api = new PokemonClient();
        const pokemon = await api.getPokemonById(pokemonId);

        return pokemon;
    } catch (error) {
        return sendPokenodeTsError(error);
    }
});
