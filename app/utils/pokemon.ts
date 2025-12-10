import type {
    ChainLink,
    EvolutionChain,
    FlavorText,
    Pokemon,
    PokemonForm,
    PokemonSpecies,
} from 'pokenode-ts';

export function getPokemonSprites(pokemonUrl: string): Record<SpriteTypes, string> {
    const pokemonId = getIdFromUrl(pokemonUrl);

    return {
        'front-default': `${SPRITE_FRONT_DEFAULT_URL}${pokemonId}.png`,
        'front-shiny': `${SPRITE_FRONT_SHINY_URL}${pokemonId}.png`,
        'home-front-default': `${HOME_SPRITE_FRONT_DEFAULT_URL}${pokemonId}.png`,
        'home-front-shiny': `${HOME_SPRITE_FRONT_SHINY_URL}${pokemonId}.png`,
        'official-artwork-front-default': `${OFFICIAL_ARTWORK_SPRITE_FRONT_DEFAULT_URL}${pokemonId}.png`,
        'official-artwork-front-shiny': `${OFFICIAL_ARTWORK_SPRITE_FRONT_SHINY_URL}${pokemonId}.png`,
        'showdown-front-default': `${SHOWDOWN_SPRITE_FRONT_DEFAULT_URL}${pokemonId}.gif`,
        'showdown-front-shiny': `${SHOWDOWN_SPRITE_FRONT_SHINY_URL}${pokemonId}.gif`,
    };
}

export function getPokemonImage(pokemon?: Pokemon) {
    if (!pokemon) return '';

    return (
        pokemon.sprites.versions['generation-v']['black-white'].animated.front_default ||
        pokemon.sprites.front_default ||
        ''
    );
}

export function getPokemonName(
    pokemon?: Pokemon,
    pokemonSpecies?: PokemonSpecies,
    pokemonForms?: PokemonForm[],
) {
    if (!pokemon || !pokemonSpecies || !pokemonForms) return '';

    if (pokemon.name === pokemonSpecies.name) {
        return (
            pokemonSpecies.names.find((name) => name.language.name === 'en')?.name ||
            parseName(pokemon.name)
        );
    }

    const currentForm = pokemonForms.find((form) => form.name === pokemon.name);
    return (
        currentForm?.names.find((name) => name.language.name === 'en')?.name ||
        parseName(pokemon.name)
    );
}

export function parsePokemonFlavorText(flavorTextEntries?: FlavorText[]) {
    if (!flavorTextEntries) return '';

    return (
        flavorTextEntries
            .find((entry) => entry.language.name === 'en')
            ?.flavor_text.replace(/\f/g, ' ') || ''
    );
}

export function parseEvolutionChain(evolutionChain?: EvolutionChain) {
    if (!evolutionChain || !evolutionChain.chain.evolves_to.length) return [];

    const getEvolutionChain = (chainLink: ChainLink, index = 1): PokemonEvolutionChain => {
        return {
            ...chainLink.species,
            index,
            evolves_to: chainLink.evolves_to.map((evolutionChainLink) =>
                getEvolutionChain(evolutionChainLink, index + 1),
            ),
        };
    };

    return [getEvolutionChain(evolutionChain.chain)];
}
