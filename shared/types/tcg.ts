import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import type { NestedKeyOf } from './utils';

export interface PokemonTCGResponse<T> {
    data: T[];
    page: number;
    pageSize: number;
    count: number;
    totalCount: number;
}

export interface PokemonTCGCard extends PokemonTCG.Card {
    level?: string;
    tcgplayer?: {
        url: string;
        updatedAt: string;
        prices: TCGPrices;
    };
    cardmarket?: {
        url: string;
        updatedAt: string;
        prices: CardMarketPrices;
    };
}

export interface TCGPrices {
    'normal'?: PokemonTCG.Price;
    '1stEdition'?: PokemonTCG.Price;
    'unlimited'?: PokemonTCG.Price;
    'holofoil'?: PokemonTCG.Price;
    'reverseHolofoil'?: PokemonTCG.Price;
    '1stEditionHolofoil'?: PokemonTCG.Price;
    'unlimitedHolofoil'?: PokemonTCG.Price;
}

export interface CardMarketPrices {
    averageSellPrice: number | null;
    lowPrice: number | null;
    trendPrice: number | null;
    germanProLow: number | null;
    suggestedPrice: number | null;
    reverseHoloSell: number | null;
    reverseHoloLow: number | null;
    reverseHoloTrend: number | null;
    lowPriceExPlus: number | null;
    avg1: number | null;
    avg7: number | null;
    avg30: number | null;
    reverseHoloAvg1: number | null;
    reverseHoloAvg7: number | null;
    reverseHoloAvg30: number | null;
}

export enum TCGPriceLabel {
    'normal' = 'Normal',
    '1stEdition' = '1st Edition',
    'unlimited' = 'Unlimited',
    'holofoil' = 'Holofoil',
    'reverseHolofoil' = 'Reverse Holofoil',
    '1stEditionHolofoil' = '1st Edition Holofoil',
    'unlimitedHolofoil' = 'Unlimited Holofoil',
}

export enum CardMarketPriceLabel {
    'averageSellPrice' = 'Average Sell Price',
    'lowPrice' = 'Low Price',
    'trendPrice' = 'Trend Price',
    'germanProLow' = 'German Pro Low',
    'suggestedPrice' = 'Suggested Price',
    'reverseHoloSell' = 'Reverse Holo Sell',
    'reverseHoloLow' = 'Reverse Holo Low',
    'reverseHoloTrend' = 'Reverse Holo Trend',
    'lowPriceExPlus' = 'Low Price (Ex+)',
    'avg1' = '1 Day Average',
    'avg7' = '7 Day Average',
    'avg30' = '30 Day Average',
    'reverseHoloAvg1' = 'Reverse Holo 1 Day Average',
    'reverseHoloAvg7' = 'Reverse Holo 7 Day Average',
    'reverseHoloAvg30' = 'Reverse Holo 30 Day Average',
}

export type TCGFilteredPrices = Pick<PokemonTCG.Price, 'low' | 'mid' | 'high' | 'market'>;

export type CardMarketFilteredPrices = Pick<
    CardMarketPrices,
    'trendPrice' | 'avg1' | 'avg7' | 'avg30'
>;

export interface TCGFilters {
    name?: string;
}

export interface TCGSorters<T extends object> {
    order: NestedKeyOf<T>;
    direction: keyof TCGSortersDirectionOptions;
}

export interface TCGSortersOptions<T extends object> {
    order: NestedKeyOf<T>[];
    direction: (keyof TCGSortersDirectionOptions)[];
}
export interface TCGSortersDirectionOptions {
    asc: string;
    desc: string;
}

export enum TCGSortersOrderLabels {
    'set.releaseDate' = 'Release Date',
    'name' = 'Name',
    'number' = 'Number',
    'rarity' = 'Rarity',
}

export enum TCGSortersDirectionLabels {
    asc = 'Ascending',
    desc = 'Descending',
}
