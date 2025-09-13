import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

async function getSetCards(parameter: PokemonTCG.Parameter, cards: PokemonTCG.Card[] = []) {
    const pageCards = await PokemonTCG.findCardsByQueries(parameter);

    cards.push(...pageCards);

    if (pageCards[0]?.set.total > cards.length) {
        parameter.page = (Number(parameter.page) || 1) + 1;

        await getSetCards(parameter, cards);
    }

    return cards;
}

export default defineMaybeCachedEventHandler(async (event) => {
    const setId = getRouterParam(event, 'id');
    const query = getQuery(event);

    query.q += `set.id:${setId}`;

    if (setId) {
        return await getSetCards(query);
    }
});
