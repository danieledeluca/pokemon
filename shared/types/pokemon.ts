import type { NamedAPIResource } from 'pokenode-ts';

export type SpriteTypes =
    | 'front-default'
    | 'front-shiny'
    | 'home-front-default'
    | 'home-front-shiny'
    | 'official-artwork-front-default'
    | 'official-artwork-front-shiny'
    | 'showdown-front-default'
    | 'showdown-front-shiny';

export interface PokemonFilters {
    name: string;
    sprite: SpriteTypes;
}

export interface PokemonQuery {
    name: string;
    offset: number;
    limit: number;
}

export interface PokemonEvolutionChain extends NamedAPIResource {
    index: number;
    evolves_to: PokemonEvolutionChain[];
}
