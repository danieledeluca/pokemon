import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async () => {
    try {
        const tcgdex = new TCGdex('en');
        const series = await tcgdex.fetch('series');

        if (!series) {
            throw createError({
                statusCode: 404,
                message: 'Series not found',
            });
        }

        return series.reverse();
    } catch (error) {
        return sendTcgDexError(error);
    }
});
