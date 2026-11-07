import TCGdex, { Query } from '@tcgdex/sdk';
import { groupData } from '~~/server/utils/group-data';

export default defineEventHandler(async (event) => {
    const result = await getValidatedQuery(event, CardsFiltersSchema.safeParse);

    if (result.error) {
        return sendZodError(result.error);
    }

    try {
        const tcgdex = new TCGdex('en');
        const tcgQuery = new Query();

        if (result.data.name) {
            tcgQuery.like('name', result.data.name);
        }

        if (result.data.type) {
            tcgQuery.equal('types', result.data.type);
        }

        if (result.data.retreat) {
            tcgQuery.equal('retreat', result.data.retreat.toString());
        }

        if (result.data.illustrator) {
            tcgQuery.equal('illustrator', result.data.illustrator);
        }

        if (result.data.hp) {
            tcgQuery.equal('hp', result.data.hp.toString());
        }

        if (result.data.category) {
            tcgQuery.equal('category', result.data.category);
        }

        if (result.data.energyType) {
            tcgQuery.equal('energyType', result.data.energyType);
        }

        if (result.data.regulationMark) {
            tcgQuery.equal('regulationMark', result.data.regulationMark);
        }

        if (result.data.stage) {
            tcgQuery.equal('stage', result.data.stage);
        }

        if (result.data.suffix) {
            tcgQuery.equal('suffix', result.data.suffix);
        }

        if (result.data.trainerType) {
            tcgQuery.equal('trainerType', result.data.trainerType);
        }

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
