import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, TcgDetailPageRouterParamsSchema.safeParse);

    if (result.error) {
        return sendZodError(result.error);
    }

    const setId = result.data.id;

    try {
        const tcgdex = new TCGdex('en');
        const set = await tcgdex.fetch('sets', setId);

        if (!set) {
            throw createError({
                statusCode: 404,
                message: 'Set not found',
            });
        }

        return set;
    } catch (error) {
        return sendTcgDexError(error);
    }
});
