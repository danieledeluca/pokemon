<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const { filters, query } = useSpritesFilters('front-default');
const { data: sprites, error } = await useFetch('/api/sprites', { query });

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
    title: 'Sprites',
    description: 'A list of all Pokémon sprites',
});
</script>

<template>
    <SpritesSearchForm v-model:filters="filters" />
    <template v-if="sprites?.results.length">
        <div class="pokemon-grid">
            <div v-for="sprite in sprites.results" :key="sprite.url" class="sprite">
                <article class="image">
                    <template v-for="(image, type) in getSpriteImages(sprite.url)" :key="type">
                        <AppImage
                            v-if="type === filters.type"
                            :src="image"
                            :alt="sprite.name"
                            :class="type"
                        />
                    </template>
                </article>
                <div class="name">
                    <span>{{ parseName(sprite.name) }}</span>
                </div>
            </div>
        </div>
        <SpritesNavigation :sprites="sprites" />
    </template>
    <AppMessage
        v-else
        :text="`We couldn't find any sprites matching your search criteria`"
        type="warning"
    />
</template>

<style scoped>
img:where(.front-default, .front-shiny) {
    image-rendering: pixelated;
}
</style>
