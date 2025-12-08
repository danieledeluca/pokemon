import type { Card } from '@tcgdex/sdk';

export type TcgFilters = {
    name: string;
};

export type TcgSortOrderDefaultValues = 'ASC' | 'DESC';

export type TcgQuery<T extends object> = Partial<TcgFilters> & {
    'sort:field'?: NestedKeyOf<T>;
    'sort:order': TcgSortOrderDefaultValues;
    'pagination:page': number;
    'pagination:itemsPerPage': number;
};

export type TcgCard = Card & {
    pricing: {
        cardmarket: TcgCardPricingCardMarket;
        tcgplayer: TcgCardPricingTcgPlayer;
    };
};

export type TcgCardPricingCardMarket = (TcgCardPricingBase & TcgCardMarketPrices) | null;

export type TcgCardPricingTcgPlayer = (TcgCardPricingBase & TcgCardTcgPlayerPrices) | null;

export type TcgCardPricingBase = {
    updated: string;
    unit: string;
};

export type TcgCardMarketPrices = {
    'avg': number | null;
    'low': number | null;
    'trend': number | null;
    'avg1': number | null;
    'avg7': number | null;
    'avg30': number | null;
    'avg-holo': number | null;
    'low-holo': number | null;
    'trend-holo': number | null;
    'avg1-holo': number | null;
    'avg7-holo': number | null;
    'avg30-holo': number | null;
};

export type TcgCardTcgPlayerPrices = {
    'normal': TcgCardTcgPlayerPrice;
    '1st-edition': TcgCardTcgPlayerPrice;
    'unlimited': TcgCardTcgPlayerPrice;
    'holofoil': TcgCardTcgPlayerPrice;
    '1st-edition-holofoil': TcgCardTcgPlayerPrice;
    'unlimited-holofoil': TcgCardTcgPlayerPrice;
    'reverse-holofoil': TcgCardTcgPlayerPrice;
};

export type TcgCardTcgPlayerPrice = {
    lowPrice: number | null;
    midPrice: number | null;
    highPrice: number | null;
    marketPrice: number | null;
    directLowPrice: number | null;
};
