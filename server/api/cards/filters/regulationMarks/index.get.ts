import TCGdex from '@tcgdex/sdk';

export default defineEventHandler(async () => {
    try {
        const tcgdex = new TCGdex('en');
        const regulationMarks = await tcgdex.fetch('regulation-marks');

        return regulationMarks;
    } catch (error) {
        return sendTcgDexError(error);
    }
});
