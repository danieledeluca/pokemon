<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const { filters, query } = useSpritesFilters('front-default');
const { data: pokemon, error } = await useFetch('/api/sprites', { query });

if (error.value) {
    throw createError({
        statusCode: error.value?.statusCode,
        statusMessage: error.value?.message,
    });
}

watch(
    () => filters.type,
    (newType) => {
        router.push({ query: { ...route.query, type: newType } });
    },
);

useSeoMeta({
    title: 'Pokemon',
    description: 'A list of all Pokémon',
});
</script>

<template>
    <SpritesSearchForm v-model:filters="filters" />
    <template v-if="pokemon?.results.length">
        <div class="pokemon-grid">
            <div v-for="poke in pokemon.results" :key="poke.url" class="pokemon">
                <NuxtLink class="image article" :to="`/sprites/${poke.url.split('/').at(-2)}`">
                    <template v-for="(image, type) in getSpriteImages(poke.url)" :key="type">
                        <AppImage
                            v-if="type === filters.type"
                            :src="image"
                            :alt="poke.name"
                            :class="type"
                        />
                    </template>
                </NuxtLink>
                <div class="name">
                    <span>{{ parseName(poke.name) }}</span>
                </div>
            </div>
        </div>
        <SpritesNavigation :sprites="pokemon" />
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
