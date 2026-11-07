import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async () => {
    try {
        const tcgdex = new TCGdex('en');
        const trainerTypes = await tcgdex.fetch('trainer-types');

        return trainerTypes;
    } catch (error) {
        return sendTcgDexError(error);
    }
});
