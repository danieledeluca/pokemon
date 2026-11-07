import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async () => {
    try {
        const tcgdex = new TCGdex('en');
        const retreats = await tcgdex.fetch('retreats');

        return retreats?.map(Number);
    } catch (error) {
        return sendTcgDexError(error);
    }
});
