<script setup lang="ts">
import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

const route = useRoute();
const setId = route.params.id;

const { filters, sorters, sortersOptions, query } = useTcgFilters<PokemonTCG.Card>(
    'number',
    'asc',
    ['name', 'number', 'rarity'],
);

const { data, error, status } = await useLazyFetch(`/api/sets/${setId}`, { query });

const cards = computed(() => data.value?.cards);
const set = computed(() => data.value?.set);

useSeoMeta({
    title: data.value?.set?.name,
    description: `A list of all Pokémon TCG cards in the ${data.value?.set?.name} set`,
});
</script>

<template>
    <SkeletonLoader v-if="status === 'pending'" layout="set" />
    <AppMessage v-if="status === 'error' && error" type="error" :text="error.message" />
    <template v-if="status === 'success'">
        <article v-if="set" class="set">
            <div class="logo">
                <img :src="set.images.logo" :alt="set.name" />
            </div>
            <div class="content">
                <p>
                    <strong>Name: </strong>{{ set.name }}
                    <img class="symbol" :src="set.images.symbol" :alt="set.name" />
                </p>
                <p><strong>Series: </strong>{{ set.series }}</p>
                <p><strong>Release date: </strong>{{ formatDate(set.releaseDate) }}</p>
                <p><strong>Total cards: </strong>{{ set.total }}</p>
            </div>
        </article>
        <TcgSearchForm
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
