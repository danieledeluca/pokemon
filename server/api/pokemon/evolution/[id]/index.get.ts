import { MainClient } from 'pokenode-ts';

export default defineEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, PokemonRouterParams.safeParse);

    if (result.error) {
        return sendZodError(event, result.error);
    }

    const pokemonSpeciesId = result.data.id;

    try {
        const api = new MainClient();
        const pokemonSpecies = await api.pokemon.getPokemonSpeciesById(pokemonSpeciesId);
        const evolutionChain = await api.resolve(pokemonSpecies.evolution_chain);

        return evolutionChain;
    } catch (error) {
        return sendPokenodeTsError(event, error);
    }
});
