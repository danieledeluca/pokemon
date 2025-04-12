export function getSpriteImages(spriteUrl: string): Record<keyof SpriteTypes, string> {
    const spriteId = getIdFromUrl(spriteUrl);

    return {
        'front-default': `${SPRITE_FRONT_DEFAULT_URL}${spriteId}.png`,
        'front-shiny': `${SPRITE_FRONT_SHINY_URL}${spriteId}.png`,
        'home-front-default': `${HOME_SPRITE_FRONT_DEFAULT_URL}${spriteId}.png`,
        'home-front-shiny': `${HOME_SPRITE_FRONT_SHINY_URL}${spriteId}.png`,
        'official-artwork-front-default': `${OFFICIAL_ARTWORK_SPRITE_FRONT_DEFAULT_URL}${spriteId}.png`,
        'official-artwork-front-shiny': `${OFFICIAL_ARTWORK_SPRITE_FRONT_SHINY_URL}${spriteId}.png`,
        'showdown-front-default': `${SHOWDOWN_SPRITE_FRONT_DEFAULT_URL}${spriteId}.gif`,
        'showdown-front-shiny': `${SHOWDOWN_SPRITE_FRONT_SHINY_URL}${spriteId}.gif`,
    };
}
