import { getPokemonSpriteUrl, localize, localizeAll, PokemonClient, resourceId } from 'pokenode-ts';

export default defineEventHandler(async (event) => {
    const result = await getValidatedRouterParams(event, PokemonRouterParams.safeParse);

    if (result.error) {
        return sendZodError(event, result.error);
    }

    const pokemonId = result.data.id;

    try {
        const api = new PokemonClient();
        const pokemon = await api.getPokemonById(pokemonId);
        const pokemonSpecies = await api.getPokemonSpeciesById(resourceId(pokemon.species.url));
        const evolutionChain = await api.resolve(pokemonSpecies.evolution_chain);

        let name = pokemon.name;
        let flavourText = '';

        if (pokemon.is_default) {
            name = localize(pokemonSpecies.names)?.name || name;
            flavourText = localizeAll(pokemonSpecies.flavor_text_entries).at(-1)?.flavor_text || '';
        } else {
            const pokemonForm = pokemon.forms[0] ? await api.resolve(pokemon.forms[0]) : undefined;

            if (pokemonForm) {
                name = localize(pokemonForm.names)?.name || name;
                flavourText = localizeAll(pokemonForm.flavor_text_entries).at(-1)?.flavor_text || '';
            }
        }

        return {
            name,
            flavourText: flavourText.replace(/\n|\f/g, ' '),
            spriteUrl: getPokemonSpriteUrl(pokemon.id),
            hasEvolutionChain: evolutionChain.chain.evolves_to.length > 0,
            hasVarieties: pokemonSpecies.varieties.length > 1,
            hasForms: pokemon.forms.length > 1,
        };
    } catch (error) {
        return sendPokenodeTsError(event, error);
    }
});
