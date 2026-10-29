import TCGdex, { Query } from '@tcgdex/sdk';
import { groupData } from '~~/server/utils/group-data';

export default defineEventHandler(async (event) => {
    const result = await getValidatedQuery(event, CardsQuerySchema.safeParse);

    if (result.error) {
        return sendZodError(result.error);
    }

    const name = result.data.name || '';

    try {
        const tcgdex = new TCGdex('en');
        const tcgQuery = new Query().like('name', name);
        const tcgCards = await tcgdex.card.list(tcgQuery);

        const cardsGroups = groupData(tcgCards, (card) => {
            return {
                id: card.id,
                localId: card.localId,
                name: card.name,
                image: card.image,
            };
        });

        return cardsGroups;
    } catch (error) {
        return sendTcgDexError(error);
    }
});
