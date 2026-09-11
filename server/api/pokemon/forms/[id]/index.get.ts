import { PokemonClient } from 'pokenode-ts';

export default defineEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, PokemonRouterParams.safeParse);

    if (result.error) {
        return sendZodError(event, result.error);
    }

    const pokemonId = result.data.id;

    try {
        const api = new PokemonClient();
        const pokemon = await api.getPokemonById(pokemonId);
        const pokemonForms = await Promise.all(pokemon.forms.map((form) => api.resolve(form)));

        return pokemonForms;
    } catch (error) {
        return sendPokenodeTsError(event, error);
    }
});
