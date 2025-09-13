import { PokemonClient } from 'pokenode-ts';

export default defineMaybeCachedEventHandler(async (event) => {
    const pokemonId = Number(getRouterParam(event, 'id'));
    const api = new PokemonClient();

    const pokemon = await api.getPokemonById(pokemonId);

    return pokemon;
});
