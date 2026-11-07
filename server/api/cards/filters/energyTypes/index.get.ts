import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async () => {
    try {
        const tcgdex = new TCGdex('en');
        const energyTypes = await tcgdex.fetch('energy-types');

        return energyTypes;
    } catch (error) {
        return sendTcgDexError(error);
    }
});
