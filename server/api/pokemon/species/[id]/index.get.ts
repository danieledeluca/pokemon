import { PokemonClient } from 'pokenode-ts';

export default defineEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, PokemonRouterParams.safeParse);

    if (result.error) {
        return sendZodError(event, result.error);
    }

    const pokemonSpeciesId = result.data.id;

    try {
        const api = new PokemonClient();
        const pokemonSpecies = await api.getPokemonSpeciesById(pokemonSpeciesId);

        return pokemonSpecies;
    } catch (error) {
        return sendPokenodeTsError(event, error);
    }
});
