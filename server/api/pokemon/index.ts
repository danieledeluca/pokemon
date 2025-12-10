import { PokemonClient } from 'pokenode-ts';

export default defineMaybeCachedEventHandler(async (event) => {
    const query = getQuery(event);
    const api = new PokemonClient();

    const pokemonList = await api.listPokemons(
        Number(query.offset),
        !query.name ? Number(query.limit) : 100000,
    );

    pokemonList.results = pokemonList.results.filter((sprite) => {
        return sprite.name.indexOf(query.name?.toString().toLowerCase().trim() || '') >= 0;
    });

    return pokemonList;
});
