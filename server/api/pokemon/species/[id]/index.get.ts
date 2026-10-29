import { PokemonClient } from 'pokenode-ts';

export default defineEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, PokemonDetailPageRouterParamsSchema.safeParse);

    if (result.error) {
        return sendZodError(result.error);
    }

    const pokemonSpeciesId = result.data.id;

    try {
        const api = new PokemonClient();
        const pokemonSpecies = await api.getPokemonSpeciesById(pokemonSpeciesId);

        return pokemonSpecies;
    } catch (error) {
        return sendPokenodeTsError(error);
    }
});
