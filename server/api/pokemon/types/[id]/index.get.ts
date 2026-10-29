import { PokemonClient } from 'pokenode-ts';

export default defineEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, PokemonDetailPageRouterParamsSchema.safeParse);

    if (result.error) {
        return sendZodError(result.error);
    }

    const typeId = result.data.id;

    try {
        const api = new PokemonClient();
        const type = await api.getTypeById(typeId);

        return type;
    } catch (error) {
        return sendPokenodeTsError(error);
    }
});
