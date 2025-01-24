import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export function filterTcgPrices(prices: PokemonTCG.Price | undefined) {
    return Object.entries(prices || {}).reduce((acc, [key, value]) => {
        if (key !== 'directLow') {
            acc[key as keyof TCGFilteredPrices] = value;
        }

        return acc;
    }, {} as TCGFilteredPrices);
}

export function filterCardMarketPrices(prices?: CardMarketPrices) {
    if (!prices) {
        return;
    }

    const visiblePrices: (keyof CardMarketFilteredPrices)[] = [
        'trendPrice',
        'avg1',
        'avg7',
        'avg30',
    ];

    return Object.entries(prices || {}).reduce((acc, [key, value]) => {
        if (visiblePrices.includes(key as keyof CardMarketFilteredPrices)) {
            acc[key as keyof CardMarketFilteredPrices] = value;
        }

        return acc;
    }, {} as CardMarketFilteredPrices);
}
