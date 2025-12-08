export function filterTcgCardMarketPrices(_prices: TcgCardPricingCardMarket) {
    if (!_prices) return;

    const { updated, unit, ...prices } = { ..._prices };

    const visiblePrices = [
        'trend',
        'avg1',
        'avg7',
        'avg30',
    ] as const satisfies (keyof TcgCardMarketPrices)[];
    type VisiblePriceKey = (typeof visiblePrices)[number];

    return visiblePrices.reduce(
        (acc, key) => {
            acc[key] = prices[key];
            return acc;
        },
        {} as { [K in VisiblePriceKey]: TcgCardMarketPrices[K] },
    );
}

export function filterTcgCardTcgPlayerPrices(_prices: TcgCardPricingTcgPlayer) {
    if (!_prices) return;

    const { updated, unit, ...prices } = { ..._prices };

    const visiblePrices = [
        'lowPrice',
        'midPrice',
        'highPrice',
        'marketPrice',
    ] as const satisfies (keyof TcgCardTcgPlayerPrice)[];
    type VisiblePriceKey = (typeof visiblePrices)[number];

    return Object.entries(prices).reduce(
        (acc, [_key, value]) => {
            const key = _key as keyof TcgCardTcgPlayerPrices;

            acc[key] = visiblePrices.reduce(
                (subAcc, price) => {
                    subAcc[price] = value[price];
                    return subAcc;
                },
                {} as { [K in VisiblePriceKey]: TcgCardTcgPlayerPrice[K] },
            );

            return acc;
        },
        {} as {
            [K in keyof typeof prices]?: { [L in VisiblePriceKey]: TcgCardTcgPlayerPrice[L] };
        },
    );
}

export function parseTcgPriceLabel(label: keyof (TcgCardMarketPrices & TcgCardTcgPlayerPrice)) {
    const pricesMap: Partial<Record<typeof label, string>> = {
        trend: 'Trend Price',
        avg1: '1 Day Average',
        avg7: '7 Day Average',
        avg30: '30 Day Average',
        lowPrice: 'Low Price',
        midPrice: 'Mid Price',
        highPrice: 'High Price',
        marketPrice: 'Market Price',
    };

    return pricesMap[label];
}

export function parseTcgText(text?: string) {
    if (!text) return '';

    const map = {
        '{G}': 'Grass',
        '{R}': 'Fire',
        '{W}': 'Water',
        '{L}': 'Lightning',
        '{P}': 'Psychic',
        '{M}': 'Metal',
        '{C}': 'Colorless',
        '{F}': 'Fighting',
        '{D}': 'Darkness',
    };

    return text.replace(/\{[GRWLPMCFD]\}/g, (match) => {
        return map[match as keyof typeof map] || match;
    });
}
