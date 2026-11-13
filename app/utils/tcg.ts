export function parseCardMarketPrices(prices: TcgCard['pricing']['cardmarket']) {
    if (!prices) {
        return {};
    }

    const labelsMap: Partial<Record<keyof typeof prices, string>> = {
        trend: 'Trend Price',
        avg7: '7 Day Average',
        avg30: '30 Day Average',
    };

    return Object.entries(prices || {}).reduce<Record<string, string>>((acc, [type, price]) => {
        const label = labelsMap[type as keyof typeof prices];

        if (label) {
            acc[label] = formatPrice(Number(price));
        }
        return acc;
    }, {});
}
