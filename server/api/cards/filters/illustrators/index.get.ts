import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async () => {
    try {
        const tcgdex = new TCGdex('en');
        const illustrators = await tcgdex.fetch('illustrators');

        return illustrators;
    } catch (error) {
        return sendTcgDexError(error);
    }
});
