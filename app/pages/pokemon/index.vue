<script setup lang="ts">
const { filters, query } = usePokemonFilters('front-default');
const { data: pokemonList, error, status } = await useLazyFetch('/api/pokemon', { query });

useSeoMeta({
    title: 'Pokémon',
    description: 'A list of all Pokémon',
});
</script>

<template>
    <SkeletonLoader v-if="status === 'pending'" layout="pokemon-list" />
    <AppMessage
        v-if="status === 'error' && error"
        type="error"
        :text="error.statusMessage || error.message"
    />
    <template v-if="status === 'success'">
        <PokemonSearchForm v-model:filters="filters" />
        <template v-if="pokemonList?.results.length">
            <div class="pokemon-grid">
                <div v-for="pokemon in pokemonList.results" :key="pokemon.url" class="pokemon">
                    <NuxtLink
                        class="image article"
                        :to="`/pokemon/${pokemon.url.split('/').at(-2)}`"
                    >
                        <template
                            v-for="(image, sprite) in getPokemonSprites(pokemon.url)"
                            :key="sprite"
                        >
                            <AppImage
                                v-if="sprite === filters.sprite"
                                :src="image"
                                :alt="pokemon.name"
                                :class="sprite"
                            />
                        </template>
                    </NuxtLink>
                    <div class="name">
                        <span>{{ parseName(pokemon.name) }}</span>
                    </div>
                </div>
            </div>
            <PokemonListsNavigation :pokemonList="pokemonList" />
        </template>
        <AppMessage
            v-else
            text="We couldn't find any Pokémon matching your search criteria"
            type="warning"
        />
    </template>
</template>

<style scoped>
img:is(.front-default, .front-shiny) {
    image-rendering: pixelated;
}
</style>
