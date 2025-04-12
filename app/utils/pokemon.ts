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
