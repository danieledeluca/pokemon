import { EvolutionClient, PokemonClient } from 'pokenode-ts';

export default defineMaybeCachedEventHandler(async (event) => {
    const pokemonId = Number(getRouterParam(event, 'id'));

    const pokemonApi = new PokemonClient();
    const evolutionApi = new EvolutionClient();

    const pokemon = await pokemonApi.getPokemonById(pokemonId);
    const pokemonSpecies = await pokemonApi.getPokemonSpeciesByName(pokemon.species.name);
    const pokemonForms = await Promise.all(
        pokemon.forms.map((form) => pokemonApi.getPokemonFormByName(form.name)),
    );
    const pokemonEvolutionChain = await evolutionApi.getEvolutionChainById(
        getIdFromUrl(pokemonSpecies.evolution_chain.url),
    );

    return {
        pokemon,
        pokemonSpecies,
        pokemonForms,
        pokemonEvolutionChain,
    };
});
