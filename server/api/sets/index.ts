import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export default defineMaybeCachedEventHandler((event) => {
    const query = getQuery(event);

    return PokemonTCG.findSetsByQueries(query);
});
