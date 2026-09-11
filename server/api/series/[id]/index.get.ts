import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, TcgRouterParams.safeParse);

    if (result.error) {
        return sendZodError(event, result.error);
    }

    const serieId = result.data.id;

    try {
        const tcgdex = new TCGdex('en');
        const serie = await tcgdex.fetch('series', serieId);

        if (!serie) {
            return sendError(event, createError({
                statusCode: 404,
                statusMessage: 'Serie not found.',
            }));
        }

        serie.sets.reverse();

        return serie;
    } catch (error) {
        return sendTcgDexError(event, error);
    }
});
