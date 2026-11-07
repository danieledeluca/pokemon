import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async () => {
    try {
        const tcgdex = new TCGdex('en');
        const types = await tcgdex.fetch('types');

        return types;
    } catch (error) {
        return sendTcgDexError(error);
    }
});
