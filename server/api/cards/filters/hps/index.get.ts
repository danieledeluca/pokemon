import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async () => {
    try {
        const tcgdex = new TCGdex('en');
        const hps = await tcgdex.fetch('hp');

        return hps?.map(Number);
    } catch (error) {
        return sendTcgDexError(error);
    }
});
