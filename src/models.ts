export interface PokemonSets {
    data: PokemonSet[] | PokemonSet;
    page: number;
    pageSize: number;
    count: number;
    totalCount: number;
}

export interface PokemonSet {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: Legalities;
    ptcgoCode?: string;
    releaseDate: string;
    updatedAt: string;
    images: SetImages;
}

export interface PokemonCards {
    data: PokemonCard[] | PokemonCard;
    page: number;
    pageSize: number;
    count: number;
    totalCount: number;
}

export interface PokemonCard {
    id: string;
    name: string;
    supertype: string;
    subtypes: string[];
    level?: string;
    hp: string;
    types?: string[];
    evolvesFrom?: string;
    abilities?: Ability[];
    attacks?: Attack[];
    weaknesses?: Weakness[];
    resistances?: Resistance[];
    retreatCost?: string[];
    convertedRetreatCost?: number;
    set: PokemonSet;
    number: string;
    artist: string;
    rarity?: string;
    flavorText?: string;
    nationalPokedexNumbers: number[];
    legalities: Legalities;
    images: CardImages;
    tcgplayer?: Tcgplayer;
    cardmarket?: CardMarket;
    evolvesTo?: string[];
    rules?: string[];
    regulationMark?: string;
}

export interface Legalities {
    unlimited: string;
    expanded?: string;
    standard?: string;
}

export interface SetImages {
    symbol: string;
    logo: string;
}

export interface Ability {
    name: string;
    text: string;
    type: string;
}

export interface Attack {
    cost: string[];
    name: string;
    text: string;
    damage: string;
    convertedEnergyCost: number;
}

export interface Weakness {
    type: string;
    value: string;
}

export interface Resistance {
    type: string;
    value: string;
}

export interface CardImages {
    small: string;
    large: string;
}

export interface Tcgplayer {
    url: string;
    updatedAt: string;
    prices?: Prices;
}

export interface Prices {
    'holofoil'?: Price;
    '1stEditionHolofoil'?: Price;
    'unlimitedHolofoil'?: Price;
    'normal'?: Price;
    'reverseHolofoil'?: Price;
}

export interface Price {
    low: number;
    mid: number;
    high: number;
    market?: number;
    directLow?: number;
}

export interface CardMarket {
    url: string;
    updatedAt: string;
    prices: CardMarketPrices;
}

export interface CardMarketPrices {
    averageSellPrice: number;
    lowPrice: number;
    trendPrice: number;
    germanProLow: number;
    suggestedPrice: number;
    reverseHoloSell: number;
    reverseHoloLow: number;
    reverseHoloTrend: number;
    lowPriceExPlus: number;
    avg1: number;
    avg7: number;
    avg30: number;
    reverseHoloAvg1: number;
    reverseHoloAvg7: number;
    reverseHoloAvg30: number;
}

export interface PokeApiResponse {
    count: number;
    next: string;
    previous: null;
    results: PokeApiResult[];
}

export interface PokeApiResult {
    name: string;
    url: string;
}

export interface PokemonRegionResponse {
    abilities: any[];
    id: number;
    main_region: PokeApiResult;
    moves: PokeApiResult[];
    name: string;
    names: RegionName[];
    pokemon_species: PokeApiResult[];
    types: PokeApiResult[];
    version_groups: PokeApiResult[];
}

interface RegionName {
    language: PokeApiResult;
    name: string;
}

export interface ResponseStatus {
    ok: boolean;
    isLoading: boolean;
    error: string;
    nextUrl: string;
}

export interface PokemonData<T> {
    responseStatus: ResponseStatus;
    data: T;
}

export interface PokemonSprite {
    id: number;
    name: string;
    sprites: PokemonSpriteTypes;
}

export interface PokemonSpriteTypes {
    'front-default': string;
    'front-shiny': string;
    'home-front-default': string;
    'home-front-shiny': string;
    'official-artwork-front-default': string;
    'official-artwork-front-shiny': string;
    'showdown-front-default': string;
    'showdown-front-shiny': string;
}

export interface PokemonRegion {
    id: number;
    name: string;
    sprites: PokemonSprite[];
}
