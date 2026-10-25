import type { Card } from '@tcgdex/sdk';

export type TcgCard = Card & {
    pricing: {
        tcgplayer?: TcgPlayerPrice;
        cardmarket?: CardMarketPrice;
    };
};

type TcgPlayerPrice = {
    'updated': number;
    'unit': string;
    'normal'?: TcgPlayerPriceVariant;
    'holofoil'?: TcgPlayerPriceVariant;
    'reverse-holofoil'?: TcgPlayerPriceVariant;
    '1st-edition'?: TcgPlayerPriceVariant;
    '1st-edition-holofoil'?: TcgPlayerPriceVariant;
    'unlimited'?: TcgPlayerPriceVariant;
    'unlimited-holofoil'?: TcgPlayerPriceVariant;
};

type TcgPlayerPriceVariant = {
    lowPrice?: number;
    midPrice?: number;
    highPrice?: number;
    marketPrice?: number;
    directLowPrice?: number;
};

type CardMarketPrice = {
    'updated'?: number;
    'unit'?: string;
    'idProduct'?: number;
    'avg'?: number;
    'low'?: number;
    'trend'?: number;
    'avg1'?: number;
    'avg7'?: number;
    'avg30'?: number;
    'avg-holo'?: number;
    'low-holo'?: number;
    'trend-holo'?: number;
    'avg1-holo'?: number;
    'avg7-holo'?: number;
    'avg30-holo'?: number;
};
