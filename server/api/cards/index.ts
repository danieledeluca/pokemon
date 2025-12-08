import type { CardResume } from '@tcgdex/sdk';

export default defineMaybeCachedEventHandler(async (event) => {
    const query = getQuery(event);

    const cards = await $fetch<CardResume[]>(`${TCG_DEX_API_URL}/cards`, { query });

    return cards;
});
