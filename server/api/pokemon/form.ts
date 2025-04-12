import { PokemonClient } from 'pokenode-ts';

export default defineCachedEventHandler(
    async (event) => {
        const query = getQuery(event);
        const api = new PokemonClient();

        const forms = await api.getPokemonFormByName(query.formName?.toString() || '');

        return forms;
    },
    {
        maxAge: CACHE_MAX_AGE,
        getKey: (event) => event.path,
    },
);
