<script setup lang="ts">
import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

const route = useRoute();
const setId = route.params.id;
const { filters, sorters, sortersOptions, query } = useFilters<PokemonTCG.Card>('number', 'asc', [
    'name',
    'number',
    'rarity',
]);
const { data: cards } = await useFetch(`/api/sets/${setId}`, { query });

if (!cards.value?.length && !filters.name) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Set not found',
    });
}

const setQuery = { q: `id:${setId}` };
const { data: set } = await useFetch('/api/sets', { query: setQuery });
const currentSet = set.value?.[0];

useSeoMeta({
    title: currentSet?.name,
    description: `A list of all Pokémon TCG cards in the ${currentSet?.name} set`,
});
</script>

<template>
    <article v-if="currentSet" class="set">
        <div class="logo">
            <img :src="currentSet.images.logo" :alt="currentSet.name" />
        </div>
        <div class="content">
            <p>
                <strong>Name: </strong>{{ currentSet.name }}
                <img class="symbol" :src="currentSet.images.symbol" :alt="currentSet.name" />
            </p>
            <p><strong>Series: </strong>{{ currentSet.series }}</p>
            <p><strong>Release date: </strong>{{ formatDate(currentSet.releaseDate) }}</p>
            <p><strong>Total cards: </strong>{{ currentSet.total }}</p>
        </div>
    </article>
    <SearchForm
        v-model:filters="filters"
        v-model:sorters="sorters"
        :sorterOptions="sortersOptions"
    />
    <CardsGrid v-if="cards?.length" :cards="cards" />
    <AppMessage
        v-else
        text="We couldn't find any cards matching your search criteria"
        type="warning"
    />
</template>

<style scoped>
.set {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
}

.set p:last-child {
    margin-bottom: 0;
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo img {
    max-width: 80%;
    max-height: 80%;
}

.content {
    align-self: center;
}

.symbol {
    width: 1.5rem;
    margin-left: 0.5rem;
}

@media (min-width: 768px) {
    .set {
        grid-template-columns: 1fr 2fr;
    }
}
</style>
