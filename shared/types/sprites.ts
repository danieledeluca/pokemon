export interface SpriteTypes {
    'front-default': string;
    'front-shiny': string;
    'home-front-default': string;
    'home-front-shiny': string;
    'official-artwork-front-default': string;
    'official-artwork-front-shiny': string;
    'showdown-front-default': string;
    'showdown-front-shiny': string;
}

export interface SpriteFilters {
    name: string;
    type: keyof SpriteTypes;
}

export interface SpriteQuery {
    name: string;
    offset: number;
    limit: number;
}
