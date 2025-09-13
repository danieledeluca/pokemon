import { EvolutionClient } from 'pokenode-ts';

export default defineMaybeCachedEventHandler(async (event) => {
    const query = getQuery(event);
    const api = new EvolutionClient();

    const evolutionChain = await api.getEvolutionChainById(
        getIdFromUrl(query.evolutionChainUrl?.toString()),
    );

    return evolutionChain;
});
