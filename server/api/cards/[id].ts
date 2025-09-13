import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export default defineMaybeCachedEventHandler((event) => {
    const cardId = getRouterParam(event, 'id');

    if (cardId) {
        return PokemonTCG.findCardByID(cardId) as Promise<PokemonTCGCard>;
    }
});
