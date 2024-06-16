import type { PokeApiResult, PokemonCard, PokemonSet, PokemonSprite } from '@/models';

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
    filteredList?: T[]
) {
    if (!filteredList) return true;

    return filteredList.findIndex((filteredItem) => filteredItem.name === item.name) > -1;
}
