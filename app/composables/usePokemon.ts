import type { Pokemon } from 'pokenode-ts';

export default async function usePokemon(pokemon: Pokemon) {
    const { data: species, error } = await useFetch('/api/pokemon/species', {
        query: {
            speciesName: pokemon.species.name,
        },
    });

    if (error.value) {
        throw createError({
            statusCode: error.value?.statusCode,
            statusMessage: error.value?.message,
        });
    }

    const name = parseName(pokemon.name);
    const flavourText = species.value?.flavor_text_entries
        .filter((entry) => entry.language.name === 'en')
        .at(-1)
        ?.flavor_text.replace(/\f/g, ' ');

    return {
        name,
        flavourText,
        species,
    };
}
