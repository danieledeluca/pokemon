import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async () => {
    try {
        const tcgdex = new TCGdex('en');
        const suffixes = await tcgdex.fetch('suffixes');

        return suffixes;
    } catch (error) {
        return sendTcgDexError(error);
    }
});
