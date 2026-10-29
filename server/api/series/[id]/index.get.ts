import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, TcgDetailPageRouterParamsSchema.safeParse);

    if (result.error) {
        return sendZodError(result.error);
    }

    const serieId = result.data.id;

    try {
        const tcgdex = new TCGdex('en');
        const serie = await tcgdex.fetch('series', serieId);

        if (!serie) {
            throw createError({
                statusCode: 404,
                message: 'Serie not found',
            });
        }

        serie.sets.reverse();

        return serie;
    } catch (error) {
        return sendTcgDexError(error);
    }
});
