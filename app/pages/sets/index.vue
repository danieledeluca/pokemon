<script setup lang="ts">
import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

const { filters, query } = useTcgFilters<PokemonTCG.Set>('releaseDate', 'desc');
const { data: sets, error, status } = await useLazyFetch('/api/sets', { query });

useSeoMeta({
    title: 'Sets',
    description: 'A list of all Pokémon TCG sets',
});
</script>

<template>
    <SkeletonLoader v-if="status === 'pending'" layout="sets" />
    <AppMessage v-if="status === 'error' && error" type="error" :text="error.message" />
    <template v-if="status === 'success'">
        <TcgSearchForm v-model:filters="filters" placeholder="Search for a set" />
        <template v-if="sets?.length">
            <div v-for="(_sets, series) in groupBy(sets, 'series')" :key="series" class="series">
                <h2>{{ series }}</h2>
                <div class="pokemon-grid">
                    <div v-for="set in _sets" :key="set.id" class="set">
                        <NuxtLink class="image article" :to="`/sets/${set.id}`">
                            <AppImage :src="set.images.logo" :alt="set.name" />
                        </NuxtLink>
                        <div class="name">
                            <span>{{ set.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <AppMessage
            v-else
            text="We couldn't find any sets matching your search criteria"
            type="warning"
        />
    </template>
</template>

<style scoped>
.series:not(:last-child) {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--pico-muted-border-color);
}
</style>
