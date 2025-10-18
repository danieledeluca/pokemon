<script setup lang="ts">
import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

const { filters, sorters, sortersOptions, query } = useTcgFilters<PokemonTCG.Card>(
    'set.releaseDate',
    'asc',
    ['set.releaseDate', 'name', 'rarity'],
);
const { data: cards, error, status } = await useLazyFetch('/api/cards', { query });

useSeoMeta({
    title: 'Cards',
    description: 'A list of all Pokémon TCG cards',
});
</script>

<template>
    <SkeletonLoader v-if="status === 'pending'" layout="cards" />
    <AppMessage
        v-if="status === 'error' && error"
        type="error"
        :text="error.statusMessage || error.message"
    />
    <template v-if="status === 'success'">
        <TcgSearchForm
            v-model:filters="filters"
            v-model:sorters="sorters"
            :sorterOptions="sortersOptions"
        />
        <template v-if="cards?.data.length">
            <CardsGrid :cards="cards.data" />
            <CardsNavigation :cards="cards" />
        </template>
        <AppMessage
            v-else
            :text="`We couldn't find any cards matching your search criteria`"
            type="warning"
        />
    </template>
</template>
