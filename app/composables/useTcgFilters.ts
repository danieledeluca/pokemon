export default function useTcgFilters<T extends object>(
    defaultSortField?: NestedKeyOf<T>,
    defaultSortOrder: TcgSortOrderDefaultValues = 'ASC',
) {
    const route = useRoute();

    const filters = reactive<TcgFilters>({
        name: route.query.name?.toString() || '',
    });

    const query: TcgQuery<T> = {
        ...filters,
        'sort:field': (route.query.order?.toString() as NestedKeyOf<T>) || defaultSortField,
        'sort:order':
            (route.query.direction?.toString() as TcgSortOrderDefaultValues) || defaultSortOrder,
        'pagination:page': Number(route.query.page) || 1,
        'pagination:itemsPerPage': TCG_DEX_ITEM_PER_PAGE,
    };

    return {
        filters,
        query,
    };
}
