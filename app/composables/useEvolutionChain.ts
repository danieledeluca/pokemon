import type { ChainLink, PokemonSpecies } from 'pokenode-ts';

export default async function useEvolutionChain(pokemonSpecies: PokemonSpecies | undefined) {
    const { data: evolutionChain, error } = await useFetch('/api/pokemon/evolution-chain', {
        query: {
            evolutionChainUrl: pokemonSpecies?.evolution_chain.url,
        },
    });

    if (error.value) {
        throw createError({
            statusCode: error.value?.response?.status,
            statusMessage: error.value?.response?.statusText,
        });
    }

    const getEvolutionChain = (chain: ChainLink, index = 1): PokemonEvolutionChain => {
        return {
            ...chain.species,
            index: index,
            evolves_to: chain.evolves_to.map((subChain) => getEvolutionChain(subChain, index + 1)),
        };
    };

    return {
        evolutionChain: [getEvolutionChain(evolutionChain.value!.chain)],
    };
}
