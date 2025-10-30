export default function usePokemonFilters(defaultSprite: SpriteTypes) {
    const route = useRoute();

    const filters = reactive<PokemonFilters>({
        name: route.query.name?.toString() || '',
        sprite: (route.query.sprite?.toString() as SpriteTypes) || defaultSprite,
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
