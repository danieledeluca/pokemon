import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export default defineCachedEventHandler(
    (event) => {
        const query = getQuery(event);

        return PokemonTCG.findSetsByQueries(query);
    },
    {
        maxAge: CACHE_MAX_AGE,
        getKey: (event) => event.path,
    },
);
