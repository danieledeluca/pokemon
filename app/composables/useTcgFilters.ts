import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export default function useTcgFilters<T extends object>(
    defaultOrder: NestedKeyOf<T>,
    defaultDirection: keyof TCGSortersDirectionOptions,
    orderOptions?: NestedKeyOf<T>[],
) {
    const route = useRoute();

    const filters = reactive<TCGFilters>({
        name: route.query.name?.toString() || '',
    });
    const sorters = reactive<TCGSorters<T>>({
        order: (route.query.order?.toString() as NestedKeyOf<T>) || defaultOrder,
        direction:
            (route.query.direction?.toString() as keyof TCGSortersDirectionOptions) ||
            defaultDirection,
    });

    const sortersOptions: TCGSortersOptions<T> = {
        order: orderOptions || [],
        direction: ['asc', 'desc'],
    };

    const query: PokemonTCG.Parameter & { direction: string } = {
        q: Object.entries(filters).reduce((acc, [key, value]) => {
            acc += value ? `${key}:"*${value}*" ` : '';
            return acc;
        }, ''),
        orderBy: `${sorters.direction === 'desc' ? '-' : ''}${sorters.order?.toString()}`,
        page: Number(route.query.page) || 1,
        direction: sorters.direction,
    };

    return {
        filters,
        sorters,
        sortersOptions,
        query,
    };
}
