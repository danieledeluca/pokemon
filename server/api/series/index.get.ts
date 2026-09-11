import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async (event) => {
    try {
        const tcgdex = new TCGdex('en');
        const series = await tcgdex.fetch('series');

        if (!series) {
            return sendError(event, createError({
                statusCode: 404,
                statusMessage: 'Series not found.',
            }));
        }

        return series.reverse();
    } catch (error) {
        return sendTcgDexError(event, error);
    }
});
