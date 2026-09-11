import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, TcgRouterParams.safeParse);

    if (result.error) {
        return sendZodError(event, result.error);
    }

    const setId = result.data.id;

    try {
        const tcgdex = new TCGdex('en');
        const set = await tcgdex.fetch('sets', setId);

        if (!set) {
            return sendError(event, createError({
                statusCode: 404,
                statusMessage: 'Set not found.',
            }));
        }

        return set;
    } catch (error) {
        return sendTcgDexError(event, error);
    }
});
