import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export default defineCachedEventHandler(
    (event) => {
        const cardId = getRouterParam(event, 'id');

        if (cardId) {
            return PokemonTCG.findCardByID(cardId) as Promise<PokemonTCGCard>;
        }
    },
    {
        maxAge: CACHE_MAX_AGE,
        getKey: (event) => event.path,
    },
);
