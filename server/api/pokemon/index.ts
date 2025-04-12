import { PokemonClient } from 'pokenode-ts';

export default defineCachedEventHandler(
    async (event) => {
        const query = getQuery(event);
        const api = new PokemonClient();

        const sprites = await api.listPokemons(
            Number(query.offset),
            !query.name ? Number(query.limit) : 100000,
        );

        sprites.results = sprites.results.filter((sprite) => {
            return sprite.name.indexOf(query.name?.toString().toLowerCase().trim() || '') >= 0;
        });

        return sprites;
    },
    {
        maxAge: CACHE_MAX_AGE,
        getKey: (event) => event.path,
    },
);
