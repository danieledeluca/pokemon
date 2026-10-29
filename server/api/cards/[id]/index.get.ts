import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, TcgDetailPageRouterParamsSchema.safeParse);

    if (result.error) {
        return sendZodError(result.error);
    }

    const cardId = result.data.id;

    try {
        const tcgdex = new TCGdex('en');
        const card = await tcgdex.fetch('cards', cardId);

        if (!card) {
            throw createError({
                statusCode: 404,
                message: 'Card not found',
            });
        }

        return card as TcgCard;
    } catch (error) {
        return sendTcgDexError(error);
    }
});
