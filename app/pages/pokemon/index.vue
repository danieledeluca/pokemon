<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const { filters, query } = usePokemonFilters('front-default');
const { data: pokemon, error } = await useFetch('/api/pokemon', { query });

if (error.value) {
    throw createError({
        statusCode: error.value?.statusCode,
        statusMessage: error.value?.message,
    });
}

watch(
    () => filters.sprite,
    (newSprite) => {
        router.push({ query: { ...route.query, sprite: newSprite } });
    },
);

useSeoMeta({
    title: 'Pokemon',
    description: 'A list of all Pokémon',
});
</script>

<template>
    <PokemonSearchForm v-model:filters="filters" />
    <template v-if="pokemon?.results.length">
        <div class="pokemon-grid">
            <div v-for="poke in pokemon.results" :key="poke.url" class="pokemon">
                <NuxtLink class="image article" :to="`/pokemon/${poke.url.split('/').at(-2)}`">
                    <template v-for="(image, sprite) in getPokemonSprites(poke.url)" :key="sprite">
                        <AppImage
                            v-if="sprite === filters.sprite"
                            :src="image"
                            :alt="poke.name"
                            :class="sprite"
                        />
                    </template>
                </NuxtLink>
                <div class="name">
                    <span>{{ parseName(poke.name) }}</span>
                </div>
            </div>
        </div>
        <PokemonListsNavigation :pokemon />
    </template>
    <AppMessage
        v-else
        :text="`We couldn't find any Pokémon matching your search criteria`"
        type="warning"
    />
</template>

<style scoped>
img:is(.front-default, .front-shiny) {
    image-rendering: pixelated;
}
</style>
