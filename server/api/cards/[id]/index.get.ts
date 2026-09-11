import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, TcgRouterParams.safeParse);

    if (result.error) {
        return sendZodError(event, result.error);
    }

    const cardId = result.data.id;

    try {
        const tcgdex = new TCGdex('en');
        const card = await tcgdex.fetch('cards', cardId);

        if (!card) {
            return sendError(event, createError({
                statusCode: 404,
                statusMessage: 'Card not found.',
            }));
        }

        return card;
    } catch (error) {
        return sendTcgDexError(event, error);
    }
});
