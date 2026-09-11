import type { NamedAPIResource, Pokemon } from 'pokenode-ts';

import { PokemonClient } from 'pokenode-ts';

export default defineEventHandler(async (event) => {
    const results = await getValidatedQuery(event, PokemonSchema.safeParse);

    if (results.error) {
        return sendZodError(event, results.error);
    }

    const name = results.data.name || '';

    try {
        const api = new PokemonClient();
        const pokemon = await api.listPokemons(0, 999999);

        const pokemonGroups = pokemon.results
            .filter((pokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase()))
            .reduce<NamedAPIResource<Pokemon>[][]>((acc, pokemon, index) => {
                const chunkIndex = Math.floor(index / POKEMON_PER_PAGE);

                if (!acc[chunkIndex]) {
                    acc[chunkIndex] = [];
                }

                acc[chunkIndex].push(pokemon);

                return acc;
            }, []);

        return pokemonGroups;
    } catch (error) {
        return sendPokenodeTsError(event, error);
    }
});
