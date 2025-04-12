import { EvolutionClient } from 'pokenode-ts';

export default defineCachedEventHandler(
    async (event) => {
        const query = getQuery(event);
        const api = new EvolutionClient();

        const evolutionChain = await api.getEvolutionChainById(
            getIdFromUrl(query.evolutionChainUrl?.toString()),
        );

        return evolutionChain;
    },
    {
        maxAge: CACHE_MAX_AGE,
        getKey: (event) => event.path,
    },
);
