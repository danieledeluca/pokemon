import { PokemonClient } from 'pokenode-ts';

export default defineMaybeCachedEventHandler(async (event) => {
    const query = getQuery(event);
    const api = new PokemonClient();

    const forms = await api.getPokemonFormByName(query.formName?.toString() || '');

    return forms;
});
