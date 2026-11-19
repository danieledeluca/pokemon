export function parseCardMarketPrices(prices: TcgCard['pricing']['cardmarket']) {
    if (!prices) {
        return [];
    }

    const labelsMap: Partial<Record<keyof typeof prices, string>> = {
        trend: 'Trend Price',
        avg7: '7 Day Average',
        avg30: '30 Day Average',
    };

    const iconsMap: Partial<Record<keyof typeof prices, string>> = {
        trend: 'i-lucide-chart-no-axes-combined',
        avg7: 'i-lucide-calendar-days',
        avg30: 'i-lucide-calendar-range',
    };

    return Object.entries(prices).reduce<{ label?: string; price: string; icon?: string }[]>((acc, [type, price]) => {
        const priceType = type as keyof typeof prices;

        const label = labelsMap[priceType];
        const icon = iconsMap[priceType];

        if (label && icon) {
            acc.push({
                label,
                price: formatPrice(Number(price)),
                icon,
            });
        }

        return acc;
    }, []);
}
