import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async () => {
    try {
        const tcgdex = new TCGdex('en');
        const categories = await tcgdex.fetch('categories');

        return categories;
    } catch (error) {
        return sendTcgDexError(error);
    }
});
