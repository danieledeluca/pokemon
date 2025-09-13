import { PokemonClient } from 'pokenode-ts';

export default defineMaybeCachedEventHandler(async (event) => {
    const query = getQuery(event);
    const api = new PokemonClient();

    const species = await api.getPokemonSpeciesByName(query.speciesName?.toString() || '');

    return species;
});
