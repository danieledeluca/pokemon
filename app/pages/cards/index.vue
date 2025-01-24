<script setup lang="ts">
import type { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

const { filters, sorters, sortersOptions, query } = useFilters<PokemonTCG.Card>(
    'set.releaseDate',
    'asc',
    ['set.releaseDate', 'name', 'rarity'],
);
const { data: cards, error } = await useFetch('/api/cards', { query });

if (error.value) {
    throw createError({
        statusCode: error.value.statusCode,
        message: error.value.message,
    });
}

useSeoMeta({
    title: 'Cards',
    description: 'A list of all Pokémon TCG cards',
});
</script>

<template>
    <SearchForm
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
