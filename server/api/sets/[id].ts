import type { Set } from '@tcgdex/sdk';

export default defineMaybeCachedEventHandler(async (event) => {
    const setId = getRouterParam(event, 'id');
    const query = getQuery(event);

    const set = await $fetch<Set>(`${TCG_DEX_API_URL}/sets/${setId}`);
    set.cards = set.cards.filter((card) =>
        card.name.toLowerCase().includes(query.name?.toString().toLowerCase() || ''),
    );

    return set;
});
