import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async () => {
    try {
        const tcgdex = new TCGdex('en');
        const stages = await tcgdex.fetch('stages');

        return stages;
    } catch (error) {
        return sendTcgDexError(error);
    }
});
