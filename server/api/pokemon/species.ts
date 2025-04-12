import { PokemonClient } from 'pokenode-ts';

export default defineCachedEventHandler(
    async (event) => {
        const query = getQuery(event);
        const api = new PokemonClient();

        const species = await api.getPokemonSpeciesByName(query.speciesName?.toString() || '');

        return species;
    },
    {
        maxAge: CACHE_MAX_AGE,
        getKey: (event) => event.path,
    },
);
