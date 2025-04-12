export default function usePokemonFilters(defaultType: SpriteTypes) {
    const route = useRoute();

    const filters = reactive<PokemonFilters>({
        name: route.query.name?.toString() || '',
        sprite: (route.query.type?.toString() as SpriteTypes) || defaultType,
    });

    const query: PokemonQuery = {
        name: filters.name,
        offset: Number(route.query.offset) || 0,
        limit: Number(route.query.limit) || POKE_API_LIMIT,
    };

    return {
        filters,
        query,
    };
}
