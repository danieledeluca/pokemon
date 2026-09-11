import type { CardResume } from '@tcgdex/sdk';

import TCGdex, { Query } from '@tcgdex/sdk';

export default defineEventHandler(async (event) => {
    const result = await getValidatedQuery(event, CardsSchema.safeParse);

    if (result.error) {
        return sendZodError(event, result.error);
    }

    const name = result.data.name || '';

    try {
        const tcgdex = new TCGdex('en');
        const tcgQuery = new Query().like('name', name);
        const tcgCards = await tcgdex.card.list(tcgQuery);

        const cards = tcgCards.reduce<CardResume[][]>((acc, card, index) => {
            const chunkIndex = Math.floor(index / CARDS_PER_PAGE);

            if (!acc[chunkIndex]) {
                acc[chunkIndex] = [];
            }

            acc[chunkIndex].push({
                id: card.id,
                localId: card.localId,
                name: card.name,
                image: card.image,
            });

            return acc;
        }, []);

        return cards;
    } catch (error) {
        return sendTcgDexError(event, error);
    }
});
