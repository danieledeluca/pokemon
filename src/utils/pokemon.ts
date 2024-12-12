import type {
    PokeApiResult,
    PokemonCard,
    PokemonSet,
    PokemonSprite,
    PokemonSpriteTypes,
} from '@/utils/models';
import {
    HOME_SPRITE_FRONT_DEFAULT_URL,
    HOME_SPRITE_FRONT_SHINY_URL,
    OFFICIAL_ARTWORK_SPRITE_FRONT_DEFAULT_URL,
    OFFICIAL_ARTWORK_SPRITE_FRONT_SHINY_URL,
    SHOWDOWN_SPRITE_FRONT_DEFAULT_URL,
    SHOWDOWN_SPRITE_FRONT_SHINY_URL,
    SPRITE_FRONT_DEFAULT_URL,
    SPRITE_FRONT_SHINY_URL,
} from './constants';

export function filterList<T extends PokemonSet | PokemonCard | PokemonSprite | PokeApiResult>(
    filter: string,
    list: T[]
) {
    return list.filter((item: T) => {
        return item.name.toLowerCase().indexOf(filter.toLowerCase().trim()) >= 0;
    });
}

export function showItem<T extends PokemonSet | PokemonCard | PokemonSprite | PokeApiResult>(
    item: T,
    filteredList?: T[],
    keys: string[] = ['name']
) {
    if (!filteredList) return true;

    return (
        filteredList.findIndex((filteredItem) =>
            keys.every((key) => filteredItem[key as keyof T] === item[key as keyof T])
        ) > -1
    );
}

export function getSpriteId(sprite: PokeApiResult) {
    const regex = /(pokemon|pokemon-species)\/(\d+)\//;

    return parseInt(sprite.url.match(regex)?.[2] || '0');
}

export function getSprites(sprite: PokeApiResult): PokemonSpriteTypes {
    const spriteId = getSpriteId(sprite);

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
