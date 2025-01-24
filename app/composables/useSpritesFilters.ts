export default function useFilters(defaultType: keyof SpriteTypes) {
    const route = useRoute();

    const filters = reactive<SpriteFilters>({
        name: route.query.name?.toString() || '',
        type: (route.query.type?.toString() as keyof SpriteTypes) || defaultType,
    });

    const query: SpriteQuery = {
        name: filters.name,
        offset: Number(route.query.offset) || 0,
        limit: Number(route.query.limit) || POKE_API_LIMIT,
    };

    return {
        filters,
        query,
    };
}
