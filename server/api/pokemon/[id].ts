import { PokemonClient } from 'pokenode-ts';

export default defineCachedEventHandler(
    async (event) => {
        const pokemonId = Number(getRouterParam(event, 'id'));
        const api = new PokemonClient();

        const pokemon = await api.getPokemonById(pokemonId);

        return pokemon;
    },
    {
        maxAge: CACHE_MAX_AGE,
        getKey: (event) => event.path,
    },
);
