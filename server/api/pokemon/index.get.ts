import { PokemonClient } from 'pokenode-ts';

export default defineEventHandler(async (event) => {
    const results = await getValidatedQuery(event, PokemonQuerySchema.safeParse);

    if (results.error) {
        return sendZodError(results.error);
    }

    const name = results.data.name || '';

    try {
        const api = new PokemonClient();
        const pokemon = await api.listPokemons(0, 999999);

        const pokemonGroups = groupData(
            pokemon.results.filter((pokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase())),
            (pokemon) => pokemon,
        );

        return pokemonGroups;
    } catch (error) {
        return sendPokenodeTsError(error);
    }
});
